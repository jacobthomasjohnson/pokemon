import { create } from "zustand";
import { createGameState } from "./createGameState";
import {
      calculateDamage,
      calculateCritical,
      calculateAccuracy,
      getNewHP,
} from "./gameUtils";

// Configurable enemy turn delay
const ENEMY_TURN_DELAY = 2000;
const ENEMY_POTION_PROBABILITY = 10;

const useGameStore = create((set, get) => ({
      ...createGameState(),

      // Add a log entry
      logEvent: (message) => {
            set((state) => ({
                  log: [...state.log, message],
            }));
      },

      usePotion: (potion, isPlayer) => {
            let currentHP;
            let newHP;
            let newState;

            set((state) => {
                  currentHP = isPlayer ? state.player.hp : state.enemy.hp;
                  newHP =
                        currentHP + potion.amount > 1000
                              ? 1000
                              : currentHP + potion.amount;

                  if (isPlayer) {
                        newState = {
                              ...state,
                              player: {
                                    ...state.player,
                                    hp: newHP,
                              },
                              log: [
                                    ...state.log,
                                    `You used ${potion.name} to heal for ${potion.amount}.`,
                              ],
                        };
                  } else {
                        newState = {
                              ...state,
                              enemy: {
                                    ...state.enemy,
                                    hp: newHP,
                              },
                              log: [
                                    ...state.log,
                                    `Enemy used ${potion.name} to heal for ${potion.amount}.`,
                              ],
                        };
                  }
                  return newState;
            });
      },

      executeAttack: (move, attackerType, defenderType) => {
            set((state) => {
                  const attacker = state[attackerType];
                  const defender = state[defenderType];

                  // Check accuracy
                  if (!calculateAccuracy(move.accuracy)) {
                        return {
                              ...state,
                              log: [
                                    ...state.log,
                                    `${attacker.name} used ${move.name}, but it missed!`,
                              ],
                              turn:
                                    attackerType === "player"
                                          ? "enemy"
                                          : "player",
                        };
                  }

                  // Calculate damage
                  const isCritical = calculateCritical(35); // 15% crit chance
                  const damage = calculateDamage(move, isCritical);

                  // Update defender's HP and log the attack
                  return {
                        ...state,
                        [defenderType]: {
                              ...defender,
                              hp: getNewHP(defender.hp, damage),
                        },
                        log: [
                              ...state.log,
                              `${attacker.name} used ${move.name}! ${
                                    isCritical ? "Critical hit! " : ""
                              }It dealt ${damage} damage.`,
                        ],
                        turn: attackerType === "player" ? "enemy" : "player",
                  };
            });
      },

      enemyTurn: () => {
            let randomMove; // Declare randomMove in a shared scope
            let randomPotion;
            let usingPotion;

            set((state) => {
                  const enemy = state.enemy;
                  const potions = state.potions;

                  randomPotion =
                        potions[Math.floor(Math.random() * potions.length)];

                  randomMove =
                        enemy.moveset[
                              Math.floor(Math.random() * enemy.moveset.length)
                        ];

                  return {
                        log: [
                              ...state.log,
                              `${enemy.name} is preparing to attack...`,
                        ],
                  };
            });

            setTimeout(() => {
                  const { usePotion, executeAttack } = get(); // Access the store functions correctly

                  usingPotion = Math.random() * 100 < ENEMY_POTION_PROBABILITY;

                  if (usingPotion) {
                        usePotion(randomPotion, false); // Enemy uses a potion
                  }

                  setTimeout(() => {
                        executeAttack(randomMove, "enemy", "player"); // Enemy attacks
                  },1)
            }, ENEMY_TURN_DELAY);
      },

      playerAttack: (move) => {
            // Execute the player's attack immediately
            set((state) => {
                  state.executeAttack(move, "player", "enemy");
                  return {}; // Return empty object to avoid unnecessary overwrites
            });

            // Trigger the enemy's turn after a delay, but only if the enemy is still alive
            setTimeout(() => {
                  set((state) => {
                        const enemyHP = state.enemy.hp;
                        if (enemyHP > 0) {
                              state.enemyTurn();
                        }
                        return {}; // Return empty object for consistency
                  });
            }, 1000); // 2-second delay before enemy's turn
      },
}));

export default useGameStore;

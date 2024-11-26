import { create } from "zustand";
import { createGameState } from "./createGameState";
import {
      calculateDamage,
      calculateCritical,
      calculateAccuracy,
      getNewHP,
} from "./gameUtils";

// Configurable enemy turn delay
const ENEMY_TURN_DELAY = 2000; // 5 seconds

const useGameStore = create((set) => ({
      ...createGameState(),

      // Add a log entry
      logEvent: (message) => {
            set((state) => ({
                  log: [...state.log, message],
            }));
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
                  const isCritical = calculateCritical(15); // 15% crit chance
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

            set((state) => {
                  const enemy = state.enemy;

                  // Randomly select an enemy move
                  randomMove =
                        enemy.moveset[
                              Math.floor(Math.random() * enemy.moveset.length)
                        ];

                  // Log the preparation step immediately
                  return {
                        log: [
                              ...state.log,
                              `${enemy.name} is preparing to attack...`,
                        ],
                  };
            });

            // Delay execution of the enemy attack
            setTimeout(() => {
                  set((state) => {
                        state.executeAttack(randomMove, "enemy", "player"); // Use the shared randomMove
                        return {}; // Return empty state for consistency
                  });
            }, ENEMY_TURN_DELAY); // 5-second delay
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

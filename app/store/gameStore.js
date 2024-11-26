import { create } from "zustand";

const useGameStore = create((set) => ({
      turn: "player",
      log: [],
      logMessage: null,

      logWindow: (message) => {
            set({ logMessage: message });
      },

      player: {
            hp: 1000,
            pokemon: "Zekrom",
            imgSrc: "/zekrom.png",
            baseSpeed: 90,
            baseDefense: 120,
            moveset: [
                  {
                        name: "Bolt Strike",
                        type: "Electric",
                        category: "Physical",
                        power: 130,
                        accuracy: 85,
                        pp: 5,
                  },
                  {
                        name: "Thunder",
                        type: "Electric",
                        category: "Special",
                        power: 110,
                        accuracy: 70,
                        pp: 10,
                  },
                  {
                        name: "Zen Headbutt",
                        type: "Psychic",
                        category: "Physical",
                        power: 80,
                        accuracy: 90,
                        pp: 15,
                  },
                  {
                        name: "Crunch",
                        type: "Dark",
                        category: "Physical",
                        power: 80,
                        accuracy: 100,
                        pp: 15,
                  },
            ],
      },

      enemy: {
            hp: 1000,
            pokemon: "Dialga",
            imgSrc: "/dialga.png",
            baseSpeed: 90,
            baseDefense: 120,
            moveset: [
                  {
                        name: "Bolt Strike",
                        type: "Electric",
                        category: "Physical",
                        power: 130,
                        accuracy: 85,
                        pp: 5,
                  },
                  {
                        name: "Thunder",
                        type: "Electric",
                        category: "Special",
                        power: 110,
                        accuracy: 70,
                        pp: 10,
                  },
                  {
                        name: "Zen Headbutt",
                        type: "Psychic",
                        category: "Physical",
                        power: 80,
                        accuracy: 90,
                        pp: 15,
                  },
                  {
                        name: "Crunch",
                        type: "Dark",
                        category: "Physical",
                        power: 80,
                        accuracy: 100,
                        pp: 15,
                  },
            ],
      },

      decreaseHealth: (target, power) => {
            set((state) => {
                  if (target === "player") {
                        const newHealth = Math.max(0, state.player.hp - power);
                        return {
                              player: { ...state.player, hp: newHealth },
                              log: [
                                    ...state.log,
                                    `Enemy attacks and deals ${power} damage!`,
                              ],
                        };
                  } else if (target === "enemy") {
                        const newHealth = Math.max(0, state.enemy.hp - power);
                        return {
                              enemy: { ...state.enemy, hp: newHealth },
                              log: [
                                    ...state.log,
                                    `Player attacks and deals ${power} damage!`,
                              ],
                        };
                  }
            });
      },

      calcOdds(percentage) {
            if (percentage < 0 || percentage > 100) {
                  // throw new Error("Percentage not between 0 and 100.");
            }
            return Math.random() * 100 < percentage;
      },

      critMath: (power) => {
            return power * 0.25 + 19;
      },

      calcCrit: (move) => {},

      executeAttack: (move) => {
            set((state) => {
                  const { turn, player, enemy, calcOdds, critMath, logWindow, logMessage } =
                        state; // Destructure state
                  const { power, accuracy, name } = move; // Destructure move
                  let totalDamage = 0;

                  console.log('Running logWindow...')
                  logWindow(`${turn} is attempting to use ${name}`);
                  console.log(logMessage)

                  // Determine if attack lands
                  if (calcOdds(accuracy)) {
                        // Critical hit calculation
                        const critChance = accuracy;
                        const isCritical = calcOdds(critChance);
                        totalDamage =
                              power + (isCritical ? critMath(power) : 0);

                        // logWindow(
                        // `${name} ${
                        // isCritical ? "critically hit" : "hit"
                        // } and dealt ${totalDamage} damage!`
                        // );
                  } else {
                        // logWindow(`${name} missed!`);
                  }

                  // Update health based on turn
                  const newState =
                        turn === "player"
                              ? {
                                      ...state,
                                      enemy: {
                                            ...enemy,
                                            hp: Math.max(
                                                  0,
                                                  enemy.hp - totalDamage
                                            ),
                                      },
                                      //   turn: "enemy",
                                }
                              : {
                                      ...state,
                                      player: {
                                            ...player,
                                            hp: Math.max(
                                                  0,
                                                  player.hp - totalDamage
                                            ),
                                      },
                                      //   turn: "player",
                                };

                  return newState;
            });
      },

      // Function to handle player attack
      playerAttack: (attackName, power) => {
            set((state) => {
                  state.logWindow(
                        `You used ${attackName}, which did ${power} damage.`
                  );

                  const newHealth = Math.max(0, state.enemy.hp - power);
                  const updatedLog = [
                        ...state.log,
                        `Player used ${attackName} and dealt ${power} damage!`,
                  ];
                  return {
                        enemy: { ...state.enemy, hp: newHealth },
                        log: updatedLog,
                        turn: newHealth <= 0 ? "end" : "enemy", // Change turn if the enemy is still alive
                  };
            });
      },
}));

export default useGameStore;

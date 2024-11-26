import { create } from "zustand";

const useGameStore = create((set) => ({
      turn: "player",
      log: [],

      player: {
            hp: 1000,
            pokemon: "Zekrom",
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

      logWindow: (message) => {
            console.log(message);
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

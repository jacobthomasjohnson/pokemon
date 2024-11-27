import { createPokemon } from "./pokemonFactory";

export const createGameState = () => ({
      turn: "player",
      player: createPokemon("Zekrom", 1000, 90, 120, "/zekrom.png", [
            {
                  name: "Bolt Strike",
                  type: "Electric",
                  category: "Physical",
                  power: 150,
                  accuracy: 70,
                  pp: 5,
            },
            {
                  name: "Thunder",
                  type: "Electric",
                  category: "Special",
                  power: 110,
                  accuracy: 76,
                  pp: 10,
            },
            {
                  name: "Zen Headbutt",
                  type: "Psychic",
                  category: "Physical",
                  power: 95,
                  accuracy: 80,
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
      ]),
      enemy: createPokemon("Dialga", 1000, 90, 120, "/dialga.png", [
            {
                  name: "Roar of Time",
                  type: "Dragon",
                  category: "Special",
                  power: 150,
                  accuracy: 80,
                  pp: 5,
            },
            {
                  name: "Flash Cannon",
                  type: "Steel",
                  category: "Special",
                  power: 110,
                  accuracy: 80,
                  pp: 10,
            },
            {
                  name: "Earth Power",
                  type: "Ground",
                  category: "Special",
                  power: 95,
                  accuracy: 70,
                  pp: 15,
            },
            {
                  name: "Thunder",
                  type: "Electric",
                  category: "Special",
                  power: 80,
                  accuracy: 70,
                  pp: 15,
            },
      ]),
      pokeballs: [
            {
                  name: "Pokeball",
                  quantity: "3",
                  probability: 10,
            }
      ],
      potions: [
            {
                  name: "Potion",
                  quantity: 2,
                  effect: "Heal",
                  amount: 100,
            },
            {
                  name: "Super Potion",
                  quantity: 0,
                  effect: "Heal",
                  amount: 200,
            },
            {
                  name: "Hyper Potion",
                  quantity: 1,
                  effect: "Heal",
                  amount: 300,
            },
            {
                  name: "Max Potion",
                  quantity: 0,
                  effect: "Heal",
                  amount: 1000,
            },
            {
                  name: "Full Restore",
                  quantity: 0,
                  effect: "Heal/Buff",
                  amount: 1000
            }
      ],
      log: [],
});

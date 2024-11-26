import { createPokemon } from "./pokemonFactory";

export const createGameState = () => ({
      turn: "player",
      player: createPokemon("Zekrom", 1000, 90, 120, "/zekrom.png", [
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
      ]),
      enemy: createPokemon("Dialga", 1000, 90, 120, "/dialga.png", [
            {
                  name: "Roar of Time",
                  type: "Dragon",
                  category: "Special",
                  power: 150,
                  accuracy: 90,
                  pp: 5,
            },
            {
                  name: "Flash Cannon",
                  type: "Steel",
                  category: "Special",
                  power: 80,
                  accuracy: 100,
                  pp: 10,
            },
            {
                  name: "Earth Power",
                  type: "Ground",
                  category: "Special",
                  power: 90,
                  accuracy: 100,
                  pp: 10,
            },
            {
                  name: "Thunder",
                  type: "Electric",
                  category: "Special",
                  power: 110,
                  accuracy: 70,
                  pp: 10,
            },
      ]),
      log: [],
});

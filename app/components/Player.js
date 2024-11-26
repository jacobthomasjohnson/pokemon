"use client";

import { useRef, useState, useEffect } from "react";
import useGameStore from "../store/gameStore";
import Image from "next/image";

const Player = () => {
      const player = useGameStore((state) => state.player);
      const playerAttack = useGameStore((state) => state.playerAttack);
      const playerHealthbar = useRef(null);

      return (
            <div className="basis-1/2 flex flex-col items-end">
                  <div className="text-4xl font-bold">{player.pokemon}</div>
                  <div className="text-2xl">{player.hp}/100</div>
                  <div className="mt-4 w-[400px] h-[30px] bg-background border-foreground border-4 rounded-lg">
                        <div
                              ref={playerHealthbar}
                              id="playerHealthbar"
                              className={`w-full h-full bg-green-900`}
                              style={{ width: `${player.hp / 10}%` }}
                        ></div>
                  </div>
                  <div className="w-full flex flex-row">
                        <div className="">
                              <Image src="/zekrom.png" width={300} height={100} alt="Zekrom" />
                        </div>
                        <div className="grow flex flex-col justify-center w-[400px] p-4 border-8 border-double border-foreground my-8">
                              {player.moveset.map((move) => {
                                    const name = move.name;
                                    const power = useGameStore(
                                          (state) => move.power
                                    );
                                    return (
                                          <div
                                                key={move.name}
                                                onClick={() =>
                                                      playerAttack(
                                                            move.name,
                                                            move.power
                                                      )
                                                }
                                                className="flex flex-col p-2 text-2xl hover:translate-x-2 hover:cursor-pointer"
                                          >
                                                {move.name}
                                          </div>
                                    );
                              })}
                        </div>
                  </div>
            </div>
      );
};

export default Player;

"use client";

import useGameStore from "./gameStore";
import Image from "next/image";

const Player = () => {
      const player = useGameStore((state) => state.player);
      const playerAttack = useGameStore((state) => state.playerAttack);

      return (
            <div>
                  <div className="flex flex-col items-end mb-8">
                        <div className="text-4xl font-bold">{player.name}</div>
                        <div className="text-2xl">{player.hp}/1000</div>
                        <div className="mt-4 w-full max-w-[400px] h-[30px] bg-background border-foreground border-4 rounded-lg">
                              <div
                                    className={`w-full h-full bg-green-700`}
                                    style={{
                                          width: `${(player.hp / 1000) * 100}%`,
                                    }}
                              ></div>
                        </div>
                  </div>
                  <div>
                        <div className="w-full flex flex-row">
                              <div className="ml-auto flex flex-col justify-center items-end p-4 border-8 border-double border-foreground my-8">
                                    {player.moveset.map((move) => (
                                          <div
                                                key={move.name}
                                                onClick={() =>
                                                      playerAttack(move)
                                                }
                                                className="flex flex-col p-2 text-2xl hover:translate-x-2 hover:cursor-pointer"
                                          >
                                                {move.name}
                                          </div>
                                    ))}
                              </div>
                              <div>
                                    <Image
                                          src={player.imgSrc}
                                          width={300}
                                          height={300}
                                          alt={player.name}
                                          priority
                                    />
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Player;

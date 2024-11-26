"use client";

import useGameStore from "../store/gameStore";
import Image from "next/image";

const Player = () => {
      const player = useGameStore((state) => state.player);
      const executeAttack = useGameStore((state) => state.executeAttack);

      return (
            <div className="basis-1/2 flex flex-col items-end">
                  <div className="text-4xl font-bold">{player.pokemon}</div>
                  <div className="text-2xl">{player.hp}/100</div>
                  <div className="mt-4 w-[400px] h-[30px] bg-background border-foreground border-4 rounded-lg">
                        <div
                              className={`w-full h-full bg-green-900`}
                              style={{ width: `${player.hp / 10}%` }}
                        ></div>
                  </div>
                  <div className="w-full flex flex-row">
                        <div className="">
                              <Image
                                    src={player.imgSrc}
                                    width={300}
                                    height={100}
                                    alt="Zekrom"
                              />
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
                                                onClick={() => (executeAttack(move))}
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

"use client";

import Image from "next/image";
import useGameStore from "../store/gameStore";

const Enemy = () => {
      const enemy = useGameStore((state) => state.enemy);
      // console.log("Enemy state:", enemy);
      if (!enemy) {
            return <div>Loading enemy data...</div>; // Fallback UI
      }

      return (
            <div className="basis-1/2">
                  <div className="flex w-full h-full flex-row">
                        <div className="flex w-full flex-col">
                              <div className="text-4xl font-bold">
                                    {enemy.pokemon}
                              </div>
                              <div className="text-2xl">{enemy.hp}/100</div>
                              <div className="mt-4 w-[400px] h-[30px] bg-background border-foreground border-4 rounded-lg">
                                    <div
                                          id="enemyHealthbar"
                                          className={`w-full h-full bg-green-900`}
                                          style={{ width: `${enemy.hp / 10}%` }}
                                    ></div>
                              </div>
                        </div>

                        <div className="">
                              <Image
                                    src={enemy.imgSrc}
                                    width={300}
                                    height={100}
                                    alt="Zekrom"
                              />
                        </div>
                  </div>
            </div>
      );
};

export default Enemy;

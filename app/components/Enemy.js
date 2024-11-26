"use client";

import Image from "next/image";
import useGameStore from "./gameStore";
import { useEffect, useState, useRef } from "react";

const DAMAGE_ANIM_DURATION = 2000;

const Enemy = () => {
      const enemy = useGameStore((state) => state.enemy);
      const enemyHP = useGameStore((state) => state.enemy.hp);
      const previousEnemyHP = useRef(enemyHP);
      const [damageAnim, setDamageAnim] = useState(false);
      const showDamageAnim = () => {
            setDamageAnim(true);
            setTimeout(() => {
                  setDamageAnim(false);
            }, DAMAGE_ANIM_DURATION);
      };
      useEffect(() => {
            if (previousEnemyHP.current > enemyHP) {
                  showDamageAnim();
            }
            // Update the previousEnemyHP to the current enemyHP after the comparison
            previousEnemyHP.current = enemyHP;
      }, [enemyHP]);

      return (
            <div className={`h-full`}>
                  <div className="flex flex-col items-end">
                        <div className="flex w-full flex-col mb-8">
                              <div className="text-4xl font-bold">
                                    {enemy.name}
                              </div>
                              <div className="text-2xl">{enemy.hp}/1000</div>
                              <div className="mt-4 w-full max-w-[400px] h-[30px] bg-background border-foreground border-4 rounded-lg">
                                    <div
                                          className={`w-full h-full relative bg-green-700 ${damageAnim ? "show-damage-anim" : ""}`}
                                          style={{
                                                width: `${
                                                      (enemy.hp / 1000) * 100
                                                }%`,
                                          }}
                                    ></div>
                              </div>
                        </div>
                        <div className="flex w-full">
                              <div className="">
                                    <Image
                                          src={enemy.imgSrc}
                                          width={300}
                                          height={300}
                                          alt={enemy.name}
                                          priority
                                    />
                              </div>
                              <div className="grow flex flex-col justify-center p-4 border-8 border-double border-foreground my-8 opacity-0 pointer-events-none"></div>
                        </div>
                  </div>
            </div>
      );
};

export default Enemy;

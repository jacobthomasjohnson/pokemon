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
            <div className="h-1/2 flex flex-col">
                  <div className="flex w-full flex-col mb-1">
                        <div className="text-2xl lg:text-4xl font-bold">
                              {enemy.name}
                        </div>
                        <div className="text-xl lg:text-2xl">
                              {enemy.hp}/1000
                        </div>
                        <div className="mt-2 w-full max-w-[250px] lg:max-w-[600px] h-[20px] sm:h-[30px] bg-background rounded-full overflow-hidden">
                              <div
                                    className={`w-full h-full relative bg-green-700 ${
                                          damageAnim ? "show-damage-anim" : ""
                                    }`}
                                    style={{
                                          width: `${(enemy.hp / 1000) * 100}%`,
                                    }}
                              ></div>
                        </div>
                  </div>
                  <div className="flex w-full h-full items-center">
                        <Image
                              src={enemy.imgSrc}
                              width={600}
                              height={600}
                              alt={enemy.name}
                              priority
                              className="max-w-32 lg:max-w-80"
                        />
                  </div>
            </div>
      );
};

export default Enemy;

"use client";

import useGameStore from "./gameStore";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const DAMAGE_ANIM_DURATION = 2000;

const Player = () => {
      const player = useGameStore((state) => state.player);
      const playerAttack = useGameStore((state) => state.playerAttack);

      const playerHP = useGameStore((state) => state.player.hp);
      const previousPlayerHP = useRef(playerHP);
      const [damageAnim, setDamageAnim] = useState(false);
      const showDamageAnim = () => {
            setDamageAnim(true);
            setTimeout(() => {
                  setDamageAnim(false);
            }, DAMAGE_ANIM_DURATION);
      };
      useEffect(() => {
            if (previousPlayerHP.current > playerHP) {
                  showDamageAnim();
            }
            // Update the previousEnemyHP to the current enemyHP after the comparison
            previousPlayerHP.current = playerHP;
      }, [playerHP]);

      return (
            <div className={`h-full`}>
                  <div className="flex flex-col items-end mb-8">
                        <div className="text-4xl font-bold">{player.name}</div>
                        <div className="text-2xl">{player.hp}/1000</div>
                        <div className="mt-4 w-full max-w-[400px] h-[30px] bg-background border-foreground border-4 rounded-lg">
                              <div
                                    className={`w-full h-full relative bg-green-700 ${damageAnim ? "show-damage-anim" : ""}`}
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

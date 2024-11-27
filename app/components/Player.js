"use client";

import useGameStore from "./gameStore";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const DAMAGE_ANIM_DURATION = 2000;

const Player = () => {
      const player = useGameStore((state) => state.player);
      const playerAttack = useGameStore((state) => state.playerAttack);

      const turn = useGameStore((state) => state.turn);

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
            <div className="w-full h-1/2 flex flex-col">
                  <div className="flex w-full flex-col mb-1 items-end">
                        <div className="text-2xl lg:text-4xl font-bold">
                              {player.name}
                        </div>
                        <div className="text-xl lg:text-2xl">
                              {player.hp}/1000
                        </div>
                        <div className="mt-2 w-full max-w-[250px] lg:max-w-[600px] h-[20px] sm:h-[30px] bg-background rounded-full overflow-hidden">
                              <div
                                    className={`w-full h-full relative bg-green-700 ${
                                          damageAnim ? "show-damage-anim" : ""
                                    }`}
                                    style={{
                                          width: `${(player.hp / 1000) * 100}%`,
                                    }}
                              ></div>
                        </div>
                  </div>
                  <div className="w-full flex grow items-center">
                        <div
                              className={`ml-auto flex grow lg:max-w-[33%] flex-col p-2 border-2 lg:border-4 border-double border-background ${
                                    turn !== "player"
                                          ? "pointer-events-none"
                                          : ""
                              }`}
                        >
                              {player.moveset.map((move) => (
                                    <div
                                          key={move.name}
                                          onClick={() => playerAttack(move)}
                                          className="flex flex-col p-1 lg:p-2 text-md lg:text-xl hover:translate-x-1 hover:underline hover:cursor-pointer"
                                    >
                                          {move.name}
                                    </div>
                              ))}
                        </div>
                        <Image
                              src={player.imgSrc}
                              width={600}
                              height={600}
                              alt={player.name}
                              priority
                              className="max-w-32 lg:max-w-80"
                        />
                  </div>
            </div>
      );
};

export default Player;

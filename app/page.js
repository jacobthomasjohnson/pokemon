"use client";

import Image from "next/image";

import Player from "./components/Player";
import Enemy from "./components/Enemy";

import useGameStore from "./store/gameStore";
import { useEffect } from "react";
import LogWindow from "./components/LogWindow";

export default function Home() {

      const turn = useGameStore((state) => state.turn);

      return (
            <div className="w-[1100px] h-[900px] border-4 border-[#000000] p-16 flex flex-col bg-white">
                  <LogWindow />
                  <Enemy />
                  <Player />
            </div>
      );
}

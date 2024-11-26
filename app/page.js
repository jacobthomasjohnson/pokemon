import Image from "next/image";

import Player from "./components/Player";
import Enemy from "./components/Enemy";

export default function Home() {
      return (
            <div className="w-[1100px] h-[900px] border-4 border-[#000000] p-16 flex flex-col bg-white">
                  <Enemy />
                  <Player />
            </div>
      );
}

"use client";

import Player from "./components/Player";
import Enemy from "./components/Enemy";
import EventLog from "./components/EventLog";
import { useEffect } from "react";
import InventoryButton from "./components/InventoryButton";

export default function Home() {
      useEffect(() => {
            document.querySelectorAll("*").forEach((el) => {
                  el.style.setProperty("--rand", Math.random());
            });
      }, []);

      return (
            <div className="w-full lg:max-w-[1100px] h-[100lvh] flex flex-col bg-foreground text-background">
                  <InventoryButton />
                  <div className="p-6 lg:p-12 flex flex-col w-full h-[75%]">
                        <Enemy />
                        <Player />
                  </div>
                  <div className="p-6 lg:p-8 bg-background text-foreground h-[25%]">
                        <EventLog />
                  </div>
            </div>
      );
}

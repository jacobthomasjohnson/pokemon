"use client";

import Player from "./components/Player";
import Enemy from "./components/Enemy";
import EventLog from "./components/EventLog";

export default function Home() {
      return (
            <div className="h-10/12 w-10/12 max-w-[1100px] p-8 flex flex-col bg-white rounded-2xl">
                  <Enemy />
                  <Player />
                  <EventLog />
            </div>
      );
}

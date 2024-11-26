"use client";

import useGameStore from "./gameStore";
import { useEffect, useRef } from "react";

const EventLog = () => {
      const log = useGameStore((state) => state.log);
      const scrollDiv = useRef(null);

      useEffect(() => {
            if (scrollDiv.current) {
                  // Scroll to the bottom instead of top for flex-col-reverse
                  scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight;
            }
      }, [log]); // Re-run whenever `log` updates

      return (
            <div className="mt-4 p-8 border-2 border-neutral-400 bg-gray-100 rounded-2xl">
                  <h3 className="text-xl font-black">Battle Log:</h3>
                  <ul
                        ref={scrollDiv}
                        className="scrollable mt-2 flex flex-col"
                        style={{
                              height: "100px",
                              maxHeight: "100px",
                              overflow: "auto",
                              scrollBehavior: "smooth", // Smooth scrolling behavior
                        }}
                  >
                        {log.map((entry, index) => (
                              <li key={index} className="text-lg">
                                    {entry}
                              </li>
                        ))}
                  </ul>
            </div>
      );
};

export default EventLog;

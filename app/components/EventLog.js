"use client";

import useGameStore from "./gameStore";
import { useEffect, useRef } from "react";

const EventLog = () => {
      const log = useGameStore((state) => state.log);
      const scrollDiv = useRef(null);
      const logContainer = useRef(null);

      useEffect(() => {
            if (logContainer.current) {
                  // Append only the new log entries
                  const newEntry = document.createElement("li");
                  newEntry.textContent = log[log.length - 1];
                  newEntry.className = "text-md log-item";
                  logContainer.current.appendChild(newEntry);
            }
            if (scrollDiv.current) {
                  // Scroll to the bottom
                  scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight;
            }
      }, [log]); // Re-run whenever `log` updates

      return (
            <div className="h-full flex flex-col">
                  <h3 className="text-lg lg:text-3xl lg:mb-4">Battle Log:</h3>
                  <ul
                        ref={scrollDiv}
                        className="scrollable flex flex-col max-h-full overflow-auto scroll-smooth text-xs lg:text-lg"
                  >
                        <div ref={logContainer}></div>
                  </ul>
            </div>
      );
};

export default EventLog;

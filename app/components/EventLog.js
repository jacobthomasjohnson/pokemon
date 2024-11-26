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
        <div className="mt-4 p-4 border-4 border-black bg-gray-100 rounded">
            <h3 className="text-xl font-bold">Battle Log</h3>
            <ul
                ref={scrollDiv}
                className="scrollable mt-2 flex flex-col"
                style={{
                    maxHeight: "100px",
                    overflow: "auto",
                    scrollBehavior: "smooth", // Smooth scrolling behavior
                }}
            >
                {log.map((entry, index) => (
                    <li key={index} className="text-sm">
                        {entry}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventLog;

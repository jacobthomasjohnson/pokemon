import useGameStore from "../store/gameStore";

export default function LogWindow() {
      const logMessage = useGameStore((state) => state.logMessage);

      if (!logMessage) return null;

      return (
            <div
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-background text-foreground z-50 flex items-center justify-center"
            >
                  {logMessage}
            </div>
      );
}

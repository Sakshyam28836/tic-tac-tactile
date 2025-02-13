
import { X, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameBoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
  winningCombination: number[] | null;
}

export const GameBoard = ({ board, onCellClick, winningCombination }: GameBoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 p-2 bg-white rounded-lg shadow-lg max-w-[400px] w-full animate-scale-in">
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => onCellClick(index)}
          disabled={cell !== null}
          className={cn(
            "h-24 md:h-32 flex items-center justify-center bg-game-board rounded transition-all duration-200",
            "hover:bg-game-hover active:scale-95 disabled:cursor-not-allowed",
            winningCombination?.includes(index) && "bg-accent animate-fade-up",
            "border-2 border-gray-100"
          )}
        >
          {cell === "X" && (
            <X
              className="w-12 h-12 text-game-x animate-scale-in"
              strokeWidth={2.5}
            />
          )}
          {cell === "O" && (
            <Circle
              className="w-12 h-12 text-game-o animate-scale-in"
              strokeWidth={2.5}
            />
          )}
        </button>
      ))}
    </div>
  );
};


import { Card } from "@/components/ui/card";
import { Users, Cpu } from "lucide-react";

interface GameModeSelectorProps {
  onSelectMode: (mode: "ai" | "player") => void;
}

export const GameModeSelector = ({ onSelectMode }: GameModeSelectorProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto animate-fade-up">
      <Card
        className="flex-1 p-6 cursor-pointer hover:scale-105 transition-transform duration-200 bg-white/50 backdrop-blur-sm border border-gray-200"
        onClick={() => onSelectMode("player")}
      >
        <div className="flex flex-col items-center gap-4">
          <Users className="w-12 h-12 text-primary" />
          <h3 className="text-xl font-semibold">Player vs Player</h3>
          <p className="text-sm text-gray-500 text-center">
            Play against a friend on the same device
          </p>
        </div>
      </Card>

      <Card
        className="flex-1 p-6 cursor-pointer hover:scale-105 transition-transform duration-200 bg-white/50 backdrop-blur-sm border border-gray-200"
        onClick={() => onSelectMode("ai")}
      >
        <div className="flex flex-col items-center gap-4">
          <Cpu className="w-12 h-12 text-primary" />
          <h3 className="text-xl font-semibold">Player vs AI</h3>
          <p className="text-sm text-gray-500 text-center">
            Challenge our AI with different difficulty levels
          </p>
        </div>
      </Card>
    </div>
  );
};

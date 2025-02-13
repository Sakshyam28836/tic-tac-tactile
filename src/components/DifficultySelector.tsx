
import { Card } from "@/components/ui/card";
import { Brain, Cpu, Sparkles } from "lucide-react";

type Difficulty = "easy" | "medium" | "hard";

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

export const DifficultySelector = ({ onSelectDifficulty }: DifficultySelectorProps) => {
  const difficulties = [
    {
      level: "easy",
      description: "Random moves",
      icon: Cpu,
      color: "text-green-500",
    },
    {
      level: "medium",
      description: "Basic strategy",
      icon: Brain,
      color: "text-yellow-500",
    },
    {
      level: "hard",
      description: "Advanced AI",
      icon: Sparkles,
      color: "text-red-500",
    },
  ];

  return (
    <div className="space-y-4 animate-fade-up">
      <h2 className="text-2xl font-semibold text-center mb-6">Select AI Difficulty</h2>
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        {difficulties.map(({ level, description, icon: Icon, color }) => (
          <Card
            key={level}
            className="p-6 cursor-pointer hover:scale-105 transition-transform duration-200 bg-white/50 backdrop-blur-sm border border-gray-200"
            onClick={() => onSelectDifficulty(level as Difficulty)}
          >
            <div className="flex items-center gap-4">
              <div className={`${color}`}>
                <Icon className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="capitalize text-lg font-medium">
                  {level}
                </h3>
                <p className="text-sm text-gray-500">
                  {description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};


import { Card } from "@/components/ui/card";

type Difficulty = "easy" | "medium" | "hard";

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

export const DifficultySelector = ({ onSelectDifficulty }: DifficultySelectorProps) => {
  return (
    <div className="space-y-4 animate-fade-up">
      <h2 className="text-2xl font-semibold text-center mb-6">Select Difficulty</h2>
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        {["easy", "medium", "hard"].map((difficulty) => (
          <Card
            key={difficulty}
            className="p-4 cursor-pointer hover:scale-105 transition-transform duration-200 bg-white/50 backdrop-blur-sm border border-gray-200"
            onClick={() => onSelectDifficulty(difficulty as Difficulty)}
          >
            <div className="flex items-center justify-between">
              <span className="capitalize text-lg font-medium">
                {difficulty}
              </span>
              <span className="text-sm text-gray-500">
                {difficulty === "easy"
                  ? "Random moves"
                  : difficulty === "medium"
                  ? "Basic strategy"
                  : "Advanced AI"}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

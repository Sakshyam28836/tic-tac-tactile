
import { Card } from "@/components/ui/card";
import { Brain, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Info = () => {
  const navigate = useNavigate();

  const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
    // Store the selected difficulty in sessionStorage
    sessionStorage.setItem('selectedDifficulty', difficulty);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-navy-900 to-navy-950">
      <div className="w-full max-w-3xl space-y-8 text-center">
        <Link to="/">
          <Button variant="ghost" className="mb-4 text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Game
          </Button>
        </Link>

        <h1 className="text-5xl font-bold text-red-500 mb-4">TIC-TAC-TOE</h1>
        <h2 className="text-3xl font-semibold text-orange-400 mb-8">SELECT LEVEL FOR TIC-TAC-TOE</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <Button
            onClick={() => handleDifficultySelect('easy')}
            className="p-6 text-xl bg-green-500 hover:bg-green-600 text-white h-auto"
          >
            Easy Level
          </Button>
          <Button
            onClick={() => handleDifficultySelect('medium')}
            className="p-6 text-xl bg-yellow-500 hover:bg-yellow-600 text-white h-auto"
          >
            Medium Level
          </Button>
          <Button
            onClick={() => handleDifficultySelect('hard')}
            className="p-6 text-xl bg-red-500 hover:bg-red-600 text-white h-auto"
          >
            Hard Level
          </Button>
        </div>

        <Card className="p-6 mt-8 bg-navy-800/50 text-white">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">How to Play</h2>
              <p className="text-gray-300">
                Click on any empty cell to make your move. The goal is to get three
                of your symbols (X or O) in a row - horizontally, vertically, or
                diagonally.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Game Modes</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium">Player vs AI</h3>
                  <p className="text-gray-300">
                    Challenge our AI with different difficulty levels:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-300">
                    <li>Easy: Random moves for beginners</li>
                    <li>Medium: Strategic moves for casual players</li>
                    <li>Hard: Advanced AI using minimax algorithm</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Features</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Multiple AI difficulty levels</li>
                <li>Game history tracking</li>
                <li>Leaderboard system</li>
                <li>User profiles and statistics</li>
                <li>Responsive design for all devices</li>
              </ul>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Info;

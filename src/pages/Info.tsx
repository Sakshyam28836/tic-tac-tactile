
import { Card } from "@/components/ui/card";
import { Brain, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Info = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-3xl space-y-6">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Game
          </Button>
        </Link>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">About Tic-Tac-Toe AI</h1>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">How to Play</h2>
              <p className="text-gray-600">
                Click on any empty cell to make your move. The goal is to get three
                of your symbols (X or O) in a row - horizontally, vertically, or
                diagonally.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Game Modes</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium">Player vs Player</h3>
                  <p className="text-gray-600">
                    Play against a friend on the same device, taking turns to make
                    moves.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Player vs AI</h3>
                  <p className="text-gray-600">
                    Challenge our AI with different difficulty levels:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-gray-600">
                    <li>Easy: Random moves for beginners</li>
                    <li>Medium: Strategic moves for casual players</li>
                    <li>Hard: Advanced AI using minimax algorithm</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Features</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
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


import { useState, useEffect } from "react";
import { GameBoard } from "@/components/GameBoard";
import { GameModeSelector } from "@/components/GameModeSelector";
import { DifficultySelector } from "@/components/DifficultySelector";
import { checkWinner, getAIMove } from "@/utils/gameLogic";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";

type GameMode = "ai" | "player" | null;
type Difficulty = "easy" | "medium" | "hard" | null;

const Index = () => {
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>(null);
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winningCombination, setWinningCombination] = useState<number[] | null>(
    null
  );
  const [gameEnded, setGameEnded] = useState(false);

  const handleCellClick = (index: number) => {
    if (board[index] || gameEnded) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinningCombination(result.combination);
      setGameEnded(true);
      if (result.winner === "draw") {
        toast("Game Over!", { description: "It's a draw!" });
      } else {
        toast("Game Over!", {
          description: `${result.winner} wins!`,
        });
      }
      return;
    }

    if (gameMode === "ai" && currentPlayer === "X") {
      setCurrentPlayer("O");
      // Delay AI move for better UX
      setTimeout(() => {
        const aiMove = getAIMove(newBoard, difficulty!);
        const aiBoard = [...newBoard];
        aiBoard[aiMove] = "O";
        setBoard(aiBoard);
        
        const aiResult = checkWinner(aiBoard);
        if (aiResult) {
          setWinningCombination(aiResult.combination);
          setGameEnded(true);
          if (aiResult.winner === "draw") {
            toast("Game Over!", { description: "It's a draw!" });
          } else {
            toast("Game Over!", {
              description: `${aiResult.winner} wins!`,
            });
          }
        } else {
          setCurrentPlayer("X");
        }
      }, 500);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinningCombination(null);
    setGameEnded(false);
  };

  const startOver = () => {
    resetGame();
    setGameMode(null);
    setDifficulty(null);
  };

  if (!gameMode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <h1 className="text-4xl font-bold mb-12 text-center animate-fade-down">
          Tic-Tac-Toe
        </h1>
        <GameModeSelector onSelectMode={setGameMode} />
      </div>
    );
  }

  if (gameMode === "ai" && !difficulty) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <DifficultySelector onSelectDifficulty={setDifficulty} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="space-y-8 w-full max-w-lg">
        <div className="flex justify-between items-center animate-fade-down">
          <h2 className="text-2xl font-semibold">
            {gameMode === "ai" ? `vs AI (${difficulty})` : "vs Player"}
          </h2>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetGame}
              className="animate-fade-down"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={startOver}
              className="animate-fade-down"
            >
              Change Mode
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center">
          <GameBoard
            board={board}
            onCellClick={handleCellClick}
            winningCombination={winningCombination}
          />
        </div>

        <div className="text-center animate-fade-up">
          <p className="text-lg font-medium">
            {gameEnded
              ? "Game Over!"
              : `Current Player: ${currentPlayer}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

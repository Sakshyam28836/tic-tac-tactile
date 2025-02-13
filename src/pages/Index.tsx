import { useState, useEffect } from "react";
import { GameBoard } from "@/components/GameBoard";
import { GameModeSelector } from "@/components/GameModeSelector";
import { DifficultySelector } from "@/components/DifficultySelector";
import { checkWinner, getAIMove } from "@/utils/gameLogic";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RefreshCw, Info } from "lucide-react";
import { Auth } from "@/components/Auth";
import { Leaderboard } from "@/components/Leaderboard";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";

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
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateGameStats = async (winner: string | null) => {
    if (!user) return;

    let result: 'win' | 'loss' | 'draw';
    
    if (winner === 'draw') {
      result = 'draw';
    } else if (winner === 'X') {
      result = 'win';
    } else {
      result = 'loss';
    }

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        await supabase
          .from('profiles')
          .update({
            total_games: profile.total_games + 1,
            wins: profile.wins + (result === 'win' ? 1 : 0),
            losses: profile.losses + (result === 'loss' ? 1 : 0),
            draws: profile.draws + (result === 'draw' ? 1 : 0),
          })
          .eq('id', user.id);

        await supabase
          .from('game_history')
          .insert({
            user_id: user.id,
            opponent_type: gameMode,
            difficulty: difficulty,
            result,
          });
      }
    } catch (error) {
      console.error('Error updating game stats:', error);
    }
  };

  const makeAIMove = (currentBoard: (string | null)[]) => {
    setIsAIThinking(true);
    setTimeout(() => {
      const aiMove = getAIMove(currentBoard, difficulty!);
      const aiBoard = [...currentBoard];
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
      }
      setCurrentPlayer("X");
      setIsAIThinking(false);
    }, 500);
  };

  const handleCellClick = (index: number) => {
    if (board[index] || gameEnded || isAIThinking) return;

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
      updateGameStats(result.winner);
      return;
    }

    if (gameMode === "ai") {
      setCurrentPlayer("O");
      makeAIMove(newBoard);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinningCombination(null);
    setGameEnded(false);
    setIsAIThinking(false);
  };

  const startOver = () => {
    resetGame();
    setGameMode(null);
    setDifficulty(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-4xl space-y-8">
          <h1 className="text-4xl font-bold text-center mb-8">Tic-Tac-Toe</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <Auth />
            <div className="space-y-6">
              <Leaderboard />
              <Link to="/info">
                <Button variant="outline" className="w-full">
                  <Info className="w-4 h-4 mr-2" />
                  How to Play
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!showGame) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Welcome to Tic-Tac-Toe</h1>
          <div className="space-x-4">
            <Button onClick={() => setShowGame(true)}>Start Game</Button>
            <Link to="/info">
              <Button variant="outline">
                <Info className="w-4 h-4 mr-2" />
                How to Play
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              : isAIThinking
              ? "AI is thinking..."
              : `Current Player: ${currentPlayer}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

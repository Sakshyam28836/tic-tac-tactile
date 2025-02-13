
export const checkWinner = (board: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combination: [a, b, c] };
    }
  }

  if (board.every((cell) => cell !== null)) {
    return { winner: "draw", combination: null };
  }

  return null;
};

export const getAIMove = (board: (string | null)[], difficulty: string) => {
  const availableMoves = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index): index is number => index !== null);

  if (difficulty === "easy") {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  if (difficulty === "medium") {
    // Try to win or block opponent from winning
    const aiPlayer = "O";
    const humanPlayer = "X";

    // Check for winning move
    for (const move of availableMoves) {
      const boardCopy = [...board];
      boardCopy[move] = aiPlayer;
      if (checkWinner(boardCopy)?.winner === aiPlayer) {
        return move;
      }
    }

    // Check for blocking move
    for (const move of availableMoves) {
      const boardCopy = [...board];
      boardCopy[move] = humanPlayer;
      if (checkWinner(boardCopy)?.winner === humanPlayer) {
        return move;
      }
    }

    // Take center if available
    if (availableMoves.includes(4)) return 4;

    // Take random move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  // Hard difficulty - Improved Minimax algorithm with alpha-beta pruning
  const minimax = (
    board: (string | null)[],
    depth: number,
    isMaximizing: boolean,
    alpha: number = -Infinity,
    beta: number = Infinity
  ): number => {
    const result = checkWinner(board);
    
    if (result?.winner === "O") return 10 - depth;
    if (result?.winner === "X") return depth - 10;
    if (result?.winner === "draw") return 0;
    
    const available = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((index): index is number => index !== null);

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (const move of available) {
        board[move] = "O";
        const score = minimax(board, depth + 1, false, alpha, beta);
        board[move] = null;
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, bestScore);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (const move of available) {
        board[move] = "X";
        const score = minimax(board, depth + 1, true, alpha, beta);
        board[move] = null;
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, bestScore);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
      return bestScore;
    }
  };

  // Add strategic move preferences for first moves in hard mode
  if (availableMoves.length >= 8) {
    // First move: prefer corners and center
    const preferredMoves = [0, 2, 4, 6, 8].filter(move => availableMoves.includes(move));
    if (preferredMoves.length > 0) {
      return preferredMoves[Math.floor(Math.random() * preferredMoves.length)];
    }
  }

  let bestScore = -Infinity;
  let bestMove = availableMoves[0];

  for (const move of availableMoves) {
    const boardCopy = [...board];
    boardCopy[move] = "O";
    const score = minimax(boardCopy, 0, false);
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
};


import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qgqfglapsssxoqihhvrrc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFncWZnbGFwc3N4b3FpaGh2cnJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5ODM0MjAsImV4cCI6MjAyNDU1OTQyMH0.GrpSGApo0qBmfguWqYz9fzQbiL7UdaNN_vVXAA_lam4';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type GameResult = {
  id: string;
  user_id: string;
  opponent_type: 'ai' | 'player';
  difficulty?: 'easy' | 'medium' | 'hard' | null;
  result: 'win' | 'loss' | 'draw';
  created_at: string;
};

export type Profile = {
  id: string;
  username: string;
  total_games: number;
  wins: number;
  losses: number;
  draws: number;
};

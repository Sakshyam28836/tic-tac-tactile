
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'your-anon-key';

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

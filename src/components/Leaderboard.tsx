
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/lib/supabase";
import { Trophy } from "lucide-react";

export const Leaderboard = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('wins', { ascending: false })
          .limit(10);

        if (error) throw error;
        setProfiles(data || []);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="text-center">Loading leaderboard...</div>;
  }

  return (
    <Card className="p-6 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold">Leaderboard</h2>
      </div>
      <div className="space-y-4">
        {profiles.map((profile, index) => (
          <div
            key={profile.id}
            className="flex items-center justify-between p-4 bg-white/50 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold">{index + 1}</span>
              <div>
                <p className="font-semibold">{profile.username}</p>
                <p className="text-sm text-gray-500">
                  Games: {profile.total_games}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-500">{profile.wins} Wins</p>
              <p className="text-sm text-gray-500">
                {profile.losses} Losses, {profile.draws} Draws
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

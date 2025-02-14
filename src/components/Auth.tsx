
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (!isLogin && !username) {
      toast.error("Username is required for registration");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (!email.includes('@')) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInputs()) return;
    
    setIsLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        
        if (error) throw error;
        if (data.user) {
          toast.success("Successfully logged in!");
        }
      } else {
        const { data: existingUsers, error: checkError } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', username.trim());

        if (checkError) throw checkError;
        
        if (existingUsers && existingUsers.length > 0) {
          toast.error("Username already taken");
          setIsLoading(false);
          return;
        }

        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              username: username.trim(),
            },
          },
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          // Create profile record
          const { error: profileError } = await supabase.from('profiles').insert({
            id: data.user.id,
            username: username.trim(),
            total_games: 0,
            wins: 0,
            losses: 0,
            draws: 0,
          });

          if (profileError) throw profileError;
          
          toast.success("Registration successful! Please check your email for verification.");
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      if (error.message.includes('Email rate limit exceeded')) {
        toast.error("Too many attempts. Please try again later.");
      } else if (error.message.includes('Invalid login credentials')) {
        toast.error("Invalid email or password");
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? "Login" : "Register"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              disabled={isLoading}
              className="w-full"
              minLength={3}
              maxLength={20}
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            disabled={isLoading}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            minLength={6}
            disabled={isLoading}
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Loading..." : isLogin ? "Login" : "Register"}
        </Button>
      </form>
      <p className="text-center mt-4 text-sm">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            resetForm();
          }}
          className="text-primary hover:underline"
          type="button"
          disabled={isLoading}
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </Card>
  );
};

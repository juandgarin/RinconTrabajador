import { useState, useEffect } from 'react';
import { User } from '../types';
import { login, signup, logout, getCurrentUser } from '../services/supabaseService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setLoading(false);
      } catch (err) {
        setError('Error checking current user');
        setLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const loggedInUser = await login(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      setError('Error logging in');
      return null;
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      const newUser = await signup(email, password);
      setUser(newUser);
      return newUser;
    } catch (err) {
      setError('Error signing up');
      return null;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (err) {
      setError('Error logging out');
    }
  };

  return { user, loading, error, handleLogin, handleSignup, handleLogout };
};
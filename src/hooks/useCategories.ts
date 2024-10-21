import { useState, useEffect } from 'react';
import { Category } from '../types';
import { getCategories } from '../services/supabaseService';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
        setLoading(false);
      } catch (err) {
        setError('Error fetching categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
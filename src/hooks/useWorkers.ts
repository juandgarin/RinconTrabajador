import { useState, useEffect } from 'react';
import { Worker } from '../types';
import { getWorkers } from '../services/supabaseService';

export const useWorkers = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const fetchedWorkers = await getWorkers();
        setWorkers(fetchedWorkers);
        setLoading(false);
      } catch (err) {
        setError('Error fetching workers');
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  const addWorker = (worker: Worker) => {
    setWorkers([...workers, worker]);
  };

  const updateWorker = (updatedWorker: Worker) => {
    setWorkers(workers.map(w => w.id === updatedWorker.id ? updatedWorker : w));
  };

  return { workers, loading, error, addWorker, updateWorker };
};
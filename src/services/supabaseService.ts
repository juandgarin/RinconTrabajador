import { createClient } from '@supabase/supabase-js';
import { Worker, Job, Category, User, JobStatus } from '../types';
import { initialWorkers, initialJobs, initialCategories } from '../mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';

let supabase: any;

if (!useMockData && supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export const getWorkers = async (): Promise<Worker[]> => {
  if (useMockData) {
    return Promise.resolve(initialWorkers);
  }
  if (!supabase) throw new Error('Supabase client is not initialized');
  const { data, error } = await supabase.from('workers').select('*');
  if (error) throw error;
  return data as Worker[];
};

export const getJobs = async (userId: string): Promise<Job[]> => {
  if (useMockData) {
    return Promise.resolve(initialJobs.filter(job => job.workerId.toString() === userId || job.clientId === userId));
  }
  if (!supabase) throw new Error('Supabase client is not initialized');
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .or(`workerId.eq.${userId},clientId.eq.${userId}`);
  if (error) throw error;
  return data as Job[];
};

export const updateJobStatus = async (jobId: string, newStatus: JobStatus): Promise<void> => {
  if (useMockData) {
    console.log(`Updating job ${jobId} status to ${newStatus}`);
    return Promise.resolve();
  }
  if (!supabase) throw new Error('Supabase client is not initialized');
  const { error } = await supabase
    .from('jobs')
    .update({ status: newStatus })
    .eq('id', jobId);
  if (error) throw error;
};

export const addJobComment = async (jobId: string, comment: string): Promise<void> => {
  if (useMockData) {
    console.log(`Adding comment to job ${jobId}: ${comment}`);
    return Promise.resolve();
  }
  if (!supabase) throw new Error('Supabase client is not initialized');
  const { error } = await supabase
    .from('jobs')
    .update({ clientComment: comment })
    .eq('id', jobId);
  if (error) throw error;
};

export const getCategories = async (): Promise<Category[]> => {
  if (useMockData) {
    return Promise.resolve(initialCategories);
  }
  if (!supabase) throw new Error('Supabase client is not initialized');
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return data as Category[];
};

export const login = async (email: string, password: string): Promise<User> => {
  if (useMockData) {
    return Promise.resolve({ id: '1', email, isWorker: false });
  }
  if (!supabase) throw new Error('Supabase client is not initialized');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user as User;
};

export const signup = async (email: string, password: string): Promise<User> => {
  if (useMockData) {
    return Promise.resolve({ id: '2', email, isWorker: false });
  }
  if (!supabase) throw new Error('Supabase client is not initialized');
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data.user as User;
};

export const logout = async (): Promise<void> => {
  if (useMockData) {
    console.log('Mock logout successful');
    return Promise.resolve();
  }
  if (!supabase) throw new Error('Supabase client is not initialized');
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async (): Promise<User | null> => {
  if (useMockData) {
    return Promise.resolve({ id: '1', email: 'user@example.com', isWorker: false });
  }
  if (!supabase) throw new Error('Supabase client is not initialized');
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user as User | null;
};
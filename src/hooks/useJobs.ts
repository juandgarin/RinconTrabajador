import { useState, useEffect } from 'react';
import { Job, JobStatus } from '../types';
import { getJobs, updateJobStatus, addJobComment } from '../services/supabaseService';

export const useJobs = (userId: string) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = await getJobs(userId);
        setJobs(fetchedJobs);
        setLoading(false);
      } catch (err) {
        setError('Error fetching jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, [userId]);

  const addJob = (job: Job) => {
    setJobs([...jobs, job]);
  };

  const updateJobStatus = async (jobId: string, newStatus: JobStatus) => {
    try {
      await updateJobStatus(jobId, newStatus);
      setJobs(jobs.map(job => job.id === jobId ? { ...job, status: newStatus } : job));
    } catch (err) {
      setError('Error updating job status');
    }
  };

  const addComment = async (jobId: string, comment: string) => {
    try {
      await addJobComment(jobId, comment);
      setJobs(jobs.map(job => job.id === jobId ? { ...job, clientComment: comment } : job));
    } catch (err) {
      setError('Error adding comment');
    }
  };

  return { jobs, loading, error, addJob, updateJobStatus, addComment };
};
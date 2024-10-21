import React from 'react';
import { Job, JobStatus, User } from '../types';

interface JobListProps {
  jobs: Job[];
  currentUser: User;
  onUpdateJobStatus: (jobId: string, newStatus: JobStatus) => void;
  onAddComment: (jobId: string, comment: string) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, currentUser, onUpdateJobStatus, onAddComment }) => {
  const [commentText, setCommentText] = React.useState<string>('');

  const handleStatusChange = (jobId: string, newStatus: JobStatus) => {
    onUpdateJobStatus(jobId, newStatus);
  };

  const handleCommentSubmit = (jobId: string) => {
    if (commentText.trim()) {
      onAddComment(jobId, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="border rounded p-4">
          <h3 className="text-lg font-semibold mb-2">Trabajo para {job.workerId}</h3>
          <p><strong>Estado:</strong> {job.status}</p>
          <p><strong>Descripción:</strong> {job.description}</p>
          <p><strong>Fecha:</strong> {job.date}</p>
          <p><strong>Hora:</strong> {job.time}</p>
          {job.clientComment && (
            <p><strong>Comentario del cliente:</strong> {job.clientComment}</p>
          )}
          {currentUser.isWorker && job.status === JobStatus.OPEN && (
            <div className="mt-2">
              <button
                onClick={() => handleStatusChange(job.id, JobStatus.ACCEPTED)}
                className="bg-green-500 text-white py-1 px-2 rounded mr-2"
              >
                Aceptar
              </button>
              <button
                onClick={() => handleStatusChange(job.id, JobStatus.REJECTED)}
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                Rechazar
              </button>
            </div>
          )}
          {currentUser.isWorker && job.status === JobStatus.ACCEPTED && (
            <button
              onClick={() => handleStatusChange(job.id, JobStatus.COMPLETED)}
              className="mt-2 bg-blue-500 text-white py-1 px-2 rounded"
            >
              Marcar como completado
            </button>
          )}
          {!currentUser.isWorker && job.status === JobStatus.COMPLETED && !job.clientComment && (
            <div className="mt-2">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Añade un comentario..."
              ></textarea>
              <button
                onClick={() => handleCommentSubmit(job.id)}
                className="mt-2 bg-blue-500 text-white py-1 px-2 rounded"
              >
                Enviar comentario
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobList;
import React from 'react';
import { Job, JobStatus, User } from '../types';
import { Briefcase, CheckCircle, XCircle, Clock, MessageSquare } from 'lucide-react';

interface MyJobsProps {
  jobs: Job[];
  currentUser: User;
  onUpdateJobStatus: (jobId: string, newStatus: JobStatus) => void;
  onAddComment: (jobId: string, comment: string) => void;
}

const MyJobs: React.FC<MyJobsProps> = ({ jobs, currentUser, onUpdateJobStatus, onAddComment }) => {
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

  const getStatusIcon = (status: JobStatus) => {
    switch (status) {
      case JobStatus.OPEN:
        return <Clock className="text-yellow-500" />;
      case JobStatus.ACCEPTED:
        return <CheckCircle className="text-green-500" />;
      case JobStatus.REJECTED:
        return <XCircle className="text-red-500" />;
      case JobStatus.COMPLETED:
        return <CheckCircle className="text-blue-500" />;
      case JobStatus.CLOSED:
        return <Briefcase className="text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Mis Trabajos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b bg-gray-50 dark:bg-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold dark:text-white">Trabajo #{job.id}</h3>
                <div className="flex items-center">
                  {getStatusIcon(job.status)}
                  <span className="ml-2 text-sm font-medium dark:text-gray-300">{job.status}</span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="mb-2 dark:text-gray-300"><strong>Descripción:</strong> {job.description}</p>
              <p className="mb-2 dark:text-gray-300"><strong>Fecha:</strong> {job.date}</p>
              <p className="mb-2 dark:text-gray-300"><strong>Hora:</strong> {job.time}</p>
              {job.clientComment && (
                <div className="mb-2">
                  <strong className="dark:text-gray-300">Comentario del cliente:</strong>
                  <p className="bg-blue-50 dark:bg-blue-900 p-2 rounded mt-1 dark:text-gray-300">{job.clientComment}</p>
                </div>
              )}
              {currentUser.isWorker && job.status === JobStatus.OPEN && (
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(job.id, JobStatus.ACCEPTED)}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 flex-1"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => handleStatusChange(job.id, JobStatus.REJECTED)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 flex-1"
                  >
                    Rechazar
                  </button>
                </div>
              )}
              {currentUser.isWorker && job.status === JobStatus.ACCEPTED && (
                <button
                  onClick={() => handleStatusChange(job.id, JobStatus.COMPLETED)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Marcar como completado
                </button>
              )}
              {!currentUser.isWorker && job.status === JobStatus.COMPLETED && !job.clientComment && (
                <div className="mt-4">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    placeholder="Añade un comentario..."
                    rows={3}
                  ></textarea>
                  <button
                    onClick={() => handleCommentSubmit(job.id)}
                    className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Enviar comentario
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyJobs;
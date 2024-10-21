import React from 'react';
import { Worker } from '../types';
import { Star, Phone, Mail, Info, Briefcase } from 'lucide-react';

interface WorkerListProps {
  workers: Worker[];
  onSelectWorker: (worker: Worker) => void;
  onProposeJob: (worker: Worker) => void;
}

const WorkerList: React.FC<WorkerListProps> = ({ workers, onSelectWorker, onProposeJob }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workers.map((worker) => (
        <div key={worker.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">{worker.name}</h3>
            <div className="flex items-center mb-4">
              <Star className="text-yellow-400 mr-1" size={20} />
              <span className="font-medium dark:text-gray-300">{worker.rating.toFixed(1)}</span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Phone className="mr-2" size={16} />
                <a href={`tel:${worker.phone}`} className="hover:text-vercel-blue dark:hover:text-vercel-cyan">{worker.phone}</a>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Mail className="mr-2" size={16} />
                <a href={`mailto:${worker.email}`} className="hover:text-vercel-blue dark:hover:text-vercel-cyan">{worker.email}</a>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onSelectWorker(worker)}
                className="flex-1 btn btn-secondary dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 flex items-center justify-center"
              >
                <Info size={16} className="mr-2" />
                Ver detalles
              </button>
              <button
                onClick={() => onProposeJob(worker)}
                className="flex-1 btn btn-primary dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 flex items-center justify-center"
              >
                <Briefcase size={16} className="mr-2" />
                Proponer trabajo
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkerList;
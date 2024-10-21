import React, { useState } from 'react';
import { Job, JobStatus, Worker } from '../types';
import Modal from './Modal';

interface NewJobProposalProps {
  isOpen: boolean;
  onClose: () => void;
  worker: Worker;
  onSubmit: (job: Omit<Job, 'id'>) => void;
  clientId: string;
}

const NewJobProposal: React.FC<NewJobProposalProps> = ({ isOpen, onClose, worker, onSubmit, clientId }) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      workerId: worker.id,
      clientId,
      status: JobStatus.OPEN,
      description,
      date,
      time,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Proponer nuevo trabajo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción del trabajo
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
            Hora
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
          Enviar propuesta
        </button>
      </form>
    </Modal>
  );
};

export default NewJobProposal;
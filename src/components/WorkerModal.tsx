import React, { useState } from 'react';
import { Worker, Job, JobStatus } from '../types';
import { X, Star, Briefcase } from 'lucide-react';

interface WorkerModalProps {
  worker: Worker;
  onClose: () => void;
  completedJobs: Job[];
}

const WorkerModal: React.FC<WorkerModalProps> = ({ worker, onClose, completedJobs }) => {
  const [userNotes, setUserNotes] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{worker.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Detalles del trabajo</h3>
                <p>{worker.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Activos</h3>
                <div className="grid grid-cols-2 gap-4">
                  {worker.assets.map((asset, index) => (
                    <div key={index} className="border rounded p-2">
                      <img src={asset.url} alt={asset.title} className="w-full h-32 object-cover rounded mb-2" />
                      <h4 className="font-semibold">{asset.title}</h4>
                      <p className="text-sm">{asset.description}</p>
                      <p className="text-sm font-semibold mt-1">
                        Precio adicional: {asset.additionalPrice.amount}€ / {asset.additionalPrice.unit === 'hour' ? 'hora' : 'trabajo'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Notas del usuario</h3>
                <textarea
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows={4}
                  placeholder="Añade tus notas aquí..."
                ></textarea>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Historial y comentarios</h3>
                {worker.history.map((item, index) => (
                  <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                    <div className="flex items-center mb-1">
                      <Star className="text-yellow-400 mr-1" size={16} />
                      <span>{item.rating}</span>
                    </div>
                    <p>{item.comment}</p>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Trabajos completados</h3>
                {completedJobs.length > 0 ? (
                  completedJobs.map((job, index) => (
                    <div key={index} className="mb-2 p-2 bg-green-100 rounded">
                      <div className="flex items-center mb-1">
                        <Briefcase className="text-green-600 mr-1" size={16} />
                        <span className="font-semibold">Trabajo #{job.id}</span>
                      </div>
                      <p><strong>Fecha:</strong> {job.date}</p>
                      <p><strong>Descripción:</strong> {job.description}</p>
                      {job.clientComment && (
                        <p><strong>Comentario del cliente:</strong> {job.clientComment}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No hay trabajos completados aún.</p>
                )}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Información de contacto</h3>
                <p>Teléfono: {worker.phone}</p>
                <p>Email: {worker.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerModal;
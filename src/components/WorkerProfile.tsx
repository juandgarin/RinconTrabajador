import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { User, Worker, Category, Asset } from '../types';

interface WorkerProfileProps {
  user: User;
  categories: Category[];
  onClose: () => void;
  onRegister: (worker: Omit<Worker, 'id' | 'rating' | 'history'>) => void;
  onUpdate: (worker: Worker) => void;
  currentWorker: Worker | undefined;
}

const WorkerProfile: React.FC<WorkerProfileProps> = ({
  user,
  categories,
  onClose,
  onRegister,
  onUpdate,
  currentWorker,
}) => {
  const [name, setName] = useState(currentWorker?.name || '');
  const [category, setCategory] = useState(currentWorker?.category || categories[0].id);
  const [phone, setPhone] = useState(currentWorker?.phone || '');
  const [description, setDescription] = useState(currentWorker?.description || '');
  const [assets, setAssets] = useState<Asset[]>(currentWorker?.assets || []);

  useEffect(() => {
    if (currentWorker) {
      setName(currentWorker.name);
      setCategory(currentWorker.category);
      setPhone(currentWorker.phone);
      setDescription(currentWorker.description);
      setAssets(currentWorker.assets);
    }
  }, [currentWorker]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const workerData = {
      name,
      category,
      phone,
      email: user.email,
      description,
      assets,
    };

    if (currentWorker) {
      onUpdate({ ...currentWorker, ...workerData });
    } else {
      onRegister(workerData);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newAssets = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        title: '',
        description: '',
        additionalPrice: { amount: 0, unit: 'hour' as const },
      }));
      setAssets([...assets, ...newAssets]);
    }
  };

  const updateAsset = (index: number, field: keyof Asset, value: any) => {
    const updatedAssets = [...assets];
    updatedAssets[index] = { ...updatedAssets[index], [field]: value };
    setAssets(updatedAssets);
  };

  const deleteAsset = (index: number) => {
    const updatedAssets = assets.filter((_, i) => i !== index);
    setAssets(updatedAssets);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {currentWorker ? 'Editar perfil de trabajador' : 'Registrarse como trabajador'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(Number(e.target.value))}
                className="w-full p-2 border rounded"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activos
              </label>
              {assets.map((asset, index) => (
                <div key={index} className="mb-4 p-4 border rounded relative">
                  <button
                    type="button"
                    onClick={() => deleteAsset(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                  <img src={asset.url} alt={`Asset ${index + 1}`} className="w-full h-32 object-cover rounded mb-2" />
                  <input
                    type="text"
                    value={asset.title}
                    onChange={(e) => updateAsset(index, 'title', e.target.value)}
                    placeholder="Título del activo"
                    className="w-full p-2 border rounded mb-2"
                  />
                  <textarea
                    value={asset.description}
                    onChange={(e) => updateAsset(index, 'description', e.target.value)}
                    placeholder="Descripción del activo"
                    className="w-full p-2 border rounded mb-2"
                    rows={3}
                  ></textarea>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={asset.additionalPrice.amount}
                      onChange={(e) => updateAsset(index, 'additionalPrice', { ...asset.additionalPrice, amount: Number(e.target.value) })}
                      placeholder="Precio adicional"
                      className="w-1/2 p-2 border rounded mr-2"
                    />
                    <select
                      value={asset.additionalPrice.unit}
                      onChange={(e) => updateAsset(index, 'additionalPrice', { ...asset.additionalPrice, unit: e.target.value as 'hour' | 'job' })}
                      className="w-1/2 p-2 border rounded"
                    >
                      <option value="hour">Por hora</option>
                      <option value="job">Por trabajo</option>
                    </select>
                  </div>
                </div>
              ))}
              <label htmlFor="image-upload" className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 inline-flex items-center">
                <Upload size={16} className="mr-2" />
                Subir imágenes
              </label>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
              {currentWorker ? 'Actualizar perfil' : 'Registrarse como trabajador'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
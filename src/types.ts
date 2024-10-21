import { ReactNode } from 'react';

export interface Category {
  id: number;
  name: string;
}

export interface Asset {
  url: string;
  title: string;
  description: string;
  additionalPrice: {
    amount: number;
    unit: 'hour' | 'job';
  };
}

export interface Worker {
  id: number;
  name: string;
  category: number;
  phone: string;
  email: string;
  rating: number;
  description: string;
  assets: Asset[];
  history: { comment: string; rating: number }[];
}

export interface User {
  id: string;
  email: string;
  isWorker: boolean;
}

export enum JobStatus {
  OPEN = 'OPEN',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  CLOSED = 'CLOSED'
}

export interface Job {
  id: string;
  workerId: number;
  clientId: string;
  status: JobStatus;
  description: string;
  date: string;
  time: string;
  clientComment?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
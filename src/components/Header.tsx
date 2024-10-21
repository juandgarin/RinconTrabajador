import React from 'react';
import { Briefcase, LogIn, UserPlus, LogOut, User, FileText, Moon, Sun } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout: () => void;
  onWorkerProfileClick: () => void;
  onMyJobsClick: () => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onLoginClick, 
  onSignupClick, 
  onLogout, 
  onWorkerProfileClick,
  onMyJobsClick,
  darkMode,
  setDarkMode
}) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Briefcase size={24} className="text-vercel-blue dark:text-vercel-cyan" />
          <h1 className="text-2xl font-bold dark:text-white">Trabajadores de Ibiza</h1>
        </div>
        <nav>
          <ul className="flex space-x-4 items-center">
            {user ? (
              <>
                <li>
                  <span className="mr-2 text-gray-600 dark:text-gray-300">{user.email}</span>
                </li>
                <li>
                  <button onClick={onWorkerProfileClick} className="btn btn-secondary dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 flex items-center">
                    <User size={16} className="mr-1" />
                    {user.isWorker ? 'Editar perfil' : 'Registrarse como trabajador'}
                  </button>
                </li>
                <li>
                  <button onClick={onMyJobsClick} className="btn btn-secondary dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 flex items-center">
                    <FileText size={16} className="mr-1" />
                    Mis trabajos
                  </button>
                </li>
                <li>
                  <button onClick={onLogout} className="btn btn-primary dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 flex items-center">
                    <LogOut size={16} className="mr-1" />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={onLoginClick} className="btn btn-secondary dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 flex items-center">
                    <LogIn size={16} className="mr-1" />
                    Login
                  </button>
                </li>
                <li>
                  <button onClick={onSignupClick} className="btn btn-primary dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 flex items-center">
                    <UserPlus size={16} className="mr-1" />
                    Sign Up
                  </button>
                </li>
              </>
            )}
            <li>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
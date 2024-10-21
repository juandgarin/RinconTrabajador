import React from 'react';
import { Search } from 'lucide-react';
import Header from './components/Header';
import CategoryList from './components/CategoryList';
import WorkerList from './components/WorkerList';
import WorkerModal from './components/WorkerModal';
import Login from './components/Login';
import Signup from './components/Signup';
import WorkerProfile from './components/WorkerProfile';
import NewJobProposal from './components/NewJobProposal';
import MyJobs from './pages/MyJobs';
import { useWorkers } from './hooks/useWorkers';
import { useJobs } from './hooks/useJobs';
import { useCategories } from './hooks/useCategories';
import { useAuth } from './hooks/useAuth';

function App() {
  const { workers, addWorker, updateWorker } = useWorkers();
  const { categories } = useCategories();
  const { user, handleLogin, handleSignup, handleLogout } = useAuth();
  const { jobs, addJob, updateJobStatus, addComment } = useJobs(user?.id || '');

  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedWorker, setSelectedWorker] = React.useState<Worker | null>(null);
  const [showLogin, setShowLogin] = React.useState(false);
  const [showSignup, setShowSignup] = React.useState(false);
  const [showWorkerProfile, setShowWorkerProfile] = React.useState(false);
  const [showNewJobProposal, setShowNewJobProposal] = React.useState(false);
  const [showMyJobs, setShowMyJobs] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [darkMode, setDarkMode] = React.useState(false);
  const workersPerPage = 9;

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const filteredWorkers = workers.filter(worker => 
    (selectedCategory === null || worker.category === selectedCategory) &&
    worker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastWorker = currentPage * workersPerPage;
  const indexOfFirstWorker = indexOfLastWorker - workersPerPage;
  const currentWorkers = filteredWorkers.slice(indexOfFirstWorker, indexOfLastWorker);
  const totalPages = Math.ceil(filteredWorkers.length / workersPerPage);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header
          user={user}
          onLoginClick={() => setShowLogin(true)}
          onSignupClick={() => setShowSignup(true)}
          onLogout={handleLogout}
          onWorkerProfileClick={() => setShowWorkerProfile(true)}
          onMyJobsClick={() => setShowMyJobs(true)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        {showMyJobs ? (
          <MyJobs
            jobs={jobs}
            currentUser={user!}
            onUpdateJobStatus={updateJobStatus}
            onAddComment={addComment}
          />
        ) : (
          <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar trabajadores..."
                  className="input pl-10 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <aside className="md:col-span-1">
                <CategoryList 
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </aside>
              <div className="md:col-span-3">
                <WorkerList
                  workers={currentWorkers}
                  onSelectWorker={setSelectedWorker}
                  onProposeJob={(worker) => {
                    setSelectedWorker(worker);
                    setShowNewJobProposal(true);
                  }}
                />
                <div className="mt-8 flex justify-center">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`mx-1 px-3 py-1 rounded ${
                        currentPage === page
                          ? 'bg-black text-white dark:bg-white dark:text-black'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </main>
        )}

        {showLogin && (
          <Login onLogin={handleLogin} onClose={() => setShowLogin(false)} />
        )}

        {showSignup && (
          <Signup onSignup={handleSignup} onClose={() => setShowSignup(false)} />
        )}

        {showWorkerProfile && (
          <WorkerProfile
            user={user!}
            categories={categories}
            onClose={() => setShowWorkerProfile(false)}
            onRegister={addWorker}
            onUpdate={updateWorker}
            currentWorker={workers.find(w => w.id === Number(user?.id))}
          />
        )}

        {selectedWorker && (
          <WorkerModal
            worker={selectedWorker}
            onClose={() => setSelectedWorker(null)}
            completedJobs={jobs.filter(job => job.workerId === selectedWorker.id && job.status === 'COMPLETED')}
          />
        )}

        {showNewJobProposal && selectedWorker && user && (
          <NewJobProposal
            isOpen={showNewJobProposal}
            onClose={() => setShowNewJobProposal(false)}
            worker={selectedWorker}
            onSubmit={addJob}
            clientId={user.id}
          />
        )}
      </div>
    </div>
  );
}

export default App;
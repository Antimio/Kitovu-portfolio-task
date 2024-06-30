import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReposList from './components/ReposList';
import RepoDetails from './components/RepoDetails';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
          <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
            <Routes>
              <Route path="/" element={<ReposList />} />
              <Route path="/repo/:owner/:repo" element={<RepoDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;

import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { PromptForm } from './components/PromptForm';
import { PromptResult } from './components/PromptResult';
import { Dashboard } from './components/Dashboard';
import { PrivateRoute } from './components/PrivateRoute';
import ModernApp from './components/ModernApp';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { FeaturesPage } from './components/FeaturesPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import api from './services/api';
import { DashboardLayout } from './components/DashboardLayout';

function PromptGenerator() {
  const [keywords, setKeywords] = useState('');
  const [taskType, setTaskType] = useState('coding');
  const [targetPlatform, setTargetPlatform] = useState('vscode');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState('new');
  const [model, setModel] = useState('gpt4');
  const { currentUser } = useAuth();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/generate`, {
        keywords,
        taskType,
        targetPlatform,
      });

      setGeneratedPrompt(response.data.prompt);
    } catch (err: any) {
      console.error('Error generating prompt:', err);
      setError(
        err.response?.data?.error || 'Failed to generate prompt. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePrompt = async () => {
    if (!currentUser) return;
    setIsSaving(true);
    try {
      await api.post('/save-prompt', {
        keywords,
        taskType,
        targetPlatform,
        generatedPrompt
      });
      alert('Prompt saved successfully!');
    } catch (err) {
      console.error('Error saving prompt:', err);
      alert('Failed to save prompt.');
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <DashboardLayout
      activeNav={activeNav}
      setActiveNav={setActiveNav}
      rightPanel={
        <PromptResult
          prompt={generatedPrompt}
          isLoading={isLoading}
          onSave={currentUser ? handleSavePrompt : undefined}
          isSaving={isSaving}
        />
      }
    >
      {activeNav === 'new' && (
        <PromptForm
          keywords={keywords}
          setKeywords={setKeywords}
          taskType={taskType}
          setTaskType={setTaskType}
          targetPlatform={targetPlatform}
          setTargetPlatform={setTargetPlatform}
          onSubmit={handleGenerate}
          isLoading={isLoading}
          model={model}
          setModel={setModel}
        />
      )}
      {activeNav === 'history' && (
        <div className="p-8">
          <Dashboard />
        </div>
      )}
      {activeNav === 'templates' && (
        <div className="h-full flex items-center justify-center text-slate-500">
          Templates feature coming soon
        </div>
      )}
      {activeNav === 'settings' && (
        <div className="h-full flex items-center justify-center text-slate-500">
          Settings feature coming soon
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium backdrop-blur-xl z-50"
        >
          {error}
        </motion.div>
      )}
    </DashboardLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ModernApp />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/login" element={<ModernApp initialTab="login" />} />
          <Route path="/signup" element={<ModernApp initialTab="signup" />} />
          <Route path="/forgot-password" element={<ModernApp initialTab="forgot-password" />} />

          <Route
            path="/app"
            element={
              <PrivateRoute>
                <PromptGenerator />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <div className="app-container">
                  <header className="app-header">
                    <div className="header-content">
                      <h1>Prompt Maker</h1>
                      <nav>
                        <Link to="/app" className="nav-link">Generator</Link>
                        <Link to="/dashboard" className="nav-link">My Prompts</Link>
                      </nav>
                    </div>
                    <div className="user-info">
                      <LogoutButton />
                    </div>
                  </header>
                  <main className="app-main">
                    <Dashboard />
                  </main>
                </div>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const LogoutButton = () => {
  const { currentUser } = useAuth();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optional: Redirect to home after logout
      // window.location.href = '/'; 
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <>
      <span>{currentUser?.email}</span>
      <button onClick={handleLogout} className="btn-secondary">Log Out</button>
    </>
  )
}

export default App;

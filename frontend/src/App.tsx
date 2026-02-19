import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { PromptForm } from './components/PromptForm';
import { PromptResult } from './components/PromptResult';
import { HistoryView } from './components/HistoryView';
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


const GEMINI_MODEL = "gemini-2.5-flash-lite";

function PromptGenerator() {
  const [keywords, setKeywords] = useState('');
  const [taskType, setTaskType] = useState('writing');
  const [targetPlatform, setTargetPlatform] = useState('ChatGPT');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentPrompts, setRecentPrompts] = useState<any[]>([]);
  const [activeNav, setActiveNav] = useState('new');
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchRecentPrompts();
  }, []);

  const fetchRecentPrompts = async () => {
    try {
      const response = await api.get('/get-prompts');
      setRecentPrompts(response.data.prompts || []);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  const handleNewChat = () => {
    setKeywords('');
    setGeneratedPrompt('');
    setError(null);
    setActiveNav('new');
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      const response = await api.post('/generate', {
        prompt: keywords,
        mode: taskType,
        platform: targetPlatform
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

  // Auto-save effect when a new prompt is generated successfully
  useEffect(() => {
    if (generatedPrompt && currentUser && !isLoading) {
      handleSavePrompt();
    }
  }, [generatedPrompt]);

  const handleSavePrompt = async () => {
    if (!currentUser) return;
    setIsSaving(true);
    try {
      await api.post('/save-prompt', {
        keywords,
        taskType,
        targetPlatform, // Fixed: use state variable
        tone: 'Professional', // Simplified
        model: GEMINI_MODEL,
        generatedPrompt
      });
      fetchRecentPrompts();
    } catch (err) {
      console.error('Error saving prompt:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadLibraryItem = (item: any) => {
    setKeywords(item.keywords || item.prompt || '');
    setTaskType(item.taskType || item.type || 'writing');
    setTargetPlatform(item.targetPlatform || item.platform || 'ChatGPT');
    setGeneratedPrompt('');
    setActiveNav('new');
  };

  const handleDeleteLibraryItem = (id: string) => {
    // For now, just a placeholder as requested
    console.log('Delete item:', id);
  };

  return (
    <DashboardLayout
      activeNav={activeNav}
      setActiveNav={setActiveNav}
      recentPrompts={recentPrompts}
      onNewChat={handleNewChat}
    >
      {activeNav === 'new' ? (
        <div className="flex flex-col h-full relative">
          {/* Scrollable Output Area */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto pb-64 pt-8 px-4 scrollbar-hide">
              <div className="max-w-3xl mx-auto">
                <PromptResult
                  prompt={generatedPrompt}
                  isLoading={isLoading}
                  onSave={currentUser ? handleSavePrompt : undefined}
                  isSaving={isSaving}
                />
              </div>
            </div>
          </div>

          {/* Fixed Bottom Input Area */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent pt-12 pb-6 px-4 z-20">
            <div className="max-w-3xl mx-auto w-full">
              <PromptForm
                keywords={keywords}
                setKeywords={setKeywords}
                taskType={taskType}
                setTaskType={setTaskType}
                targetPlatform={targetPlatform}
                setTargetPlatform={setTargetPlatform}
                onSubmit={handleGenerate}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      ) : activeNav === 'history' ? (
        <HistoryView
          prompts={recentPrompts}
          onLoadToEditor={handleLoadLibraryItem}
          onDelete={handleDeleteLibraryItem}
        />
      ) : activeNav === 'templates' ? (
        <div className="h-full flex items-center justify-center text-slate-500">
          Templates feature coming soon
        </div>
      ) : (
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

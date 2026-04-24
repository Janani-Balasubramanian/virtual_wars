import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Vote, 
  UserPlus, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle,
  Globe,
  Users,
  ShieldCheck
} from 'lucide-react';
import VoterStatusSelector from './components/VoterStatusSelector';

// Lazy load heavy components for efficiency
const ElectionTimeline = React.lazy(() => import('./components/ElectionTimeline'));
const PollingStationFinder = React.lazy(() => import('./components/PollingStationFinder'));
const ExpertGuide = React.lazy(() => import('./components/ExpertGuide'));
const VoterCertificate = React.lazy(() => import('./components/VoterCertificate'));

import { logVoterStatus } from './lib/firebase';

import type { VoterStatus } from './types';

/**
 * Main Application Component for the Election Assistant.
 * Manages the global state of the user's voter status and handles transitions
 * between the landing page, interactive timeline, and polling station finder.
 */
function App() {
  const [status, setStatus] = useState<VoterStatus>(null);
  const [step, setStep] = useState(0);

  /**
   * Updates the user's voter status and logs the interaction to Firebase.
   * @param newStatus The selected voter status from the selector component.
   */
  const handleStatusChange = (newStatus: VoterStatus) => {
    setStatus(newStatus);
    if (newStatus) {
      logVoterStatus(newStatus);
    }
  };

  const resetProgress = () => {
    setStatus(null);
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      {/* Background Orbs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/20 blur-[120px] rounded-full"></div>
      </div>

      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            <Vote className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white">VoterGuide AI</h1>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest leading-none">Expert Election Assistant</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <button 
            onClick={() => alert("Redirecting to Google Account Sign-In...")}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-sm font-bold transition-all"
            aria-label="Sign in with Google"
          >
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="hidden md:inline">Sign In</span>
          </button>
          {status && (
            <button 
              onClick={resetProgress}
              className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 text-sm font-bold rounded-xl transition-all"
            >
              Start Over
            </button>
          )}
        </motion.div>
      </header>

      <main className="container mx-auto px-6 pb-24">
        {!status ? (
          <VoterStatusSelector onSelect={handleStatusChange} />
        ) : (
          <div className="max-w-5xl mx-auto space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-white">
                Welcome, {status === 'nri' ? 'Overseas Voter' : 'Future Voter'}!
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                We've tailored your election journey. Follow the interactive timeline below to ensure your voice is heard.
              </p>
            </motion.div>

            <React.Suspense fallback={
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-blue-400 font-bold animate-pulse">Loading personalized guide...</p>
              </div>
            }>
              <ElectionTimeline status={status} />
              
              <VoterCertificate status={status} />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12">
                <div className="lg:col-span-2">
                  <PollingStationFinder />
                </div>
                <div className="lg:col-span-1">
                  <ExpertGuide status={status} />
                </div>
              </div>
            </React.Suspense>
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 bg-slate-900/50 backdrop-blur-xl py-12 mt-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            <span>Secure & Non-Partisan Guidance</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact ECI</a>
          </div>
          <p>© 2026 VoterGuide AI. Not an official government entity.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

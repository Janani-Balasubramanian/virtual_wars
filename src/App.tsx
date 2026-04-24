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
import ElectionTimeline from './components/ElectionTimeline';
import PollingStationFinder from './components/PollingStationFinder';
import ExpertGuide from './components/ExpertGuide';

import type { VoterStatus } from './types';

function App() {
  const [status, setStatus] = useState<VoterStatus>(null);
  const [step, setStep] = useState(0);

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
          <div className="bg-election-blue p-2 rounded-lg shadow-lg shadow-blue-500/20">
            <Vote className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
              VoterGuide AI
            </h1>
            <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">Expert Election Assistant</p>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-blue-400 transition-colors">Resources</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Important Dates</a>
          <a href="#" className="hover:text-blue-400 transition-colors">FAQ</a>
          <button 
            onClick={resetProgress}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-white"
          >
            Start Over
          </button>
        </nav>
      </header>

      <main className="container mx-auto px-6 pb-24">
        {!status ? (
          <VoterStatusSelector onSelect={setStatus} />
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

            <ElectionTimeline status={status} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-12">
              <div className="lg:col-span-2">
                <PollingStationFinder />
              </div>
              <div className="lg:col-span-1">
                <ExpertGuide status={status} />
              </div>
            </div>
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

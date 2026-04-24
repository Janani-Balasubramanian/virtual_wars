import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, AlertCircle, Phone, BookOpen, ExternalLink } from 'lucide-react';
import type { VoterStatus } from '../types';

interface Props {
  status: VoterStatus;
}

const ExpertGuide: React.FC<Props> = ({ status }) => {
  const getTips = () => {
    switch (status) {
      case 'nri':
        return [
          { icon: AlertCircle, text: "Physical presence in India is mandatory to vote." },
          { icon: Sparkles, text: "Original Passport is your ONLY valid ID document." },
          { icon: BookOpen, text: "Use Form 6A specifically for overseas registration." }
        ];
      case 'senior':
        return [
          { icon: Phone, text: "Dial 1950 for home voting assistance." },
          { icon: Sparkles, text: "Priority queues are available at all booths." },
          { icon: AlertCircle, text: "Opt-in for Home Voting via Form 12D early." }
        ];
      default:
        return [
          { icon: Sparkles, text: "Check your name in the electoral roll 24h before." },
          { icon: AlertCircle, text: "Digital Voter IDs are now downloadable as e-EPIC." },
          { icon: MessageSquare, text: "Need help? The Voter Helpline App is available 24/7." }
        ];
    }
  };

  return (
    <div className="space-y-6 h-full">
      <div className="glass-morphism p-8 rounded-[40px] border border-blue-500/10 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-slate-950 rounded-full" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white leading-tight">Election Expert</h4>
            <p className="text-blue-400 text-xs font-bold uppercase tracking-wider">AI Assistant • Online</p>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <p className="text-slate-400 text-sm italic border-l-2 border-blue-500 pl-4 py-2">
            "Hello! I'm your guide for the 2026 General Elections. Based on your status, here are some critical tips you should know."
          </p>

          <div className="space-y-4">
            {getTips().map((tip, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all"
              >
                <tip.icon className="w-5 h-5 text-blue-400 shrink-0" />
                <p className="text-slate-300 text-sm leading-relaxed">{tip.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-3">
          <button 
            onClick={() => alert("Connecting to an Election Expert... Please wait.")}
            className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white text-sm font-bold transition-all flex items-center justify-center gap-2"
          >
            Chat with an Agent <MessageSquare className="w-4 h-4" />
          </button>
          <a 
            href="https://voters.eci.gov.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-4 text-blue-400 text-sm font-bold flex items-center justify-center gap-2 hover:text-blue-300 transition-colors"
          >
            Official ECI Resources <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExpertGuide;

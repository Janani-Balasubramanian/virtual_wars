import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Globe, 
  Users, 
  PersonStanding, 
  Building2 
} from 'lucide-react';
import type { VoterStatus } from '../types';

interface Props {
  onSelect: (status: VoterStatus) => void;
}

const statuses = [
  {
    id: 'first-time',
    title: 'First-Time Voter',
    description: 'Turning 18 soon or never registered? Start your journey here.',
    icon: UserPlus,
    color: 'bg-blue-500',
  },
  {
    id: 'general',
    title: 'General Voter',
    description: 'Already registered but want to check status or find your booth.',
    icon: Users,
    color: 'bg-emerald-500',
  },
  {
    id: 'nri',
    title: 'Overseas (NRI)',
    description: 'Living abroad? Learn how to register and vote in your home constituency.',
    icon: Globe,
    color: 'bg-indigo-500',
  },
  {
    id: 'senior',
    title: 'Senior Citizen',
    description: 'Special facilities and home voting options for age 80+.',
    icon: Building2,
    color: 'bg-orange-500',
  },
  {
    id: 'pwd',
    title: 'PwD Voter',
    description: 'Accessibility features and transport assistance for voting day.',
    icon: PersonStanding,
    color: 'bg-purple-500',
  },
];

const VoterStatusSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="py-20 space-y-16">
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold tracking-wide uppercase"
        >
          Your Vote, Your Voice
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight"
        >
          How will you <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">shape the future</span>?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-xl max-w-2xl mx-auto"
        >
          Select your status to receive a personalized guide to the 2026 General Elections.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {statuses.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index + 0.3 }}
            onClick={() => onSelect(item.id as VoterStatus)}
            aria-label={`Select ${item.title} status`}
            className="group relative text-left p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all overflow-hidden focus:ring-2 focus:ring-blue-500 focus:outline-none focus:bg-white/10"
          >
            <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`} aria-hidden="true">
              <item.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed">{item.description}</p>
            
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default VoterStatusSelector;

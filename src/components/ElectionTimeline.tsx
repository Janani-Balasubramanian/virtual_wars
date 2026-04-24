import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Calendar, 
  ClipboardCheck, 
  CreditCard,
  UserCheck,
  Building2,
  Mail,
  Fingerprint,
  PersonStanding,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import type { VoterStatus } from '../types';

interface TimelineStep {
  title: string;
  description: string;
  icon: any;
  details: string[];
}

interface Props {
  status: VoterStatus;
}

const timelineData: Record<string, TimelineStep[]> = {
  'first-time': [
    {
      title: 'Voter Registration',
      description: 'The foundation of your democratic right.',
      icon: FileText,
      details: [
        'Fill Form 6 on the Voter Service Portal (voters.eci.gov.in)',
        'Upload Age Proof (Aadhaar, Passport, or Birth Certificate)',
        'Upload Address Proof (Utility bills, Rent agreement, etc.)',
        'Receive Reference ID for tracking'
      ]
    },
    {
      title: 'Field Verification',
      description: 'Authenticating your residency.',
      icon: UserCheck,
      details: [
        'Booth Level Officer (BLO) visits your residence',
        'Physical verification of original documents',
        'Approval/Rejection of your application'
      ]
    },
    {
      title: 'Electoral Roll Inclusion',
      description: 'Becoming an official voter.',
      icon: ClipboardCheck,
      details: [
        'Name appears in the Draft Electoral Roll',
        'Verification of spelling and details',
        'Final inclusion in the Electoral Roll'
      ]
    },
    {
      title: 'EPIC Card Delivery',
      description: 'Your physical ID arrives.',
      icon: CreditCard,
      details: [
        'Voter ID (EPIC) printed and dispatched via Speed Post',
        'Download e-EPIC from the portal for immediate use',
        'Link with Aadhaar for future convenience'
      ]
    },
    {
      title: 'Polling Day',
      description: 'Exercise your franchise.',
      icon: Fingerprint,
      details: [
        'Carry EPIC or approved ID to the polling station',
        'Identity verification and ink application',
        'Press the button on the EVM/VVPAT'
      ]
    }
  ],
  'nri': [
    {
      title: 'Form 6A Submission',
      description: 'Registration for overseas electors.',
      icon: Mail,
      details: [
        'Register online using Form 6A',
        'Upload copy of Passport (Visa & Address pages)',
        'Self-attest documents as per guidelines'
      ]
    },
    {
      title: 'Residence Verification',
      description: 'Verifying your Indian roots.',
      icon: Building2,
      details: [
        'BLO verifies Indian address mentioned in Passport',
        'Family members may be contacted for verification',
        'Name included in the "Overseas" section of the roll'
      ]
    },
    {
      title: 'Travel Planning',
      description: 'Prepare for the poll day.',
      icon: Calendar,
      details: [
        'Check polling dates for your home constituency',
        'Book travel as physical presence is mandatory (as of 2026)',
        'Ensure you have your Original Passport'
      ]
    },
    {
      title: 'Casting Vote',
      description: 'Vote in person.',
      icon: Fingerprint,
      details: [
        'Visit your assigned polling station in India',
        'Identity verified using Original Passport only',
        'Cast vote via EVM'
      ]
    }
  ],
  // Simplified for other statuses to keep it concise
  'general': [
    { title: 'Check Status', description: 'Verify your name in the roll.', icon: Search, details: ['Search name on electoral search portal', 'Check for booth location updates'] },
    { title: 'Correction (Optional)', description: 'Update details if needed.', icon: FileText, details: ['Use Form 8 for corrections', 'Upload proof of change'] },
    { title: 'Vote', description: 'Head to the polls.', icon: Fingerprint, details: ['Bring ID', 'Cast vote'] }
  ],
  'senior': [
    { title: 'Home Voting Opt-in', description: 'Form 12D for 80+ voters.', icon: Building2, details: ['BLO visits house to collect Form 12D', 'Choose between booth or home voting'] },
    { title: 'Home Voting Day', description: 'Secure voting at home.', icon: ClipboardCheck, details: ['Polling team visits with secret ballot', 'Full security and confidentiality maintained'] }
  ],
  'pwd': [
    { title: 'Accessibility Request', description: 'Using Saksham App.', icon: PersonStanding, details: ['Request wheelchair or transport', 'Identify accessibility barriers at your booth'] },
    { title: 'Priority Access', description: 'Vote with dignity.', icon: Fingerprint, details: ['Skip the queue', 'Assistance from volunteers at the booth'] }
  ]
};

const ElectionTimeline: React.FC<Props> = ({ status }) => {
  const [activeStep, setActiveStep] = useState(0);
  const data = timelineData[status || 'general'] || [];

  return (
    <div className="space-y-12">
      <div className="relative">
        {/* Timeline Path */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 hidden md:block" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-8">
          {data.map((step, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`flex items-center gap-4 md:flex-col md:text-center group flex-1 w-full md:w-auto transition-all`}
            >
              <div className={`
                w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500
                ${index === activeStep ? 'bg-blue-600 scale-110 shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 
                  index < activeStep ? 'bg-emerald-600' : 'bg-slate-800 border border-white/10 group-hover:border-white/20'}
              `}>
                {index < activeStep ? <CheckCircle2 className="w-7 h-7 text-white" /> : <step.icon className="w-7 h-7 text-white" />}
              </div>
              <div className="md:mt-4 text-left md:text-center">
                <p className={`text-sm font-bold uppercase tracking-wider ${index === activeStep ? 'text-blue-400' : 'text-slate-500'}`}>
                  Step {index + 1}
                </p>
                <h4 className={`text-lg font-bold ${index === activeStep ? 'text-white' : 'text-slate-400'}`}>
                  {step.title}
                </h4>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="glass-morphism p-8 md:p-12 rounded-[40px] max-w-4xl mx-auto border border-blue-500/10"
        >
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-20 h-20 rounded-3xl bg-blue-600/20 flex items-center justify-center shrink-0">
              {React.createElement(data[activeStep]?.icon || HelpCircle, { className: "w-10 h-10 text-blue-400" })}
            </div>
            <div className="space-y-8 flex-1">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">{data[activeStep]?.title}</h3>
                <p className="text-xl text-slate-400">{data[activeStep]?.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data[activeStep]?.details.map((detail, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-4">
                <a 
                  href="https://voters.eci.gov.in/voter-education" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl text-white font-bold transition-all flex items-center gap-2"
                >
                  Learn More <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="https://eci.gov.in/it-applications/mobile-applications/voter-helpline-app-r18/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white font-bold transition-all"
                >
                  Resources
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ElectionTimeline;

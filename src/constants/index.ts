import { 
  FileText, 
  UserCheck, 
  ClipboardCheck, 
  CreditCard, 
  Fingerprint,
  Mail,
  Building2,
  Calendar,
  Search,
  PersonStanding
} from 'lucide-react';

export const VOTER_STATUSES = [
  {
    id: 'first-time',
    title: 'First-Time Voter',
    description: 'Turning 18 soon or never registered? Start your journey here.',
    icon: UserCheck,
    color: 'bg-blue-500',
  },
  {
    id: 'general',
    title: 'General Voter',
    description: 'Already registered but want to check status or find your booth.',
    icon: Search,
    color: 'bg-emerald-500',
  },
  {
    id: 'nri',
    title: 'Overseas (NRI)',
    description: 'Living abroad? Learn how to register and vote in your home constituency.',
    icon: Mail,
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

export const TIMELINE_DATA = {
  'first-time': [
    {
      title: 'Voter Registration',
      description: 'The foundation of your democratic right.',
      icon: FileText,
      details: [
        'Fill Form 6 on the Voter Service Portal',
        'Upload Age Proof (Aadhaar, Passport)',
        'Upload Address Proof',
        'Receive Reference ID'
      ]
    },
    {
      title: 'Field Verification',
      description: 'Authenticating your residency.',
      icon: UserCheck,
      details: [
        'BLO visits your residence',
        'Physical verification of documents',
        'Approval/Rejection of application'
      ]
    },
    {
      title: 'Electoral Roll Inclusion',
      description: 'Becoming an official voter.',
      icon: ClipboardCheck,
      details: [
        'Name appears in Draft Roll',
        'Final inclusion in the Roll'
      ]
    },
    {
      title: 'EPIC Card Delivery',
      description: 'Your physical ID arrives.',
      icon: CreditCard,
      details: [
        'ID dispatched via Speed Post',
        'Download e-EPIC from portal'
      ]
    },
    {
      title: 'Polling Day',
      description: 'Exercise your franchise.',
      icon: Fingerprint,
      details: [
        'Carry EPIC or approved ID',
        'Identity verification and ink',
        'Press the button on EVM'
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
        'Upload copy of Passport'
      ]
    },
    {
      title: 'Casting Vote',
      description: 'Vote in person.',
      icon: Fingerprint,
      details: [
        'Visit assigned polling station in India',
        'Verified using Original Passport'
      ]
    }
  ],
  // ... more data
};

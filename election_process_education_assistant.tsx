import React, { useState, useEffect, useRef } from 'react';
import {
  Vote,
  ShieldCheck,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  FileText,
  UserCheck,
  HelpCircle,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ArrowRight,
  ChevronRight,
  Search,
  ExternalLink,
  Download,
  RefreshCw,
  Info,
  CheckCircle,
  AlertCircle,
  Accessibility,
  Globe,
  Compass,
  Building,
  Send,
  Eye,
  Award,
  Lock,
  Bell
} from 'lucide-react';

// Exact luxury palette derived from the user's swatch (#FFEB97 & #583714)
const LUXURY_PALETTE = {
  goldLight: '#FFEB97',        // Champagne gold highlight
  goldShine: '#FFF0B3',        // Radiant metallic light
  goldMid: '#D4A85F',          // Warm amber gold
  goldDeep: '#9E7634',         // Deep burnished gold
  brownEspresso: '#583714',    // Deep luxury chocolate brown
  brownRoast: '#42280D',       // Dark roasted espresso
  brownDeepBg: '#120C06',      // Deepest background canvas
  brownCardBg: '#1D1309',      // Base card surface
  brownElevated: '#2A1B0E',    // Elevated card surface
  textLight: '#FFF7E2',        // Ultra-soft champagne text
  textGold: '#FFEB97',         // Pure champagne gold typography
  textSubtle: '#D8BE9E',       // Warm muted tan
  textMuted: '#9B7E62',        // Secondary brown caption text
  borderGoldSubtle: 'rgba(255, 235, 151, 0.18)',
  borderGoldMedium: 'rgba(255, 235, 151, 0.38)',
  borderGoldActive: 'rgba(255, 235, 151, 0.85)',
  goldGradient: 'linear-gradient(135deg, #FFEB97 0%, #D4A85F 50%, #583714 100%)',
  goldFoil: 'linear-gradient(90deg, #FFEB97 0%, #F5D577 25%, #E3B353 50%, #FFEB97 75%, #C2933C 100%)',
  verticalGoldBrown: 'linear-gradient(180deg, #FFEB97 0%, #583714 100%)',
  cardShineGradient: 'linear-gradient(180deg, rgba(42, 27, 14, 0.82) 0%, rgba(23, 14, 7, 0.94) 100%)',
  glowGold: '0 0 24px -2px rgba(255, 235, 151, 0.35)',
};


const VOTER_PERSONAS = {
  first_time: {
    id: 'first_time',
    name: 'First-Time Voter',
    badge: 'Age 18+ Citizen',
    icon: Sparkles,
    tagline: 'Turning 18 or voting for the first time? Seamlessly secure your digital EPIC card.',
    primaryForm: 'Form 6',
    description: 'Application for First-time inclusion of name in the Electoral Roll.',
    documentsRequired: [
      'Age Proof (Birth Certificate / Class 10 / Aadhaar)',
      'Address Proof (Passport / Utility Bill / Registered Rent Deed)',
      'Recent Passport Photograph with white background'
    ],
    keyAction: 'Register via Voters Service Portal before the Qualifying Date.',
    prompts: [
      "I just turned 18. How do I apply for Form 6 on the Voter Portal?",
      "Can I vote if my name is on the electoral roll but my physical EPIC card hasn't arrived?",
      "Explain the 7-second VVPAT slip window in simple terms.",
      "What alternate photo IDs are accepted at the polling station if I forget my Voter ID?"
    ]
  },
  nri: {
    id: 'nri',
    name: 'Overseas / NRI Voter',
    badge: 'Indian Citizen Abroad',
    icon: Globe,
    tagline: 'Living overseas? Exercise your sovereign democratic franchise in your home constituency.',
    primaryForm: 'Form 6A',
    description: 'Application for registration of Overseas Elector in the electoral roll.',
    documentsRequired: [
      'Self-attested copy of Indian Passport with valid Visa endorsement',
      'Proof of residence in India as per Passport address',
      'Employment/Student Visa status verification'
    ],
    keyAction: 'Must vote in person at the assigned polling station with original Passport.',
    prompts: [
      "Can an NRI vote online or by postal ballot, or is physical presence mandatory?",
      "How do I submit Form 6A and which constituency am I assigned to?",
      "What passport details are required for overseas voter registration?",
      "Is postal voting permitted for ordinary non-resident citizens?"
    ]
  },
  senior_pwd: {
    id: 'senior_pwd',
    name: 'Senior Citizen (85+) & PwD',
    badge: 'Accessible Franchise',
    icon: Accessibility,
    tagline: 'Dignified accessible booths, doorstep postal voting & companion support.',
    primaryForm: 'Form 12D',
    description: 'Notice of intention to vote by Postal Ballot at home or request accessibility assistance.',
    documentsRequired: [
      'Form 12D within 5 days of election notification',
      'Benchmark Disability Certificate (40%+ for PwD)',
      'Age proof for 85+ electors'
    ],
    keyAction: 'Option for secure Home Voting with 2 polling officials & videography.',
    prompts: [
      "How does the home voting protocol (Form 12D) work for voters aged 85+?",
      "What accessibility facilities are guaranteed at polling booths (ramps, wheelchairs, Braille EVMs)?",
      "Can a visually impaired voter bring an adult companion to the voting compartment?",
      "How does the Saksham ECI app help differently-abled voters book pick-up transit?"
    ]
  },
  relocated: {
    id: 'relocated',
    name: 'Relocated / Address Shift',
    badge: 'Constituency Transfer',
    icon: Compass,
    tagline: 'Moved to a new apartment or relocated across state borders? Update your polling station.',
    primaryForm: 'Form 8',
    description: 'Application for Shifting of Residence / Correction of Entries in Existing Roll.',
    documentsRequired: [
      'Current EPIC Number (Voter ID)',
      'New proof of ordinary residence at current address',
      'Active mobile number linked to Aadhaar'
    ],
    keyAction: 'Submit Form 8 online to shift your name without losing your voter seniority.',
    prompts: [
      "I moved to a new city. Do I apply for a new Voter ID or use Form 8 to shift?",
      "What happens if my name appears in two different constituencies simultaneously?",
      "How can I update my mobile number and link Aadhaar to my EPIC online?",
      "How long does it take for a Form 8 constituency transfer to be approved?"
    ]
  }
};


const ELECTION_TIMELINE = [
  {
    phase: 'Phase 1',
    title: 'Draft Electoral Roll Publication',
    dateStr: 'October 15, 2026',
    targetDate: new Date('2026-10-15T09:00:00'),
    status: 'completed',
    desc: 'Public notice of draft roll published online and at all designated Electoral Registration Offices.'
  },
  {
    phase: 'Phase 2',
    title: 'Claims & Objections Window',
    dateStr: 'November 12, 2026',
    targetDate: new Date('2026-11-12T18:00:00'),
    status: 'in-progress',
    desc: 'Filing of Form 6 (new voters), Form 7 (objections/deletion), and Form 8 (shifting/correction).'
  },
  {
    phase: 'Phase 3',
    title: 'Final Electoral Roll Freezing',
    dateStr: 'December 20, 2026',
    targetDate: new Date('2026-12-20T17:00:00'),
    status: 'upcoming',
    desc: 'Final sanitized electoral roll finalized. No new additions permitted after official notification of polls.'
  },
  {
    phase: 'Phase 4',
    title: 'Voter Information Slip Distribution',
    dateStr: 'January 10, 2027',
    targetDate: new Date('2027-01-10T09:00:00'),
    status: 'upcoming',
    desc: 'Booth Level Officers (BLOs) distribute official QR-enabled voter information slips to each household.'
  },
  {
    phase: 'Phase 5',
    title: 'National Polling Day (Vote Cast)',
    dateStr: 'February 14, 2027',
    targetDate: new Date('2027-02-14T07:00:00'),
    status: 'upcoming',
    desc: 'Mock polling by agents at 6:00 AM, voting open from 7:00 AM to 6:00 PM across all polling stations.'
  }
];

const EVM_CANDIDATES = [
  { id: 1, name: 'Aditi Sharma', party: 'Progressive Civic Front', symbol: '🌱', code: 'PCF' },
  { id: 2, name: 'Vikramaditya Roy', party: 'Democratic Alliance for Growth', symbol: '⚙️', code: 'DAG' },
  { id: 3, name: 'Farah Siddiqui', party: 'United Social Justice Forum', symbol: '⚖️', code: 'USJ' },
  { id: 4, name: 'Harpreet Singh', party: 'Ecology & Clean Air Party', symbol: '☀️', code: 'ECP' },
  { id: 5, name: 'NOTA', party: 'None of the Above', symbol: '❌', code: 'NOTA' },
];

const BOOTH_CHECKPOINTS = [
  {
    step: 1,
    title: 'First Polling Officer (Identification)',
    role: 'Electoral Roll & Identity In-Charge',
    details: 'Verifies your EPIC or acceptable alternate photo ID against the registered electoral roll. Reads your serial number aloud to poll agents.',
    dos: 'Produce your original government photo ID card clearly.',
    icon: UserCheck
  },
  {
    step: 2,
    title: 'Second Polling Officer (Inking & Register)',
    role: 'Indelible Ink & Register 17A In-Charge',
    details: 'Applies indelible purple ink on the cuticle of your left index finger. Records your signature or thumb impression in Register 17A and issues a signed voter slip.',
    dos: 'Ensure ink dries cleanly; hold onto your signed voter slip.',
    icon: ShieldCheck
  },
  {
    step: 3,
    title: 'Third Polling Officer (Control Unit)',
    role: 'Balloting Authorization Officer',
    details: 'Collects your signed paper voter slip, verifies your marked finger, and presses the "BALLOT" button on the EVM Control Unit to activate the voting compartment.',
    dos: 'Proceed calmly into the private screened voting booth.',
    icon: FileText
  },
  {
    step: 4,
    title: 'The Voting Compartment (EVM & VVPAT)',
    role: 'Your Sovereign Vote Cast',
    details: 'Press the blue button against your chosen candidate. A red LED illuminates, a sharp beep sounds, and the VVPAT glass displays your printed candidate slip for exactly 7 seconds before dropping into the sealed box.',
    dos: 'Observe the VVPAT paper slip through the illuminated window.',
    icon: Vote
  }
];


export default function App() {
  const [selectedPersonaId, setSelectedPersonaId] = useState('first_time');
  const persona = VOTER_PERSONAS[selectedPersonaId];

  const [activeTab, setActiveTab] = useState('assistant'); // 'assistant', 'simulator', 'verifier', 'timeline', 'locator'
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [toast, setToast] = useState(null);
  const showToast = (message, title = 'Notice') => {
    setToast({ message, title });
    setTimeout(() => setToast(null), 3800);
  };

  const [checkedDocs, setCheckedDocs] = useState({
    doc_age: true,
    doc_address: true,
    doc_photo: false,
    doc_aadhaar: true,
    doc_mobile: true,
  });

  const [activeBoothStep, setActiveBoothStep] = useState(1);

  // EVM Simulation State
  const [evmStatus, setEvmStatus] = useState('ready'); // 'ready', 'vvpat_showing', 'completed'
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [vvpatCountdown, setVvpatCountdown] = useState(7);

  // Polling Station Locator state
  const [searchPin, setSearchPin] = useState('600001');
  const [locatorResult, setLocatorResult] = useState({
    boothName: 'St. George Civic High School, Hall 3',
    address: 'Near Central Heritage Arch, Sector 4, Chennai, TN',
    constituency: '018 - Harbour Central',
    bloName: 'K. Senthil Kumar (BLO)',
    bloPhone: '+91 98401 22345',
    distance: '0.45 km away (8 min walk)',
    wheelchairRamp: true,
    queueTime: 'Normal (~6-10 min)'
  });

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 144, hours: 13, minutes: 22, seconds: 40 });

  const docScore = React.useMemo(() => {
    const total = 5;
    let earned = 0;
    if (checkedDocs.doc_age) earned++;
    if (checkedDocs.doc_address) earned++;
    if (checkedDocs.doc_photo) earned++;
    if (checkedDocs.doc_aadhaar) earned++;
    if (checkedDocs.doc_mobile) earned++;
    return Math.round((earned / total) * 100);
  }, [checkedDocs]);

  // Web Audio API: EVM 987.77 Hz high tone beep
  const triggerEvmBeep = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, ctx.currentTime);
      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.15);
    } catch (err) {
      console.log('Audio contextual note:', err);
    }
  };

  const speakText = (text) => {
    if (!soundEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 280));
    utterance.rate = 1.0;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const handleVoteCandidate = (cand) => {
    if (evmStatus !== 'ready') return;
    setSelectedCandidate(cand);
    setEvmStatus('vvpat_showing');
    setVvpatCountdown(7);
    triggerEvmBeep();

    if (soundEnabled) {
      speakText(`Vote registered for ${cand.name}. Observe the illuminated VVPAT slip display for 7 seconds.`);
    }
  };

  useEffect(() => {
    let timer;
    if (evmStatus === 'vvpat_showing') {
      if (vvpatCountdown > 0) {
        timer = setTimeout(() => {
          setVvpatCountdown(prev => prev - 1);
        }, 1000);
      } else {
        setEvmStatus('completed');
        showToast('The verified VVPAT slip dropped into the sealed box. Ballot cast successfully!', 'Vote Sealed');
      }
    }
    return () => clearTimeout(timer);
  }, [evmStatus, vvpatCountdown]);

  useEffect(() => {
    const target = ELECTION_TIMELINE[4].targetDate.getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent('CivicWise: National General Polling Day 2027');
    const details = encodeURIComponent('Cast your sovereign vote! Remember to bring your EPIC card or an accepted alternate government photo ID. Polling booths open 7:00 AM - 6:00 PM.');
    const location = encodeURIComponent(locatorResult.boothName + ', ' + locatorResult.address);
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20270214T013000Z/20270214T123000Z&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
    showToast('Redirecting to Google Calendar to schedule your voting day reminder.', 'Calendar Sync');
  };

  const handleDownloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CivicWise Election Assistant//Prompt Wars 2026//EN',
      'BEGIN:VEVENT',
      'UID:civicwise-poll-2027@antigravity',
      'DTSTAMP:20260923T120000Z',
      'DTSTART:20270214T013000Z',
      'DTEND:20270214T123000Z',
      'SUMMARY:National General Polling Day 2027 - Cast Your Vote',
      'DESCRIPTION:National General Polling Day. Remember to carry your EPIC card or accepted alternate ID. Verified via CivicWise.',
      'LOCATION:' + locatorResult.boothName,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'election-polling-day-reminder.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded .ics calendar file for offline scheduling.', 'Calendar Exported');
  };


  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `Greetings! I am your **CivicWise Election Education Assistant** built for *Prompt Wars Virtual 2026 | Built with Google Antigravity*. \n\nI am configured for **${persona.name}** mode. How can I assist you with voter registration, polling station rules, EVM & VVPAT procedures, or document eligibility today?`,
      timestamp: 'Just now'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handlePersonaSelect = (id) => {
    setSelectedPersonaId(id);
    const newPersona = VOTER_PERSONAS[id];
    setMessages(prev => [
      ...prev,
      {
        id: `switch-${Date.now()}`,
        sender: 'assistant',
        text: `Switched perspective to **${newPersona.name}** (${newPersona.badge}).\n\n*Primary registration pathway:* **${newPersona.primaryForm}** (${newPersona.description}).\n\nTap any recommended prompt pill or ask any specific procedural question!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    showToast(`Contextualized for ${newPersona.name}`, 'Profile Updated');
  };

  const callGeminiAssistant = async (questionText) => {
    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: questionText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsGenerating(true);

    const systemPrompt = `You are CivicWise, an elite, non-partisan, highly authoritative Election Education Specialist.
Current voter persona: "${persona.name}" (${persona.badge}).
Primary application form for this persona: "${persona.primaryForm}".
Your answers must be:
1. Formatted cleanly with bold luxury headings, concise bullet points, and actionable guidance.
2. Factually accurate regarding Form 6 (new voter), Form 6A (overseas/NRI), Form 7 (objection/deletion), Form 8 (shifting/correction), and Form 12D (home voting for 85+ and PwD).
3. Clear about the 4-step polling booth walkthrough (Officer 1: ID check, Officer 2: Indelible ink cuticle mark & Register 17A signature, Officer 3: Voter slip check, Voting booth: Blue button, 7-second transparent VVPAT slip window, audio beep).
4. State acceptable alternative IDs if EPIC is missing (Passport, Driving License, PAN, Aadhaar, MNREGA card, Bank passbook with photo, Pension card).
5. Tone: Dignified, warm, civic-minded, and non-partisan.`;

    try {
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const payload = {
        contents: [
          {
            role: "user",
            parts: [{ text: `System Context: ${systemPrompt}\n\nVoter Query: ${questionText}` }]
          }
        ],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!answer) {
        throw new Error("No text content returned");
      }

      const botMsg = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);

      if (soundEnabled) {
        speakText(answer);
      }
    } catch (err) {
      console.warn("Using contextual offline intelligent knowledge engine:", err);
      const fallbackReply = generateContextualFallback(questionText, persona);
      const botMsg = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);

      if (soundEnabled) {
        speakText(fallbackReply);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const generateContextualFallback = (query, currentPersona) => {
    const q = query.toLowerCase();

    if (q.includes('vvpat') || q.includes('7 second') || q.includes('slip') || q.includes('machine')) {
      return `### 🗳️ The 7-Second VVPAT Verification Protocol\n\nWhen you press your chosen candidate's blue button on the **Electronic Voting Machine (EVM)**:\n\n1. **Red LED Glows:** The candidate indicator lights up immediately.\n2. **Transparent Window Lights Up:** Inside the attached **Voter Verifiable Paper Audit Trail (VVPAT)** unit, a bright LED illuminates.\n3. **Printed Paper Slip Visible:** You will see a physical slip showing:\n   - **Candidate Serial Number**\n   - **Candidate Name**\n   - **Party Symbol**\n4. **7-Second Hold:** The slip stays visible behind the viewing glass for **exactly 7 seconds** so you can visually confirm your vote was cast as intended.\n5. **Automated Cut & Drop:** The slip is automatically cut and falls into a tamper-evident sealed dropbox below.\n6. **Audio Beep:** A continuous loud audio tone sounds from the Control Unit, confirming the vote has been permanently tallied.`;
    }

    if (q.includes('form 6') || q.includes('18') || q.includes('first time') || q.includes('new voter')) {
      return `### 📝 First-Time Voter Registration via Form 6\n\nCitizens turning 18 on or before the four qualifying dates (Jan 1, Apr 1, Jul 1, Oct 1) are eligible.\n\n**Step-by-Step Registration:**\n1. Visit the official **Voters Service Portal (voters.eci.gov.in)** or download the **ECI Voter Helpline App**.\n2. Sign up with your active mobile number and select **Form 6 (Register as a New Elector)**.\n3. **Mandatory Uploads:**\n   - **Proof of Age:** Birth certificate, Class 10 certificate, Passport, or Aadhaar.\n   - **Proof of Residence:** Water/electricity bill, bank passbook, Indian passport, or registered rental deed.\n   - Recent color passport photograph.\n4. Submit and record your **Reference ID** to track application status online.\n5. A Booth Level Officer (BLO) will conduct doorstep field verification before your digital EPIC is generated.`;
    }

    if (q.includes('nri') || q.includes('overseas') || q.includes('form 6a')) {
      return `### 🌍 Overseas / NRI Voter Guidelines (Form 6A)\n\nIndian citizens living abroad who have not acquired foreign citizenship are eligible under Section 20A of the Representation of the People Act.\n\n- **Application Form:** **Form 6A** submitted online via Voters Service Portal.\n- **Required Documentation:** Scanned copy of valid Indian Passport showing personal particulars, valid overseas residence visa, and address in India as stated in passport.\n- **Constituency Allocation:** You are registered in the specific constituency corresponding to the **residential address stated in your Indian passport**.\n- **Voting Day Rule:** Currently, overseas electors **must vote in person** at the designated polling station in India by presenting their **original Indian Passport**. Postal ballots or online internet voting are not yet permitted for general NRI voters.`;
    }

    if (q.includes('85') || q.includes('senior') || q.includes('pwd') || q.includes('form 12d') || q.includes('home')) {
      return `### ♿ Accessible Voting & Form 12D (Home Voting)\n\nFor citizens aged **85 years and above** and **Persons with Disabilities (40%+ benchmark)**:\n\n1. **Home Voting with Form 12D:** Within 5 days of election notification in your constituency, the Booth Level Officer delivers Form 12D to your home.\n2. **Voting at Doorstep:** If opted, an authorized team comprising **two polling officials, a micro-observer, a videographer, and security personnel** visits your residence at a pre-scheduled time with a portable voting booth.\n3. **Full Secrecy Guaranteed:** You cast your ballot in complete privacy inside a collapsible compartment, which is deposited into a sealed postal ballot box.\n4. **Polling Booth Facilities:** If visiting the booth, you are guaranteed:\n   - Ground floor priority with zero-gradient ramps.\n   - Free wheelchair availability and priority queue tokens.\n   - Braille-embossed EVM balloting units.\n   - Option to bring an adult companion (Form 14A) if visually or physically incapacitated.`;
    }

    if (q.includes('relocated') || q.includes('shift') || q.includes('form 8') || q.includes('address')) {
      return `### 🔄 Shifting Residence / Address Update (Form 8)\n\nIf you have moved houses—whether within the same constituency or to an entirely new assembly constituency:\n\n1. **Do NOT fill Form 6 again:** Having your name enrolled in two places is a legal violation under Section 17 of the RP Act.\n2. **Use Form 8:** Select **"Shifting of Residence"** on the Voters Service Portal.\n3. **Choose Shifting Type:**\n   - *Within Assembly Constituency* OR\n   - *Outside Assembly Constituency* (into a new assembly).\n4. **Uploads:** Provide your current EPIC number and uploaded proof of new ordinary residence.\n5. Once approved, your name is automatically shifted from the old roll to your new polling station, and a newly updated EPIC with QR code is delivered to your new address.`;
    }

    return `### 📌 Guidance for ${currentPersona.name}\n\nUnder our democratic framework, your primary procedural pathway is **${currentPersona.primaryForm}**.\n\n- **Target Action:** ${currentPersona.keyAction}\n- **Core Prerequisite:** Always verify that your name appears on the published Electoral Roll (*electoralsearch.eci.gov.in*).\n- **Accepted Alternative IDs on Polling Day:** If you do not have your physical EPIC card, you can still vote using an accepted government photo ID (Aadhaar, Passport, Driving License, PAN Card, MNREGA Job Card, Bank Passbook with photograph).\n\nFeel free to ask a specific question about polling station security, counting procedures, or voter eligibility!`;
  };

  const handleSendChat = (e) => {
    e?.preventDefault();
    if (!userInput.trim() || isGenerating) return;
    const text = userInput.trim();
    setUserInput('');
    callGeminiAssistant(text);
  };


  return (
    <div
      className="min-h-screen text-[#FFF7E2] font-sans selection:bg-[#FFEB97] selection:text-[#583714] relative overflow-x-hidden"
      style={{ backgroundColor: LUXURY_PALETTE.brownDeepBg }}
    >
      {/* Ambient Luxury Gold & Espresso Glow Orbs in Background */}
      <div
        className="fixed top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none -z-10 opacity-20 animate-pulse"
        style={{ background: 'radial-gradient(circle, #FFEB97 0%, #583714 70%, transparent 100%)' }}
      />
      <div
        className="fixed bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none -z-10 opacity-15"
        style={{ background: 'radial-gradient(circle, #D4A85F 0%, #583714 80%, transparent 100%)' }}
      />

      {/* Top Banner: Antigravity & Prompt Wars 2026 */}
      <div
        className="border-b py-2 px-4 sm:px-6 text-xs font-mono flex flex-wrap items-center justify-between gap-3 shadow-md"
        style={{
          background: 'linear-gradient(90deg, #24160A 0%, #36210E 50%, #24160A 100%)',
          borderColor: LUXURY_PALETTE.borderGoldSubtle,
          color: LUXURY_PALETTE.textSubtle
        }}
      >
        <div className="flex items-center gap-2.5">
          <span
            className="px-2.5 py-0.5 rounded font-bold uppercase tracking-wider text-[11px] shadow-sm flex items-center gap-1.5"
            style={{
              background: LUXURY_PALETTE.goldFoil,
              color: '#38220A',
              boxShadow: '0 2px 8px rgba(255, 235, 151, 0.3)'
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Prompt Wars Virtual 2026
          </span>
          <span className="hidden md:inline-block text-[#9B7E62]">|</span>
          <span className="flex items-center gap-1.5 font-medium text-[#FFF7E2]">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: LUXURY_PALETTE.goldLight }} />
            Built with Google Antigravity & Gemini Reasoning Engine
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-[#D8BE9E]">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#FFEB97]" />
            Roll Revision Window: <strong className="text-[#FFEB97] ml-1">Open</strong>
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <PhoneHelpIcon />
            Voter Helpline: <strong className="text-[#FFEB97] ml-1">1950</strong>
          </span>
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              showToast(soundEnabled ? 'Speech audio muted' : 'Voice synthesis active', 'Sound Setting');
            }}
            className="p-1 px-2 rounded-md hover:bg-[#583714]/40 transition-colors flex items-center gap-1 text-xs border border-[#FFEB97]/20"
            title="Toggle Accessibility Audio & Beeps"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#FFEB97]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#9B7E62]" />
            )}
            <span className="hidden sm:inline text-[#FFEB97]">{soundEnabled ? 'Audio Active' : 'Muted'}</span>
          </button>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-xl shadow-2xl"
        style={{
          background: 'rgba(29, 19, 9, 0.94)',
          borderColor: LUXURY_PALETTE.borderGoldMedium
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3.5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #FFEB97 0%, #D4A85F 40%, #583714 100%)',
                  boxShadow: '0 0 20px rgba(255, 235, 151, 0.35)',
                  border: '1px solid #FFEB97'
                }}
              >
                <Vote className="w-7 h-7 text-[#2B1907]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1">
                    <span className="bg-gradient-to-r from-[#FFF7E2] via-[#FFEB97] to-[#D4A85F] bg-clip-text text-transparent">
                      Civic
                    </span>
                    <span className="bg-gradient-to-r from-[#FFEB97] to-[#C2933C] bg-clip-text text-transparent font-extrabold">
                      Wise
                    </span>
                  </h1>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold border"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255, 235, 151, 0.15) 0%, rgba(88, 55, 20, 0.25) 100%)',
                      borderColor: LUXURY_PALETTE.goldLight,
                      color: LUXURY_PALETTE.goldLight
                    }}
                  >
                    Antigravity AI
                  </span>
                </div>
                <p className="text-xs text-[#D8BE9E] font-medium hidden sm:block">
                  Election Process Education & Voting Protocol Intelligence
                </p>
              </div>
            </div>

            {/* Persona Quick Indicator in Header */}
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-xs text-[#9B7E62] font-medium">Active Profile:</span>
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-sm"
                style={{
                  background: 'rgba(42, 27, 14, 0.8)',
                  borderColor: LUXURY_PALETTE.borderGoldMedium,
                  color: LUXURY_PALETTE.goldLight
                }}
              >
                <persona.icon className="w-4 h-4 text-[#FFEB97]" />
                <span>{persona.name}</span>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded font-bold"
                  style={{ background: LUXURY_PALETTE.goldFoil, color: '#38220A' }}
                >
                  {persona.primaryForm}
                </span>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="flex items-center gap-1 sm:gap-2">
              <TabNavButton
                active={activeTab === 'assistant'}
                onClick={() => setActiveTab('assistant')}
                icon={Sparkles}
                label="AI Assistant"
              />
              <TabNavButton
                active={activeTab === 'simulator'}
                onClick={() => setActiveTab('simulator')}
                icon={Vote}
                label="EVM & Booth"
              />
              <TabNavButton
                active={activeTab === 'verifier'}
                onClick={() => setActiveTab('verifier')}
                icon={FileText}
                label="Doc Verifier"
              />
              <TabNavButton
                active={activeTab === 'timeline'}
                onClick={() => setActiveTab('timeline')}
                icon={Calendar}
                label="Timeline"
              />
              <TabNavButton
                active={activeTab === 'locator'}
                onClick={() => setActiveTab('locator')}
                icon={MapPin}
                label="Booth Radar"
              />
            </nav>
          </div>
        </div>
      </header>

      {}

      <section
        className="py-6 px-4 sm:px-6 lg:px-8 border-b relative"
        style={{
          background: 'linear-gradient(180deg, #1A1108 0%, #150E06 100%)',
          borderColor: LUXURY_PALETTE.borderGoldSubtle
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FFEB97] font-semibold mb-1">
                <UserCheck className="w-4 h-4 text-[#FFEB97]" />
                <span>Step 1: Select Your Voter Perspective</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#FFF7E2]">
                Contextual Education Engine
              </h2>
              <p className="text-xs sm:text-sm text-[#D8BE9E]">
                CivicWise re-tailors legal forms, polling booth protocols, checklists, and reasoning models to your situation.
              </p>
            </div>

            {/* Live Polling Day Countdown Pill in Gold Gradient */}
            <div
              className="px-4 py-2.5 rounded-2xl border flex items-center gap-4 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(88, 55, 20, 0.8) 0%, rgba(42, 27, 14, 0.95) 100%)',
                borderColor: LUXURY_PALETTE.borderGoldMedium,
                boxShadow: '0 4px 20px rgba(88, 55, 20, 0.4)'
              }}
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#FFEB97]">
                <Clock className="w-4 h-4 animate-pulse text-[#FFEB97]" />
                <span>Countdown to Polls:</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-sm font-black">
                <span className="bg-[#120C06] px-2 py-0.5 rounded text-[#FFF7E2] border border-[#FFEB97]/20">{timeLeft.days}d</span>:
                <span className="bg-[#120C06] px-2 py-0.5 rounded text-[#FFF7E2] border border-[#FFEB97]/20">{timeLeft.hours}h</span>:
                <span className="bg-[#120C06] px-2 py-0.5 rounded text-[#FFF7E2] border border-[#FFEB97]/20">{timeLeft.minutes}m</span>:
                <span className="bg-[#120C06] px-2 py-0.5 rounded text-[#FFEB97] border border-[#FFEB97]/40">{timeLeft.seconds}s</span>
              </div>
            </div>
          </div>

          {/* Persona Selection Tabs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {Object.values(VOTER_PERSONAS).map(item => {
              const isSelected = selectedPersonaId === item.id;
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePersonaSelect(item.id)}
                  className="p-4 rounded-2xl text-left border transition-all relative overflow-hidden group cursor-pointer"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(88, 55, 20, 0.65) 0%, rgba(42, 27, 14, 0.9) 100%)'
                      : 'linear-gradient(180deg, rgba(31, 19, 9, 0.75) 0%, rgba(20, 12, 6, 0.85) 100%)',
                    borderColor: isSelected ? LUXURY_PALETTE.goldLight : LUXURY_PALETTE.borderGoldSubtle,
                    boxShadow: isSelected ? '0 0 25px -3px rgba(255, 235, 151, 0.28)' : 'none'
                  }}
                >
                  {isSelected && (
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ background: LUXURY_PALETTE.goldFoil }}
                    />
                  )}
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow"
                      style={{
                        background: isSelected ? LUXURY_PALETTE.goldFoil : 'rgba(88, 55, 20, 0.5)',
                        color: isSelected ? '#38220A' : LUXURY_PALETTE.goldLight,
                        border: '1px solid rgba(255, 235, 151, 0.3)'
                      }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                      style={{
                        background: isSelected ? LUXURY_PALETTE.goldFoil : 'rgba(255, 235, 151, 0.12)',
                        color: isSelected ? '#38220A' : LUXURY_PALETTE.goldLight
                      }}
                    >
                      {item.primaryForm}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#FFF7E2] mb-0.5">{item.name}</h3>
                  <p className="text-xs text-[#D8BE9E] line-clamp-2 leading-relaxed mb-2">
                    {item.tagline}
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#FFEB97]">
                    <span>Explore profile rules</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* VIEW 1: GEMINI SMART ASSISTANT */}
        {activeTab === 'assistant' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Context Card & Quick Prompt Suggestions */}
            <div className="lg:col-span-4 space-y-6">
              {/* Persona Summary Card */}
              <div
                className="p-6 rounded-3xl border shadow-xl relative overflow-hidden"
                style={{
                  background: LUXURY_PALETTE.cardShineGradient,
                  borderColor: LUXURY_PALETTE.borderGoldMedium
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                    style={{
                      background: 'rgba(255, 235, 151, 0.15)',
                      color: LUXURY_PALETTE.goldLight,
                      border: '1px solid rgba(255, 235, 151, 0.25)'
                    }}
                  >
                    Active Profile Card
                  </span>
                  <persona.icon className="w-5 h-5 text-[#FFEB97]" />
                </div>

                <h3 className="text-xl font-bold text-[#FFF7E2] mb-1">{persona.name}</h3>
                <p className="text-xs text-[#D8BE9E] mb-4">{persona.badge}</p>

                <div
                  className="p-3.5 rounded-2xl mb-4 border text-xs leading-relaxed"
                  style={{
                    background: 'rgba(88, 55, 20, 0.35)',
                    borderColor: LUXURY_PALETTE.borderGoldSubtle,
                    color: LUXURY_PALETTE.textLight
                  }}
                >
                  <strong className="text-[#FFEB97] block mb-1">Key Action Mandate:</strong>
                  {persona.keyAction}
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#D8BE9E] font-semibold mb-2">
                    Primary Form Requisite:
                  </h4>
                  <div
                    className="p-3 rounded-xl border flex items-center justify-between"
                    style={{
                      background: 'rgba(42, 27, 14, 0.65)',
                      borderColor: LUXURY_PALETTE.borderGoldSubtle
                    }}
                  >
                    <div>
                      <span className="font-bold text-sm text-[#FFEB97] block">{persona.primaryForm}</span>
                      <span className="text-[11px] text-[#D8BE9E]">{persona.description}</span>
                    </div>
                    <FileText className="w-5 h-5 text-[#D4A85F]" />
                  </div>
                </div>
              </div>

              {/* Recommended Quick Prompts */}
              <div
                className="p-6 rounded-3xl border shadow-xl"
                style={{
                  background: LUXURY_PALETTE.cardShineGradient,
                  borderColor: LUXURY_PALETTE.borderGoldMedium
                }}
              >
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FFEB97] font-bold mb-3">
                  <Sparkles className="w-4 h-4 text-[#FFEB97]" />
                  <span>Recommended Questions</span>
                </div>
                <p className="text-xs text-[#D8BE9E] mb-4">
                  Tap any preset to prompt the Gemini assistant with scenario-based queries for {persona.name}:
                </p>

                <div className="space-y-2">
                  {persona.prompts.map((promptText, idx) => (
                    <button
                      key={idx}
                      onClick={() => callGeminiAssistant(promptText)}
                      disabled={isGenerating}
                      className="w-full text-left p-3 rounded-xl text-xs text-[#FFF7E2] border transition-all hover:translate-x-1 flex items-start gap-2 group cursor-pointer disabled:opacity-50"
                      style={{
                        background: 'rgba(42, 27, 14, 0.65)',
                        borderColor: LUXURY_PALETTE.borderGoldSubtle
                      }}
                    >
                      <ChevronRight className="w-4 h-4 mt-0.5 text-[#FFEB97] group-hover:text-white shrink-0" />
                      <span className="leading-snug">{promptText}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Chat Interface */}
            <div
              className="lg:col-span-8 rounded-3xl border shadow-2xl flex flex-col overflow-hidden"
              style={{
                background: LUXURY_PALETTE.cardShineGradient,
                borderColor: LUXURY_PALETTE.borderGoldMedium,
                minHeight: '620px'
              }}
            >
              {/* Chat Header */}
              <div
                className="p-4 sm:p-5 border-b flex items-center justify-between"
                style={{
                  background: 'linear-gradient(90deg, #3A230B 0%, #583714 50%, #3A230B 100%)',
                  borderColor: LUXURY_PALETTE.borderGoldSubtle
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-md"
                    style={{ background: LUXURY_PALETTE.goldFoil, color: '#38220A' }}
                  >
                    <Vote className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#FFF7E2] flex items-center gap-2">
                      Gemini Civic Intelligence Assistant
                      <span className="w-2 h-2 rounded-full bg-[#FFEB97] animate-pulse" />
                    </h3>
                    <p className="text-xs text-[#D8BE9E]">
                      Grounded in election guidelines, statutory voter forms, and polling day protocols.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMessages([
                      {
                        id: `welcome-reset-${Date.now()}`,
                        sender: 'assistant',
                        text: `Chat session refreshed. Ready to assist with any questions about ${persona.name} registration or polling day rules!`,
                        timestamp: 'Just now'
                      }
                    ]);
                    showToast('Chat history cleared', 'Reset');
                  }}
                  className="p-2 rounded-xl text-[#D8BE9E] hover:text-[#FFEB97] hover:bg-[#583714]/40 transition-colors text-xs flex items-center gap-1 border border-[#FFEB97]/20"
                  title="Clear conversation"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              </div>

              {/* Chat Message Thread */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[480px]">
                {messages.map(msg => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-1 shadow"
                          style={{
                            background: 'linear-gradient(135deg, #FFEB97 0%, #D4A85F 100%)',
                            color: '#38220A'
                          }}
                        >
                          CW
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-lg ${
                          isUser ? 'rounded-tr-none' : 'rounded-tl-none'
                        }`}
                        style={{
                          background: isUser
                            ? 'linear-gradient(135deg, #FFEB97 0%, #E3B457 50%, #C2933C 100%)'
                            : 'rgba(42, 27, 14, 0.85)',
                          color: isUser ? '#2E1905' : LUXURY_PALETTE.textLight,
                          border: isUser ? '1px solid #FFEB97' : `1px solid ${LUXURY_PALETTE.borderGoldSubtle}`
                        }}
                      >
                        <div className="prose prose-invert max-w-none text-xs sm:text-sm space-y-2">
                          <FormattedAssistantMessage content={msg.text} isUser={isUser} />
                        </div>

                        <div
                          className="mt-3 pt-2 border-t flex items-center justify-between text-[11px] opacity-80"
                          style={{ borderColor: isUser ? 'rgba(46, 25, 5, 0.25)' : 'rgba(255, 235, 151, 0.15)' }}
                        >
                          <span>{msg.timestamp}</span>
                          {!isUser && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(msg.text);
                                  showToast('Copied answer to clipboard', 'Copied');
                                }}
                                className="hover:text-[#FFEB97] transition-colors flex items-center gap-1"
                                title="Copy response"
                              >
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </button>
                              {soundEnabled && (
                                <button
                                  onClick={() => speakText(msg.text)}
                                  className="hover:text-[#FFEB97] transition-colors flex items-center gap-1"
                                  title="Read aloud"
                                >
                                  <Volume2 className="w-3 h-3" />
                                  <span>Listen</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {isUser && (
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-1 shadow"
                          style={{ background: LUXURY_PALETTE.brownEspresso, color: LUXURY_PALETTE.goldLight, border: '1px solid #FFEB97' }}
                        >
                          You
                        </div>
                      )}
                    </div>
                  );
                })}

                {isGenerating && (
                  <div className="flex gap-3 items-center">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: LUXURY_PALETTE.goldFoil, color: '#38220A' }}
                    >
                      CW
                    </div>
                    <div
                      className="p-3.5 rounded-2xl rounded-tl-none text-xs flex items-center gap-2 border"
                      style={{
                        background: 'rgba(42, 27, 14, 0.85)',
                        borderColor: LUXURY_PALETTE.borderGoldMedium,
                        color: LUXURY_PALETTE.goldLight
                      }}
                    >
                      <Sparkles className="w-4 h-4 animate-spin text-[#FFEB97]" />
                      <span>Synthesizing constitutional guidance with Gemini reasoning...</span>
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={handleSendChat}
                className="p-4 border-t flex items-center gap-2"
                style={{
                  background: 'rgba(23, 14, 7, 0.98)',
                  borderColor: LUXURY_PALETTE.borderGoldSubtle
                }}
              >
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={`Ask anything about ${persona.name} procedures, VVPAT verification, or Form ${persona.primaryForm.split(' ')[1]}...`}
                  className="flex-1 px-4 py-3 rounded-xl text-xs sm:text-sm bg-[#120C06] border border-[#FFEB97]/25 text-[#FFF7E2] placeholder-[#9B7E62] focus:outline-none focus:border-[#FFEB97] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!userInput.trim() || isGenerating}
                  className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
                  style={{
                    background: LUXURY_PALETTE.goldFoil,
                    color: '#38220A',
                    boxShadow: '0 4px 14px rgba(255, 235, 151, 0.25)'
                  }}
                >
                  <span>Inquire</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {}

        {/* VIEW 2: EVM & POLLING BOOTH SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="space-y-8">
            <div
              className="p-6 rounded-3xl border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
              style={{
                background: LUXURY_PALETTE.cardShineGradient,
                borderColor: LUXURY_PALETTE.borderGoldMedium
              }}
            >
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFEB97] block mb-1">
                  Overcoming First-Time Voting Anxiety
                </span>
                <h3 className="text-2xl font-black text-[#FFF7E2]">
                  Interactive EVM & Polling Booth Simulator
                </h3>
                <p className="text-xs sm:text-sm text-[#D8BE9E] mt-1 max-w-2xl">
                  Test-drive casting a ballot on a simulated Electronic Voting Machine. Experience the real 7-second VVPAT verification window and learn what to expect at each polling officer's desk.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEvmStatus('ready');
                    setSelectedCandidate(null);
                    setVvpatCountdown(7);
                    showToast('EVM Ballot Unit reset to ready status.', 'Simulator Reset');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all hover:scale-105"
                  style={{
                    borderColor: LUXURY_PALETTE.goldLight,
                    color: LUXURY_PALETTE.goldLight,
                    background: 'rgba(88, 55, 20, 0.4)'
                  }}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset EVM</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: The Interactive EVM Balloting Unit */}
              <div
                className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border shadow-2xl relative"
                style={{
                  background: 'linear-gradient(180deg, #2D1D0F 0%, #1A1108 100%)',
                  borderColor: LUXURY_PALETTE.borderGoldMedium
                }}
              >
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#FFEB97]/20">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFEB97]">
                      BALLOTING UNIT (M3 SERIES)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-[#D8BE9E]">READY LED:</span>
                    <span
                      className={`w-3 h-3 rounded-full ${
                        evmStatus === 'ready' ? 'bg-emerald-400 shadow-[0_0_12px_#34d399]' : 'bg-stone-700'
                      }`}
                    />
                  </div>
                </div>

                {/* Candidate Rows */}
                <div className="space-y-3">
                  {EVM_CANDIDATES.map((cand) => {
                    const isCandidateChosen = selectedCandidate?.id === cand.id;
                    return (
                      <div
                        key={cand.id}
                        className="p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3"
                        style={{
                          background: isCandidateChosen
                            ? 'linear-gradient(90deg, rgba(88, 55, 20, 0.7) 0%, rgba(42, 27, 14, 0.9) 100%)'
                            : 'rgba(23, 14, 7, 0.75)',
                          borderColor: isCandidateChosen ? LUXURY_PALETTE.goldLight : LUXURY_PALETTE.borderGoldSubtle
                        }}
                      >
                        {/* Serial & Name */}
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-[#120C06] font-mono text-xs font-bold flex items-center justify-center text-[#FFEB97] border border-[#FFEB97]/30">
                            0{cand.id}
                          </span>
                          <div>
                            <h4 className="font-bold text-sm text-[#FFF7E2]">{cand.name}</h4>
                            <p className="text-[11px] text-[#D8BE9E]">{cand.party}</p>
                          </div>
                        </div>

                        {/* Party Symbol & Braille Label */}
                        <div className="flex items-center gap-4">
                          <div className="text-center px-2 py-1 rounded bg-[#120C06] border border-[#FFEB97]/25">
                            <span className="text-xl block">{cand.symbol}</span>
                            <span className="text-[9px] font-mono text-[#D8BE9E] font-bold">{cand.code}</span>
                          </div>

                          {/* Lamp & Blue Button */}
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-3.5 h-3.5 rounded-full transition-all ${
                                isCandidateChosen && (evmStatus === 'vvpat_showing' || evmStatus === 'completed')
                                  ? 'bg-rose-500 shadow-[0_0_12px_#f43f5e]'
                                  : 'bg-stone-800'
                              }`}
                              title="Candidate Lamp"
                            />

                            <button
                              onClick={() => handleVoteCandidate(cand)}
                              disabled={evmStatus !== 'ready'}
                              className="px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5 text-white"
                              style={{
                                background: '#1d4ed8',
                                border: '2px solid #60a5fa',
                                boxShadow: '0 4px 10px rgba(29, 78, 216, 0.4)'
                              }}
                            >
                              <Vote className="w-3.5 h-3.5" />
                              <span>Vote</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-4 border-t border-[#FFEB97]/20 text-[11px] text-[#D8BE9E] font-mono flex items-center justify-between">
                  <span>Braille Numbering Embossed on the right of each button</span>
                  <span>Standalone Battery Powered Unit</span>
                </div>
              </div>

              {/* Right Column: Simulated VVPAT Unit with 7-second Window */}
              <div className="lg:col-span-5 space-y-6">
                <div
                  className="p-6 rounded-3xl border shadow-2xl"
                  style={{
                    background: LUXURY_PALETTE.cardShineGradient,
                    borderColor: evmStatus === 'vvpat_showing' ? LUXURY_PALETTE.goldLight : LUXURY_PALETTE.borderGoldMedium
                  }}
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#FFEB97]/20">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#FFEB97]" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFF7E2]">
                        VVPAT Viewing Window
                      </span>
                    </div>
                    {evmStatus === 'vvpat_showing' && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse">
                        Display: {vvpatCountdown}s
                      </span>
                    )}
                  </div>

                  {/* Physical VVPAT Window Screen */}
                  <div
                    className="p-6 rounded-2xl border-4 flex flex-col items-center justify-center min-h-[240px] text-center transition-all relative overflow-hidden"
                    style={{
                      backgroundColor: evmStatus === 'vvpat_showing' ? '#FFFFFF' : '#140C05',
                      borderColor: '#583714',
                      color: evmStatus === 'vvpat_showing' ? '#000000' : '#D8BE9E'
                    }}
                  >
                    {evmStatus === 'ready' && (
                      <div className="space-y-2">
                        <Vote className="w-10 h-10 mx-auto text-[#9B7E62]" />
                        <p className="text-xs text-[#D8BE9E] font-mono">
                          Window is dark and awaiting ballot activation. Press any candidate's blue button on the left.
                        </p>
                      </div>
                    )}

                    {evmStatus === 'vvpat_showing' && selectedCandidate && (
                      <div className="animate-fade-in w-full text-black space-y-2 font-mono">
                        <div className="border-b-2 border-dashed border-black/40 pb-2 mb-2 text-left text-[10px]">
                          <span>ELECTION COMMISSION OF INDIA</span>
                          <span className="float-right">SERIAL: 0{selectedCandidate.id}</span>
                        </div>
                        <div className="text-3xl font-black my-1">{selectedCandidate.symbol}</div>
                        <h4 className="text-lg font-black tracking-tight">{selectedCandidate.name}</h4>
                        <p className="text-xs font-bold uppercase">{selectedCandidate.party}</p>
                        <div className="border-t-2 border-dashed border-black/40 pt-2 text-[10px] text-stone-700">
                          Visible for 7 seconds • Drops automatically into sealed container
                        </div>
                        <div className="w-full bg-stone-300 h-1.5 rounded-full overflow-hidden mt-3">
                          <div
                            className="bg-[#583714] h-full transition-all duration-1000"
                            style={{ width: `${(vvpatCountdown / 7) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {evmStatus === 'completed' && (
                      <div className="space-y-2 text-emerald-400 animate-fade-in">
                        <CheckCircle className="w-10 h-10 mx-auto" />
                        <h4 className="text-sm font-bold text-[#FFF7E2]">Ballot Successfully Tallied!</h4>
                        <p className="text-xs text-[#D8BE9E] font-mono">
                          The paper slip dropped into the ballot box. The EVM has securely locked until the next voter slip is authorized by Officer 3.
                        </p>
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] text-[#D8BE9E] font-mono mt-4 leading-relaxed">
                    <strong>Statutory Fact:</strong> You do not touch or remove the paper slip. It is preserved for physical audit if a recount is ordered by the Returning Officer.
                  </p>
                </div>

                <div
                  className="p-5 rounded-2xl border text-xs"
                  style={{
                    background: 'rgba(88, 55, 20, 0.35)',
                    borderColor: LUXURY_PALETTE.borderGoldMedium,
                    color: LUXURY_PALETTE.textLight
                  }}
                >
                  <div className="flex items-center gap-2 text-[#FFEB97] font-bold mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Secrecy of Vote is Absolute</span>
                  </div>
                  <p className="text-[#D8BE9E] leading-relaxed">
                    Under Rule 49M of the Conduct of Elections Rules, voting secrecy is protected. No camera, recording device, or official is permitted inside the voting compartment.
                  </p>
                </div>
              </div>
            </div>

            {}

            <div
              className="p-6 sm:p-8 rounded-3xl border shadow-xl"
              style={{
                background: LUXURY_PALETTE.cardShineGradient,
                borderColor: LUXURY_PALETTE.borderGoldMedium
              }}
            >
              <div className="mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFEB97] block mb-1">
                  Inside the Polling Station
                </span>
                <h3 className="text-xl font-bold text-[#FFF7E2]">
                  The 4 Official Checkpoints: What to Expect Step-by-Step
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {BOOTH_CHECKPOINTS.map((cp) => {
                  const isActive = activeBoothStep === cp.step;
                  const Icon = cp.icon;
                  return (
                    <div
                      key={cp.step}
                      onClick={() => setActiveBoothStep(cp.step)}
                      className="p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between"
                      style={{
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(88, 55, 20, 0.7) 0%, rgba(42, 27, 14, 0.95) 100%)'
                          : 'rgba(23, 14, 7, 0.75)',
                        borderColor: isActive ? LUXURY_PALETTE.goldLight : LUXURY_PALETTE.borderGoldSubtle,
                        boxShadow: isActive ? '0 0 20px -3px rgba(255, 235, 151, 0.3)' : 'none'
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center"
                            style={{
                              background: isActive ? LUXURY_PALETTE.goldFoil : LUXURY_PALETTE.brownEspresso,
                              color: isActive ? '#38220A' : LUXURY_PALETTE.goldLight
                            }}
                          >
                            0{cp.step}
                          </span>
                          <Icon className={`w-5 h-5 ${isActive ? 'text-[#FFEB97]' : 'text-[#9B7E62]'}`} />
                        </div>
                        <h4 className="font-bold text-sm text-[#FFF7E2] mb-1">{cp.title}</h4>
                        <p className="text-[11px] font-mono text-[#FFEB97] mb-2">{cp.role}</p>
                        <p className="text-xs text-[#D8BE9E] leading-relaxed mb-3">{cp.details}</p>
                      </div>

                      <div className="pt-3 border-t border-[#FFEB97]/15 text-[11px] text-[#D8BE9E]">
                        <strong className="text-[#FFEB97] block mb-0.5">Key Protocol:</strong>
                        <span>{cp.dos}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {}

        {/* VIEW 3: DOCUMENT VERIFIER & ELIGIBILITY SCORE */}
        {activeTab === 'verifier' && (
          <div className="space-y-8">
            <div
              className="p-6 rounded-3xl border shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6"
              style={{
                background: LUXURY_PALETTE.cardShineGradient,
                borderColor: LUXURY_PALETTE.borderGoldMedium
              }}
            >
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFEB97] block mb-1">
                  Interactive Checklist Engine
                </span>
                <h3 className="text-2xl font-black text-[#FFF7E2]">
                  Voter Readiness & Document Eligibility Checker
                </h3>
                <p className="text-xs sm:text-sm text-[#D8BE9E] mt-1 max-w-xl">
                  Toggle the documents you currently have available. The system evaluates whether you meet statutory prerequisites for filing Form {persona.primaryForm.split(' ')[1]}.
                </p>
              </div>

              {/* Dynamic Readiness Score Gauge in Gold */}
              <div
                className="p-4 rounded-2xl border flex items-center gap-4 min-w-[240px]"
                style={{
                  background: 'rgba(42, 27, 14, 0.75)',
                  borderColor: LUXURY_PALETTE.borderGoldMedium,
                  boxShadow: '0 4px 20px rgba(88, 55, 20, 0.35)'
                }}
              >
                <div
                  className="w-14 h-14 rounded-full border-4 flex items-center justify-center font-mono font-black text-lg shadow-inner"
                  style={{
                    borderColor: docScore >= 80 ? LUXURY_PALETTE.goldLight : docScore >= 60 ? '#D4A85F' : '#F87171',
                    color: docScore >= 80 ? LUXURY_PALETTE.goldLight : docScore >= 60 ? '#D4A85F' : '#F87171',
                    background: '#140C05'
                  }}
                >
                  {docScore}%
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D8BE9E] block">
                    Readiness Rating
                  </span>
                  <h4 className="text-sm font-bold text-[#FFF7E2]">
                    {docScore === 100
                      ? 'Fully Prepared!'
                      : docScore >= 80
                      ? 'Eligible to Apply'
                      : 'Missing Mandatory Docs'}
                  </h4>
                  <span className="text-[11px] text-[#D8BE9E]">
                    {docScore >= 80 ? 'Ready for submission' : 'Gather remaining proofs'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mandatory Checklist for Form 6 / 8 */}
              <div
                className="p-6 rounded-3xl border shadow-xl space-y-4"
                style={{
                  background: LUXURY_PALETTE.cardShineGradient,
                  borderColor: LUXURY_PALETTE.borderGoldMedium
                }}
              >
                <h4 className="font-bold text-base text-[#FFF7E2] flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#FFEB97]" />
                  <span>Statutory Document Verification</span>
                </h4>
                <p className="text-xs text-[#D8BE9E]">
                  Click each item to check or uncheck based on your possession:
                </p>

                <div className="space-y-3">
                  <DocToggleRow
                    checked={checkedDocs.doc_age}
                    onChange={() => setCheckedDocs(prev => ({ ...prev, doc_age: !prev.doc_age }))}
                    title="Proof of Age / Date of Birth"
                    desc="Birth Certificate, Indian Passport, PAN Card, Driving License, or Class 10/12 Marksheet."
                  />
                  <DocToggleRow
                    checked={checkedDocs.doc_address}
                    onChange={() => setCheckedDocs(prev => ({ ...prev, doc_address: !prev.doc_address }))}
                    title="Proof of Ordinary Residence"
                    desc="Water/Gas/Electricity bill (within 1 yr), Bank Passbook, Aadhaar, or registered rental lease."
                  />
                  <DocToggleRow
                    checked={checkedDocs.doc_photo}
                    onChange={() => setCheckedDocs(prev => ({ ...prev, doc_photo: !prev.doc_photo }))}
                    title="Recent Color Photograph (Passport Size)"
                    desc="Clear front-facing photo against a plain white/light background without dark sunglasses."
                  />
                  <DocToggleRow
                    checked={checkedDocs.doc_aadhaar}
                    onChange={() => setCheckedDocs(prev => ({ ...prev, doc_aadhaar: !prev.doc_aadhaar }))}
                    title="Aadhaar Details (Optional but Recommended)"
                    desc="Enables rapid electronic authentication and OTP-based mobile linking for Form 6/8."
                  />
                  <DocToggleRow
                    checked={checkedDocs.doc_mobile}
                    onChange={() => setCheckedDocs(prev => ({ ...prev, doc_mobile: !prev.doc_mobile }))}
                    title="Active Mobile Number"
                    desc="Required to receive real-time SMS updates on BLO field visits and EPIC card dispatch."
                  />
                </div>
              </div>

              {/* Step-by-Step Form Filing Protocol */}
              <div
                className="p-6 rounded-3xl border shadow-xl flex flex-col justify-between"
                style={{
                  background: LUXURY_PALETTE.cardShineGradient,
                  borderColor: LUXURY_PALETTE.borderGoldMedium
                }}
              >
                <div>
                  <h4 className="font-bold text-base text-[#FFF7E2] flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-[#FFEB97]" />
                    <span>Filing Protocol for {persona.primaryForm}</span>
                  </h4>
                  <p className="text-xs text-[#D8BE9E] mb-4">
                    Follow these 4 sequential steps to ensure zero rejection by the Electoral Registration Officer:
                  </p>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div
                        className="w-6 h-6 rounded-full text-[#38220A] text-xs font-bold flex items-center justify-center shrink-0 shadow"
                        style={{ background: LUXURY_PALETTE.goldFoil }}
                      >
                        1
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-[#FFF7E2]">Access Voters Service Portal</h5>
                        <p className="text-xs text-[#D8BE9E]">
                          Navigate to <strong>voters.eci.gov.in</strong> or launch the official Voter Helpline App.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div
                        className="w-6 h-6 rounded-full text-[#38220A] text-xs font-bold flex items-center justify-center shrink-0 shadow"
                        style={{ background: LUXURY_PALETTE.goldFoil }}
                      >
                        2
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-[#FFF7E2]">Fill Personal & Constituency Details</h5>
                        <p className="text-xs text-[#D8BE9E]">
                          Select your State, District, and Assembly Constituency matching your ordinary residence.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div
                        className="w-6 h-6 rounded-full text-[#38220A] text-xs font-bold flex items-center justify-center shrink-0 shadow"
                        style={{ background: LUXURY_PALETTE.goldFoil }}
                      >
                        3
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-[#FFF7E2]">Upload Documents & Submit Declaration</h5>
                        <p className="text-xs text-[#D8BE9E]">
                          Upload self-attested copies of age and address proofs (JPG/PDF up to 2MB).
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div
                        className="w-6 h-6 rounded-full text-[#38220A] text-xs font-bold flex items-center justify-center shrink-0 shadow"
                        style={{ background: LUXURY_PALETTE.goldFoil }}
                      >
                        4
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-[#FFF7E2]">Track Status via Reference ID</h5>
                        <p className="text-xs text-[#D8BE9E]">
                          The BLO completes field verification within 14–21 days, followed by digital EPIC generation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#FFEB97]/20 mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://voters.eci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02]"
                    style={{ background: LUXURY_PALETTE.goldFoil, color: '#38220A' }}
                  >
                    <span>Launch ECI Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => {
                      callGeminiAssistant(`What common errors cause Form ${persona.primaryForm.split(' ')[1]} rejection and how do I avoid them?`);
                      setActiveTab('assistant');
                    }}
                    className="py-3 px-4 rounded-xl text-xs font-semibold border text-[#FFF7E2] hover:bg-[#583714]/40 transition-all flex items-center gap-1.5"
                    style={{ borderColor: LUXURY_PALETTE.borderGoldMedium }}
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-[#FFEB97]" />
                    <span>Avoid Errors with AI</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {}

        {/* VIEW 4: ELECTION TIMELINE & GOOGLE CALENDAR SYNC */}
        {activeTab === 'timeline' && (
          <div className="space-y-8">
            <div
              className="p-6 rounded-3xl border shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6"
              style={{
                background: LUXURY_PALETTE.cardShineGradient,
                borderColor: LUXURY_PALETTE.borderGoldMedium
              }}
            >
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFEB97] block mb-1">
                  Statutory Election Roadmap
                </span>
                <h3 className="text-2xl font-black text-[#FFF7E2]">
                  Election Cycle Milestones & Automated Reminders
                </h3>
                <p className="text-xs sm:text-sm text-[#D8BE9E] mt-1 max-w-xl">
                  Stay ahead of strict statutory cutoffs. Once the final electoral roll freezes, no new additions are permissible for the upcoming polling cycle.
                </p>
              </div>

              {/* Sync to Calendar Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleAddToCalendar}
                  className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer"
                  style={{ background: LUXURY_PALETTE.goldFoil, color: '#38220A' }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Add to Google Calendar</span>
                </button>
                <button
                  onClick={handleDownloadIcs}
                  className="px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm border text-[#FFF7E2] hover:bg-[#583714]/40 transition-all flex items-center gap-2 cursor-pointer"
                  style={{ borderColor: LUXURY_PALETTE.goldLight }}
                >
                  <Download className="w-4 h-4 text-[#FFEB97]" />
                  <span>Download .ICS</span>
                </button>
              </div>
            </div>

            {/* Visual Milestones Cards */}
            <div className="relative border-l-2 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8" style={{ borderColor: 'rgba(255, 235, 151, 0.3)' }}>
              {ELECTION_TIMELINE.map((item, idx) => {
                const isCompleted = item.status === 'completed';
                const isInProgress = item.status === 'in-progress';
                return (
                  <div key={idx} className="relative group">
                    <div
                      className="absolute -left-[35px] sm:-left-[51px] top-1 w-6 h-6 rounded-full border-4 flex items-center justify-center transition-transform group-hover:scale-125"
                      style={{
                        background: isCompleted ? '#34D399' : isInProgress ? LUXURY_PALETTE.goldFoil : LUXURY_PALETTE.brownEspresso,
                        borderColor: LUXURY_PALETTE.brownDeepBg,
                        boxShadow: isInProgress ? '0 0 16px rgba(255, 235, 151, 0.6)' : 'none'
                      }}
                    >
                      {isCompleted ? (
                        <Check className="w-3 h-3 text-[#120C06] font-bold" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>

                    <div
                      className="p-6 rounded-3xl border transition-all hover:border-[#FFEB97]"
                      style={{
                        background: isInProgress
                          ? 'linear-gradient(135deg, rgba(88, 55, 20, 0.7) 0%, rgba(42, 27, 14, 0.95) 100%)'
                          : LUXURY_PALETTE.cardShineGradient,
                        borderColor: isInProgress ? LUXURY_PALETTE.goldLight : LUXURY_PALETTE.borderGoldSubtle
                      }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span
                          className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                          style={{
                            background: isInProgress ? LUXURY_PALETTE.goldFoil : 'rgba(255, 235, 151, 0.12)',
                            color: isInProgress ? '#38220A' : LUXURY_PALETTE.goldLight
                          }}
                        >
                          {item.phase} • {item.dateStr}
                        </span>

                        <span
                          className="text-[11px] font-mono font-bold uppercase"
                          style={{
                            color: isCompleted ? '#34D399' : isInProgress ? '#FFEB97' : '#D8BE9E'
                          }}
                        >
                          {isCompleted ? '✓ Completed' : isInProgress ? '⚡ Active Window' : 'Scheduled'}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-[#FFF7E2] mb-2">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-[#D8BE9E] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {}

        {/* VIEW 5: POLLING STATION RADAR & PRECINCT FINDER */}
        {activeTab === 'locator' && (
          <div className="space-y-8">
            <div
              className="p-6 rounded-3xl border shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6"
              style={{
                background: LUXURY_PALETTE.cardShineGradient,
                borderColor: LUXURY_PALETTE.borderGoldMedium
              }}
            >
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFEB97] block mb-1">
                  Google Maps & Spatial Proximity Radar
                </span>
                <h3 className="text-2xl font-black text-[#FFF7E2]">
                  Polling Station & Booth Locator Radar
                </h3>
                <p className="text-xs sm:text-sm text-[#D8BE9E] mt-1 max-w-xl">
                  Simulate searching by Postal PIN or EPIC Number to view your allocated polling booth, wheelchair accessibility features, and BLO contact details.
                </p>
              </div>

              {/* Search input bar */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchPin}
                  onChange={(e) => setSearchPin(e.target.value)}
                  placeholder="Enter PIN (e.g. 600001) or EPIC"
                  className="px-4 py-2.5 rounded-xl text-xs bg-[#120C06] border border-[#FFEB97]/30 text-[#FFF7E2] focus:outline-none focus:border-[#FFEB97]"
                />
                <button
                  onClick={() => {
                    showToast(`Refreshed polling station data for ${searchPin}`, 'Booth Located');
                  }}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow"
                  style={{ background: LUXURY_PALETTE.goldFoil, color: '#38220A' }}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Locate</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Simulated Map Visual Box */}
              <div
                className="lg:col-span-7 rounded-3xl border overflow-hidden relative shadow-2xl min-h-[380px] flex flex-col justify-between p-6"
                style={{
                  background: 'linear-gradient(180deg, #180F07 0%, #100A04 100%)',
                  borderColor: LUXURY_PALETTE.borderGoldMedium
                }}
              >
                {/* Background Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(#FFEB97 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                  }}
                />

                {/* Radar Sweep Effect in Gold */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-[#FFEB97]/20 pointer-events-none flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border border-[#FFEB97]/30" />
                  <div className="w-32 h-32 rounded-full border border-[#FFEB97]/40" />
                  <div className="w-4 h-4 rounded-full bg-[#FFEB97] animate-ping" />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border"
                    style={{
                      background: 'rgba(23, 14, 7, 0.85)',
                      color: LUXURY_PALETTE.goldLight,
                      borderColor: LUXURY_PALETTE.borderGoldMedium
                    }}
                  >
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>Precinct Radar Live</span>
                  </span>
                  <span className="text-xs font-mono text-[#D8BE9E]">Scale: 1:5000</span>
                </div>

                <div
                  className="relative z-10 p-4 rounded-2xl border max-w-sm shadow-xl"
                  style={{
                    background: 'rgba(42, 27, 14, 0.92)',
                    borderColor: LUXURY_PALETTE.goldLight
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className="p-2 rounded-lg font-bold mt-0.5 shadow"
                      style={{ background: LUXURY_PALETTE.goldFoil, color: '#38220A' }}
                    >
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#FFF7E2]">{locatorResult.boothName}</h4>
                      <p className="text-[11px] text-[#D8BE9E] mt-0.5">{locatorResult.address}</p>
                      <span className="text-[10px] font-mono text-[#FFEB97] mt-1 block">
                        Estimated transit: {locatorResult.distance}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Polling Station Detail Breakdown */}
              <div
                className="lg:col-span-5 p-6 rounded-3xl border shadow-xl space-y-4"
                style={{
                  background: LUXURY_PALETTE.cardShineGradient,
                  borderColor: LUXURY_PALETTE.borderGoldMedium
                }}
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#FFEB97]/20">
                  <h4 className="font-bold text-sm text-[#FFF7E2] flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#FFEB97]" />
                    <span>Designated Polling Booth</span>
                  </h4>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified ECI Booth</span>
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#120C06] border border-[#FFEB97]/20">
                    <span className="text-[#9B7E62] block text-[10px] font-mono uppercase">Assembly Constituency</span>
                    <strong className="text-[#FFF7E2] text-sm">{locatorResult.constituency}</strong>
                  </div>

                  <div className="p-3 rounded-xl bg-[#120C06] border border-[#FFEB97]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[#9B7E62] block text-[10px] font-mono uppercase">Wheelchair Ramp & Braille</span>
                      <strong className="text-emerald-400">100% Accessible (Assisted entry)</strong>
                    </div>
                    <Accessibility className="w-6 h-6 text-emerald-400" />
                  </div>

                  <div className="p-3 rounded-xl bg-[#120C06] border border-[#FFEB97]/20">
                    <span className="text-[#9B7E62] block text-[10px] font-mono uppercase">Assigned Booth Level Officer</span>
                    <strong className="text-[#FFF7E2] block">{locatorResult.bloName}</strong>
                    <span className="text-[#D8BE9E] font-mono text-[11px]">{locatorResult.bloPhone}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#120C06] border border-[#FFEB97]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[#9B7E62] block text-[10px] font-mono uppercase">Average Queue Waiting Time</span>
                      <strong className="text-[#FFF7E2]">{locatorResult.queueTime}</strong>
                    </div>
                    <Clock className="w-5 h-5 text-[#FFEB97]" />
                  </div>
                </div>

                <button
                  onClick={() => {
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locatorResult.boothName + ' ' + locatorResult.address)}`;
                    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
                    showToast('Opening external directions via Google Maps.', 'Maps Navigation');
                  }}
                  className="w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow transition-all hover:scale-[1.02] cursor-pointer mt-4"
                  style={{ background: LUXURY_PALETTE.goldFoil, color: '#38220A' }}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open Directions in Google Maps</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {}

      {/* Persistent Toast Notification Alert in Gold */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl border flex items-center gap-3 animate-fade-in"
          style={{
            background: 'linear-gradient(135deg, #2D1D0F 0%, #1A1108 100%)',
            borderColor: LUXURY_PALETTE.goldLight,
            boxShadow: '0 8px 32px rgba(255, 235, 151, 0.3)'
          }}
        >
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center font-bold shrink-0 shadow"
            style={{ background: LUXURY_PALETTE.goldFoil, color: '#38220A' }}
          >
            <Check className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-bold text-xs text-[#FFF7E2]">{toast.title}</h5>
            <p className="text-xs text-[#D8BE9E]">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Footer & Educational Disclaimer */}
      <footer
        className="mt-16 border-t py-10 px-4 sm:px-6 lg:px-8 text-xs font-mono"
        style={{
          background: '#140C05',
          borderColor: LUXURY_PALETTE.borderGoldSubtle,
          color: LUXURY_PALETTE.textMuted
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold shadow"
              style={{ background: LUXURY_PALETTE.goldFoil, color: '#38220A' }}
            >
              <Vote className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[#FFF7E2] font-bold text-sm font-sans">
                CivicWise • Election Process Education Assistant
              </p>
              <p className="text-xs text-[#D8BE9E]">
                Prompt Wars Virtual 2026 | Built with Google Antigravity & Gemini API
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[#D8BE9E] text-xs">
            <a
              href="https://voters.eci.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFEB97] transition-colors flex items-center gap-1"
            >
              <span>Voters Service Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://electoralsearch.eci.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFEB97] transition-colors flex items-center gap-1"
            >
              <span>Search Roll by EPIC</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-[#FFEB97] font-bold">Toll Free: 1950</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-[#FFEB97]/10 text-[11px] text-[#9B7E62] text-center leading-relaxed">
          Non-partisan democratic education initiative. CivicWise does not endorse any political candidate, party, or coalition. Consult your local Returning Officer or official Electoral Registration Office for statutory orders.
        </div>
      </footer>
    </div>
  );
}

function TabNavButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer border"
      style={{
        background: active
          ? LUXURY_PALETTE.goldFoil
          : 'transparent',
        color: active ? '#38220A' : LUXURY_PALETTE.textSubtle,
        borderColor: active ? LUXURY_PALETTE.goldLight : 'transparent',
        boxShadow: active ? '0 4px 14px -2px rgba(255, 235, 151, 0.4)' : 'none'
      }}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

function DocToggleRow({ checked, onChange, title, desc }) {
  return (
    <div
      onClick={onChange}
      className="p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer hover:border-[#FFEB97]"
      style={{
        background: checked ? 'rgba(88, 55, 20, 0.4)' : 'rgba(23, 14, 7, 0.65)',
        borderColor: checked ? LUXURY_PALETTE.goldLight : LUXURY_PALETTE.borderGoldSubtle
      }}
    >
      <div
        className="w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors"
        style={{
          background: checked ? LUXURY_PALETTE.goldFoil : 'transparent',
          borderColor: checked ? LUXURY_PALETTE.goldLight : LUXURY_PALETTE.borderGoldMedium
        }}
      >
        {checked && <Check className="w-3.5 h-3.5 text-[#38220A] font-bold" />}
      </div>
      <div>
        <h5 className="text-xs font-bold text-[#FFF7E2]">{title}</h5>
        <p className="text-[11px] text-[#D8BE9E] mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function FormattedAssistantMessage({ content, isUser }) {
  const lines = content.split('\n');
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('### ')) {
          return (
            <h4
              key={i}
              className={`font-bold text-sm sm:text-base mt-2 mb-1 ${
                isUser ? 'text-[#2E1905]' : 'text-[#FFEB97]'
              }`}
            >
              {trimmed.replace('### ', '')}
            </h4>
          );
        }
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={i} className="flex items-start gap-2 ml-1">
              <span className={`text-xs mt-1 ${isUser ? 'text-[#2E1905]' : 'text-[#FFEB97]'}`}>•</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: formatInlineMarkdown(trimmed.replace(/^[-*]\s+/, ''))
                }}
              />
            </div>
          );
        }
        if (/^\d+\.\s/.test(trimmed)) {
          return (
            <div key={i} className="flex items-start gap-2 ml-1">
              <span className={`text-xs font-mono font-bold mt-0.5 ${isUser ? 'text-[#2E1905]' : 'text-[#FFEB97]'}`}>
                {trimmed.match(/^\d+\./)[0]}
              </span>
              <span
                dangerouslySetInnerHTML={{
                  __html: formatInlineMarkdown(trimmed.replace(/^\d+\.\s+/, ''))
                }}
              />
            </div>
          );
        }
        if (!trimmed) {
          return <div key={i} className="h-1" />;
        }
        return (
          <p
            key={i}
            dangerouslySetInnerHTML={{
              __html: formatInlineMarkdown(trimmed)
            }}
          />
        );
      })}
    </div>
  );
}

function formatInlineMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-[#120C06] px-1 py-0.5 rounded text-[11px] text-[#FFEB97]">$1</code>');
}

function PhoneHelpIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#FFEB97]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
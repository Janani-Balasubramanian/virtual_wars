import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Search, Map as MapIcon, Layers, Info } from 'lucide-react';

const PollingStationFinder = () => {
  return (
    <div className="glass-morphism rounded-[40px] overflow-hidden border border-white/5 h-full flex flex-col">
      <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <MapPin className="text-red-500 w-6 h-6" /> Polling Station Finder
          </h3>
          <p className="text-slate-400 text-sm">Locate your assigned booth in real-time.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all">
            <Layers className="w-5 h-5 text-slate-400" />
          </button>
          <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all">
            <Info className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="relative flex-1 min-h-[400px] bg-slate-900 group">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:40px_40px]" />
          <svg className="w-full h-full text-slate-800" viewBox="0 0 800 400">
            <path d="M0,100 Q200,50 400,150 T800,100" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M100,0 Q150,200 100,400" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M600,0 Q550,200 600,400" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="420" cy="180" r="120" fill="currentColor" opacity="0.05" />
          </svg>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute top-6 left-6 right-6 z-20">
          <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-2 flex items-center gap-3 shadow-2xl">
            <Search className="w-5 h-5 text-slate-500 ml-3" />
            <input 
              type="text" 
              placeholder="Search EPIC ID, Ward or Locality..." 
              className="bg-transparent border-none outline-none text-white text-sm flex-1 py-2"
            />
            <button 
              onClick={() => alert("Searching for your current location...")}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-all"
            >
              Locate Me <Navigation className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Map Markers */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-[45%] left-[48%] z-10 cursor-pointer group"
        >
          <div className="relative">
            <MapPin className="w-12 h-12 text-blue-500 fill-blue-500/20" />
            <div className="absolute -top-16 -left-12 bg-white text-slate-900 p-3 rounded-xl shadow-2xl w-40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <p className="font-bold text-xs">Primary School, Ward 12</p>
              <p className="text-[10px] text-slate-500">Booth No. 142</p>
              <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45" />
            </div>
          </div>
        </motion.div>

        {/* Polling Details Card */}
        <div className="absolute bottom-6 left-6 right-6 z-20">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center shrink-0 border border-blue-500/20">
                <Navigation className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Estimated Distance</p>
                <p className="text-xl font-bold text-white leading-none">1.2 km away</p>
                <p className="text-slate-400 text-xs mt-1">Approx. 15 min walking distance</p>
              </div>
            </div>
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Primary+School+Ward+12+Booth+142" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-12 px-6 bg-white text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shrink-0"
            >
              Get Directions
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PollingStationFinder;

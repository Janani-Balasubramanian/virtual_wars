import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Navigation, Search, Layers, Info } from 'lucide-react';

// Placeholder API Key - User should replace with real key from Google Cloud Console
const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 28.6139, // New Delhi
  lng: 77.2090,
};

const mockBooth = {
  id: 1,
  name: "Primary School, Ward 12",
  boothNo: "142",
  location: { lat: 28.6150, lng: 77.2100 },
};

const PollingStationFinder = () => {
  const [selectedBooth, setSelectedBooth] = useState<any>(null);

  return (
    <div className="glass-morphism rounded-[40px] overflow-hidden border border-white/5 h-full flex flex-col">
      <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
        <div role="status" aria-live="polite">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <MapPin className="text-red-500 w-6 h-6" aria-hidden="true" /> Polling Station Finder
          </h3>
          <p className="text-slate-400 text-sm">Locate your assigned booth in real-time using Google Maps.</p>
        </div>
        <div className="flex gap-2">
          <button 
            aria-label="Map Layers"
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all"
          >
            <Layers className="w-5 h-5 text-slate-400" />
          </button>
          <button 
            aria-label="Help Information"
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all"
          >
            <Info className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="relative flex-1 min-h-[400px] bg-slate-900 overflow-hidden">
        {GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-4">
             <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center">
                <MapPin className="w-10 h-10 text-blue-500" />
             </div>
             <h4 className="text-xl font-bold text-white">Google Maps Integration Ready</h4>
             <p className="text-slate-400 max-w-xs">
               To activate real-time mapping, please provide your <strong>Google Maps API Key</strong> in the <code>PollingStationFinder.tsx</code> file.
             </p>
             <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-xs font-mono text-blue-300">
               gcloud services enable maps-backend.googleapis.com
             </div>
          </div>
        ) : (
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={15}
              options={{
                styles: [
                  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                  // ... more dark theme styles
                ],
              }}
            >
              <Marker 
                position={mockBooth.location} 
                onClick={() => setSelectedBooth(mockBooth)}
              />
              
              {selectedBooth && (
                <InfoWindow
                  position={selectedBooth.location}
                  onCloseClick={() => setSelectedBooth(null)}
                >
                  <div className="p-2 text-slate-900">
                    <h5 className="font-bold">{selectedBooth.name}</h5>
                    <p className="text-xs">Booth No. {selectedBooth.boothNo}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        )}

        {/* Floating Search Bar */}
        <div className="absolute top-6 left-6 right-6 z-20">
          <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-2 flex items-center gap-3 shadow-2xl">
            <Search className="w-5 h-5 text-slate-500 ml-3" aria-hidden="true" />
            <input 
              type="text" 
              placeholder="Search EPIC ID, Ward or Locality..." 
              aria-label="Search for polling station"
              className="bg-transparent border-none outline-none text-white text-sm flex-1 py-2"
            />
            <button 
              onClick={() => alert("Searching for your current location...")}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-all focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              Locate Me <Navigation className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Polling Details Card */}
        <div className="absolute bottom-6 left-6 right-6 z-20">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl flex items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center shrink-0 border border-blue-500/20">
                <Navigation className="w-6 h-6 text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Estimated Distance</p>
                <p className="text-xl font-bold text-white leading-none">1.2 km away</p>
                <p className="text-slate-400 text-xs mt-1">Approx. 15 min walking distance</p>
              </div>
            </div>
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${mockBooth.location.lat},${mockBooth.location.lng}`}
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Get directions to the polling station"
              className="h-12 px-6 bg-white text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-all shrink-0 focus:ring-2 focus:ring-white focus:outline-none"
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

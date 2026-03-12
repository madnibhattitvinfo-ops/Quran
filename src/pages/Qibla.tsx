import React, { useState, useEffect } from 'react';
import { Compass as CompassIcon } from 'lucide-react';
import { motion } from 'motion/react';

export const Qibla: React.FC = () => {
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);

  useEffect(() => {
    const handleOrientation = (e: any) => {
      if (e.webkitCompassHeading) {
        setHeading(e.webkitCompassHeading);
      } else if (e.alpha) {
        setHeading(360 - e.alpha);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    
    // Calculate Qibla (Mecca is at 21.4225° N, 39.8262° E)
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const meccaLat = 21.4225;
      const meccaLon = 39.8262;
      
      const y = Math.sin(meccaLon - lon);
      const x = Math.cos(lat) * Math.tan(meccaLat) - Math.sin(lat) * Math.cos(meccaLon - lon);
      const qibla = (Math.atan2(y, x) * 180) / Math.PI;
      setQiblaDirection(qibla);
    });

    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return (
    <div className="space-y-12 flex flex-col items-center">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-3xl font-bold text-[#5A5A40]">Qibla Finder</h2>
        <p className="text-[#5A5A40]/40 text-sm">Align your phone to find the Qibla</p>
      </div>

      <div className="relative w-72 h-72">
        <motion.div 
          animate={{ rotate: -heading }}
          className="w-full h-full relative"
        >
          {/* Compass Background */}
          <div className="absolute inset-0 border-4 border-[#5A5A40]/10 rounded-full flex items-center justify-center">
            <div className="absolute top-2 font-bold text-[#5A5A40]">N</div>
            <div className="absolute bottom-2 font-bold text-[#5A5A40]">S</div>
            <div className="absolute left-2 font-bold text-[#5A5A40]">W</div>
            <div className="absolute right-2 font-bold text-[#5A5A40]">E</div>
          </div>

          {/* Qibla Indicator */}
          <motion.div 
            animate={{ rotate: qiblaDirection }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-1 h-32 bg-[#5A5A40] -translate-y-16 rounded-full relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <CompassIcon className="w-8 h-8 text-[#5A5A40]" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#5A5A40]/5 w-full max-w-xs text-center">
        <p className="text-[10px] uppercase font-bold tracking-widest text-[#5A5A40]/40 mb-1">Qibla Direction</p>
        <p className="font-serif text-2xl font-bold text-[#5A5A40]">{Math.round(qiblaDirection)}° from North</p>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Bell } from 'lucide-react';
import { getPrayerTimes } from '../services/quranService';
import { PrayerTimes as PrayerTimesType } from '../types';

export const PrayerTimes: React.FC = () => {
  const [times, setTimes] = useState<PrayerTimesType | null>(null);
  const [location, setLocation] = useState<{ lat: number, lon: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {
        // Default to Mecca if location denied
        setLocation({ lat: 21.4225, lon: 39.8262 });
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      getPrayerTimes(location.lat, location.lon).then(data => {
        setTimes(data);
        setLoading(false);
      });
    }
  }, [location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-[#5A5A40] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const prayerItems = [
    { name: 'Fajr', time: times?.Fajr },
    { name: 'Sunrise', time: times?.Sunrise },
    { name: 'Dhuhr', time: times?.Dhuhr },
    { name: 'Asr', time: times?.Asr },
    { name: 'Maghrib', time: times?.Maghrib },
    { name: 'Isha', time: times?.Isha },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-3xl font-bold text-[#5A5A40]">Prayer Times</h2>
        <div className="flex items-center justify-center gap-2 text-[#5A5A40]/40 text-sm">
          <MapPin className="w-4 h-4" />
          <span>Current Location</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {prayerItems.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={item.name}
            className="bg-white p-6 rounded-[24px] border border-[#5A5A40]/5 flex items-center justify-between hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f5f5f0] rounded-2xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#5A5A40]" />
              </div>
              <div>
                <h4 className="font-bold text-[#5A5A40]">{item.name}</h4>
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#5A5A40]/40">Notification On</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="font-serif text-2xl font-bold text-[#5A5A40]">{item.time}</span>
              <button className="p-2 text-[#5A5A40]/20 hover:text-[#5A5A40] transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

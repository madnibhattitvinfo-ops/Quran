import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, BookOpen, Star, Clock } from 'lucide-react';
import { getSurahs } from '../services/quranService';
import { Surah } from '../types';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSurahs().then(data => {
      setSurahs(data);
      setLoading(false);
    });
  }, []);

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(search.toLowerCase()) ||
    s.name.includes(search)
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#5A5A40] rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl"
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-serif font-bold mb-2">Assalamu Alaikum</h2>
          <p className="text-white/80 text-sm max-w-[200px]">"The best among you are those who learn the Quran and teach it."</p>
          
          <div className="mt-8 flex gap-4">
            <Link to="/mushaf" className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 hover:bg-white/20 transition-all">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-white/60" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">Read Full Quran</span>
              </div>
              <p className="font-serif text-lg">Mushaf View</p>
              <p className="text-[10px] text-white/40">Page-by-page reading</p>
            </Link>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-white/60" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">Last Read</span>
              </div>
              <p className="font-serif text-lg">Al-Baqarah</p>
              <p className="text-[10px] text-white/40">Ayah 255</p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BookOpen className="w-32 h-32" />
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A5A40]/40 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search Surah..."
          className="w-full bg-white border border-[#5A5A40]/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Surah List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-serif text-xl font-bold text-[#5A5A40]">Surah List</h3>
          <Link to="/index" className="text-[10px] uppercase font-bold tracking-widest text-[#5A5A40]/60 hover:text-[#5A5A40]">View All</Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 bg-white rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredSurahs.slice(0, 10).map((surah) => (
              <Link 
                key={surah.number}
                to={`/surah/${surah.number}`}
                className="group bg-white p-4 rounded-2xl border border-[#5A5A40]/5 hover:border-[#5A5A40]/20 hover:shadow-md transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#f5f5f0] rounded-xl flex items-center justify-center font-serif font-bold text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white transition-colors">
                    {surah.number}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#5A5A40]">{surah.englishName}</h4>
                    <p className="text-[10px] text-[#5A5A40]/40 uppercase tracking-widest font-bold">
                      {surah.revelationType} • {surah.numberOfAyahs} Ayahs
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-serif text-xl text-[#5A5A40]">{surah.name}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

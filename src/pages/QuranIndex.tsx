import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Book, ChevronRight, List } from 'lucide-react';
import { getSurahs } from '../services/quranService';
import { Surah } from '../types';
import { Link } from 'react-router-dom';

export const QuranIndex: React.FC = () => {
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
    s.name.includes(search) ||
    s.number.toString() === search
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#5A5A40] rounded-xl flex items-center justify-center shadow-lg">
            <List className="text-white w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#5A5A40]">Quran Index</h2>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#5A5A40]/40">114 Surahs</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A5A40]/40 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search Surah by name or number..."
          className="w-full bg-white border border-[#5A5A40]/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Index List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-24 bg-white rounded-[32px] animate-pulse" />
          ))
        ) : (
          filteredSurahs.map((surah, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.01 }}
              key={surah.number}
            >
              <Link 
                to={`/surah/${surah.number}`}
                className="group block bg-white p-6 rounded-[32px] border border-[#5A5A40]/5 hover:border-[#5A5A40]/20 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#f5f5f0] rounded-2xl flex items-center justify-center font-serif font-bold text-[#5A5A40] group-hover:bg-[#5A5A40] group-hover:text-white transition-colors">
                      {surah.number}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#5A5A40] text-lg">{surah.englishName}</h4>
                      <p className="text-[10px] text-[#5A5A40]/40 uppercase tracking-widest font-bold">
                        {surah.revelationType} • {surah.numberOfAyahs} Ayahs
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="font-serif text-2xl text-[#5A5A40]">{surah.name}</p>
                      <p className="text-[10px] text-[#5A5A40]/40 font-bold">{surah.englishNameTranslation}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#5A5A40]/20 group-hover:text-[#5A5A40] transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>

      {filteredSurahs.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-[#5A5A40]/40 font-bold">No Surahs found matching your search.</p>
        </div>
      )}
    </div>
  );
};

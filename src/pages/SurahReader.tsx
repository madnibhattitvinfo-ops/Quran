import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Play, Bookmark, Share2, Languages, Eye, EyeOff } from 'lucide-react';
import { getSurahDetail, getTranslationEditions } from '../services/quranService';
import { Ayah, Surah, Edition } from '../types';

export const SurahReader: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [surah, setSurah] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [editions, setEditions] = useState<Edition[]>([]);
  const [selectedEdition, setSelectedEdition] = useState('en.sahih');
  const [showSelector, setShowSelector] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);

  useEffect(() => {
    getTranslationEditions().then(setEditions);
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getSurahDetail(parseInt(id), selectedEdition).then(data => {
        setAyahs(data.ayahs);
        setSurah(data.surah);
        setLoading(false);
      });
    }
  }, [id, selectedEdition]);

  if (loading && ayahs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-[#5A5A40] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="p-2 hover:bg-[#5A5A40]/5 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#5A5A40]" />
        </Link>
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-[#5A5A40]">{surah?.englishName}</h2>
          <p className="text-[10px] uppercase font-bold tracking-widest text-[#5A5A40]/40">
            {surah?.englishNameTranslation}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setShowTranslation(!showTranslation)}
            className={`p-2 rounded-full transition-colors ${!showTranslation ? 'bg-[#5A5A40] text-white' : 'hover:bg-[#5A5A40]/5 text-[#5A5A40]'}`}
            title={showTranslation ? "Hide Translation" : "Show Translation"}
          >
            {showTranslation ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
          </button>
          <button 
            onClick={() => setShowSelector(!showSelector)}
            className={`p-2 rounded-full transition-colors ${showSelector ? 'bg-[#5A5A40] text-white' : 'hover:bg-[#5A5A40]/5 text-[#5A5A40]'}`}
          >
            <Languages className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Language Selector */}
      {showSelector && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 rounded-2xl border border-[#5A5A40]/10 shadow-lg space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#5A5A40]/60">Select Translation</h3>
            <button onClick={() => setShowSelector(false)} className="text-[10px] font-bold text-[#5A5A40]">Close</button>
          </div>
          <div className="max-h-48 overflow-y-auto space-y-1 no-scrollbar">
            {editions.map(edition => (
              <button
                key={edition.identifier}
                onClick={() => {
                  setSelectedEdition(edition.identifier);
                  setShowSelector(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedEdition === edition.identifier 
                    ? 'bg-[#5A5A40] text-white' 
                    : 'hover:bg-[#f5f5f0] text-[#5A5A40]'
                }`}
              >
                <div className="font-bold">{edition.name}</div>
                <div className="text-[10px] opacity-60 uppercase">{edition.language}</div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Bismillah (except for Surah At-Tawbah) */}
      {id !== '9' && (
        <div className="text-center py-8">
          <p className="font-serif text-3xl text-[#5A5A40]">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        </div>
      )}

      {/* Ayahs */}
      <div className="space-y-8">
        {ayahs.map((ayah, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            key={ayah.number} 
            className="group bg-white p-6 rounded-[32px] border border-[#5A5A40]/5 hover:border-[#5A5A40]/10 transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-8 h-8 bg-[#f5f5f0] rounded-lg flex items-center justify-center font-serif text-sm font-bold text-[#5A5A40]">
                {ayah.numberInSurah}
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-[#5A5A40]/40 hover:text-[#5A5A40] transition-colors">
                  <Play className="w-4 h-4" />
                </button>
                <button className="p-2 text-[#5A5A40]/40 hover:text-[#5A5A40] transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="p-2 text-[#5A5A40]/40 hover:text-[#5A5A40] transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-right mb-6">
              <p className="font-serif text-3xl leading-[2.5] text-[#1a1a1a] dir-rtl">
                {ayah.text}
              </p>
            </div>

            {showTranslation && (
              <div className="space-y-4 pt-4 border-t border-[#5A5A40]/5">
                <p className="text-sm text-[#5A5A40]/80 leading-relaxed font-medium">
                  {ayah.translation}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

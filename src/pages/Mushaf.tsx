import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { getPage } from '../services/quranService';
import { Ayah } from '../types';

export const Mushaf: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setLoading(true);
    getPage(pageNumber).then(data => {
      setAyahs(data.ayahs);
      setLoading(false);
    });
  }, [pageNumber]);

  const nextPage = () => {
    if (pageNumber < 604) {
      setDirection(1);
      setPageNumber(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setDirection(-1);
      setPageNumber(prev => prev - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="space-y-8 min-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#5A5A40] rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="text-white w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-[#5A5A40]">Holy Quran</h2>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#5A5A40]/40">Page {pageNumber} of 604</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={prevPage}
            disabled={pageNumber === 1}
            className="p-3 bg-white rounded-xl border border-[#5A5A40]/10 text-[#5A5A40] disabled:opacity-30 hover:bg-[#f5f5f0] transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextPage}
            disabled={pageNumber === 604}
            className="p-3 bg-white rounded-xl border border-[#5A5A40]/10 text-[#5A5A40] disabled:opacity-30 hover:bg-[#f5f5f0] transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 relative overflow-hidden bg-[#fffcf5] rounded-[40px] border-8 border-[#5A5A40]/10 shadow-2xl p-8 md:p-12 m-2">
        {/* Page Texture/Shadow */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
        
        <AnimatePresence initial={false} custom={direction}>
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#5A5A40] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <motion.div
              key={pageNumber}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 p-8 md:p-12 overflow-y-auto no-scrollbar"
            >
              <div className="text-right space-y-8">
                <p className="font-serif text-3xl md:text-4xl leading-[2.5] text-[#1a1a1a] dir-rtl text-justify">
                  {ayahs.map((ayah) => (
                    <span key={ayah.number} className="inline">
                      {ayah.text}
                      <span className="inline-flex items-center justify-center w-8 h-8 mx-2 bg-[#f5f5f0] rounded-full text-xs font-bold text-[#5A5A40] align-middle">
                        {ayah.numberInSurah}
                      </span>
                    </span>
                  ))}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-center gap-4 py-4">
        <input 
          type="range" 
          min="1" 
          max="604" 
          value={pageNumber}
          onChange={(e) => setPageNumber(parseInt(e.target.value))}
          className="w-full max-w-xs accent-[#5A5A40]"
        />
      </div>
    </div>
  );
};

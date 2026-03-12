import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Headphones } from 'lucide-react';
import { getSurahs, getQaris } from '../services/quranService';
import { Surah, Edition } from '../types';

export const Listen: React.FC = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [qaris, setQaris] = useState<Edition[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [selectedQari, setSelectedQari] = useState('ar.alafasy');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    getSurahs().then(setSurahs);
    getQaris().then(setQaris);
  }, []);

  const playSurah = (surahNumber: number) => {
    if (audio) {
      audio.pause();
    }
    
    const newAudio = new Audio(`https://cdn.islamic.network/quran/audio-surah/128/${selectedQari}/${surahNumber}.mp3`);
    newAudio.play();
    setAudio(newAudio);
    setSelectedSurah(surahNumber);
    setIsPlaying(true);

    newAudio.onended = () => setIsPlaying(false);
  };

  const togglePlay = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-serif text-3xl font-bold text-[#5A5A40]">Listen Quran</h2>
        <p className="text-[#5A5A40]/40 text-sm">Choose a Surah and Qari to listen</p>
      </div>

      {/* Qari Selection */}
      <div className="bg-white p-6 rounded-3xl border border-[#5A5A40]/5">
        <label className="text-[10px] uppercase font-bold tracking-widest text-[#5A5A40]/40 mb-2 block">Select Qari</label>
        <select 
          value={selectedQari}
          onChange={(e) => setSelectedQari(e.target.value)}
          className="w-full bg-[#f5f5f0] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#5A5A40]/20 font-medium text-[#5A5A40]"
        >
          {qaris.slice(0, 20).map(qari => (
            <option key={qari.identifier} value={qari.identifier}>{qari.englishName}</option>
          ))}
        </select>
      </div>

      {/* Surah List */}
      <div className="grid grid-cols-1 gap-4">
        {surahs.map((surah) => (
          <div 
            key={surah.number}
            onClick={() => playSurah(surah.number)}
            className={`group p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              selectedSurah === surah.number 
                ? 'bg-[#5A5A40] border-[#5A5A40] text-white' 
                : 'bg-white border-[#5A5A40]/5 hover:border-[#5A5A40]/20 text-[#5A5A40]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-serif font-bold ${
                selectedSurah === surah.number ? 'bg-white/20' : 'bg-[#f5f5f0]'
              }`}>
                {surah.number}
              </div>
              <div>
                <h4 className="font-bold">{surah.englishName}</h4>
                <p className={`text-[10px] uppercase tracking-widest font-bold ${
                  selectedSurah === surah.number ? 'text-white/60' : 'text-[#5A5A40]/40'
                }`}>
                  {surah.numberOfAyahs} Ayahs
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-serif text-xl">{surah.name}</p>
              {selectedSurah === surah.number && isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className={`w-5 h-5 ${selectedSurah === surah.number ? 'text-white' : 'text-[#5A5A40]/20'}`} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Player */}
      {selectedSurah && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-24 left-4 right-4 bg-[#5A5A40] text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between z-40"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm">{surahs.find(s => s.number === selectedSurah)?.englishName}</h4>
              <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Playing Now</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={togglePlay} className="w-12 h-12 bg-white text-[#5A5A40] rounded-full flex items-center justify-center shadow-lg">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

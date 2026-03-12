import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Plus } from 'lucide-react';

export const Tasbeeh: React.FC = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [phrase, setPhrase] = useState('SubhanAllah');

  const phrases = ['SubhanAllah', 'Alhamdulillah', 'Allahu Akbar', 'Astaghfirullah'];

  return (
    <div className="space-y-12 flex flex-col items-center">
      <div className="text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#5A5A40]">Digital Tasbeeh</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {phrases.map(p => (
            <button
              key={p}
              onClick={() => { setPhrase(p); setCount(0); }}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap ${
                phrase === p ? 'bg-[#5A5A40] text-white' : 'bg-white text-[#5A5A40]/40 border border-[#5A5A40]/10'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Progress Circle */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="#5A5A40"
            strokeWidth="8"
            strokeOpacity="0.1"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="#5A5A40"
            strokeWidth="8"
            strokeDasharray="754"
            animate={{ strokeDashoffset: 754 - (754 * (count % target)) / target }}
            transition={{ type: 'spring', stiffness: 50 }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-serif font-bold text-[#5A5A40]">{count}</span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#5A5A40]/40 mt-2">
            Target: {target}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <button 
          onClick={() => setCount(0)}
          className="w-16 h-16 bg-white border border-[#5A5A40]/10 rounded-full flex items-center justify-center text-[#5A5A40]/40 hover:text-[#5A5A40] transition-all"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
        
        <button 
          onClick={() => setCount(prev => prev + 1)}
          className="w-32 h-32 bg-[#5A5A40] rounded-full flex items-center justify-center text-white shadow-2xl active:scale-95 transition-all"
        >
          <Plus className="w-12 h-12" />
        </button>

        <button 
          onClick={() => setTarget(target === 33 ? 100 : 33)}
          className="w-16 h-16 bg-white border border-[#5A5A40]/10 rounded-full flex items-center justify-center text-[#5A5A40]/40 hover:text-[#5A5A40] transition-all font-bold text-xs"
        >
          {target}
        </button>
      </div>
    </div>
  );
};

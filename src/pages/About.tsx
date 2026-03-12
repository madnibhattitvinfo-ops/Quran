import React from 'react';
import { motion } from 'motion/react';
import { Info, Heart, Shield, Star } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-[#5A5A40] rounded-[24px] flex items-center justify-center mx-auto shadow-xl">
          <Info className="text-white w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#5A5A40]">About Al-Quran App</h2>
        <p className="text-[#5A5A40]/60 max-w-xs mx-auto">A professional Islamic application designed for spiritual growth and Quranic learning.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[32px] border border-[#5A5A40]/5 space-y-4"
        >
          <div className="flex items-center gap-3 text-[#5A5A40]">
            <Heart className="w-6 h-6" />
            <h3 className="font-bold text-xl">Our Mission</h3>
          </div>
          <p className="text-[#5A5A40]/80 leading-relaxed">
            Our mission is to make the holy words of Allah accessible to everyone, everywhere. We strive to provide a clean, distraction-free environment for reading and listening to the Quran.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-[32px] border border-[#5A5A40]/5 space-y-4"
        >
          <div className="flex items-center gap-3 text-[#5A5A40]">
            <Shield className="w-6 h-6" />
            <h3 className="font-bold text-xl">Privacy & Trust</h3>
          </div>
          <p className="text-[#5A5A40]/80 leading-relaxed">
            Your spiritual journey is private. We do not sell your data or track your activity for commercial purposes. Your bookmarks and preferences are stored securely in your personal account.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-[32px] border border-[#5A5A40]/5 space-y-4"
        >
          <div className="flex items-center gap-3 text-[#5A5A40]">
            <Star className="w-6 h-6" />
            <h3 className="font-bold text-xl">Features</h3>
          </div>
          <ul className="space-y-3 text-[#5A5A40]/80">
            <li className="flex items-center gap-2">• 114 Surahs with multiple translations</li>
            <li className="flex items-center gap-2">• High-quality audio from world-renowned Qaris</li>
            <li className="flex items-center gap-2">• Accurate prayer times and Qibla finder</li>
            <li className="flex items-center gap-2">• Digital Tasbeeh counter</li>
          </ul>
        </motion.div>
      </div>

      <div className="text-center pt-8 border-t border-[#5A5A40]/10">
        <p className="text-[10px] uppercase font-bold tracking-widest text-[#5A5A40]/40">Version 1.0.0</p>
        <p className="text-[#5A5A40]/60 mt-2">Developed with ❤️ for the Ummah</p>
      </div>
    </div>
  );
};

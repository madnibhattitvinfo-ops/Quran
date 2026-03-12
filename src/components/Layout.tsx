import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Headphones, Clock, Compass, Hash, Settings, User, Home, Info } from 'lucide-react';
import { cn } from '../utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Book, label: 'Read', path: '/read' },
  { icon: Headphones, label: 'Listen', path: '/listen' },
  { icon: Clock, label: 'Prayer', path: '/prayer' },
  { icon: Hash, label: 'Tasbeeh', path: '/tasbeeh' },
  { icon: Compass, label: 'Qibla', path: '/qibla' },
  { icon: Info, label: 'About', path: '/about' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#1a1a1a] font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#5A5A40]/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#5A5A40] rounded-lg flex items-center justify-center">
            <Book className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-serif font-bold text-[#5A5A40]">Al-Quran</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#5A5A40]/5 rounded-full transition-colors">
            <User className="w-5 h-5 text-[#5A5A40]" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-24 max-w-4xl mx-auto px-4 pt-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#5A5A40]/10 px-4 py-2 flex justify-around items-center z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 p-2 transition-all",
                isActive ? "text-[#5A5A40]" : "text-[#5A5A40]/40 hover:text-[#5A5A40]/60"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "scale-110")} />
              <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 bg-[#5A5A40] rounded-full mt-1" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

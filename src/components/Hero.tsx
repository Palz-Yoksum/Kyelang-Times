import React from 'react';
import { Flame, ShowerHead, MountainSnow } from 'lucide-react';

interface HeroProps {
  onOpenWhatsApp?: (prompt?: string) => void;
  onQuickBookSelect?: (roomType: string) => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-white text-[#500000] overflow-hidden border-b border-[#500000]/10">
      {/* Hero Visual Container */}
      <div className="relative min-h-[75vh] sm:min-h-[82vh] flex items-center justify-center">
        {/* Serene Himalayan Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Keylong Himalayan Glaciers and Valley"
            className="w-full h-full object-cover object-center brightness-95 contrast-105 transition-all duration-700"
          />
          {/* Gentle Translucent Scrim to Keep Mountain Details Bright & Text Legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/55" />
        </div>

        {/* Clean, Well-Spaced Hero Core */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 pt-24 pb-20 sm:pt-32 sm:pb-24 text-center text-white">
          {/* Primary Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            The Dragon Heritage Home.
          </h1>

          {/* Subheadline */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-stone-100 font-normal leading-relaxed mb-10 font-sans tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            A humble homestay, proudly rooted in the rich Buddhist cultural heritage of the Drukpa Lineage — (The Dragon Lineage).
          </p>

          {/* Clean Minimal CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('rooms')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#500000] hover:bg-[#3B0000] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md cursor-pointer border border-white/30"
            >
              Explore Rooms
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-[0.2em] font-semibold backdrop-blur-md transition-all border border-white/25 cursor-pointer"
            >
              The Heritage Story
            </button>
          </div>

          {/* 3 Core Mountain Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-14 pt-8 border-t border-white/15 text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
                <Flame className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-white block">Heated Mattresses</span>
                <span className="text-stone-300 text-[11px]">In both private rooms</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
                <ShowerHead className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-white block">24/7 Hot Showers</span>
                <span className="text-stone-300 text-[11px]">Instant geysers</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
                <MountainSnow className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-white block">Glacier Panoramas</span>
                <span className="text-stone-300 text-[11px]">Top-floor chill terrace</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

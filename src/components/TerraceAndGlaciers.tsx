import React from 'react';
import { MountainSnow, Sun, Moon, Coffee } from 'lucide-react';

interface TerraceProps {
  onOpenWhatsApp?: (message: string) => void;
}

export const TerraceAndGlaciers: React.FC<TerraceProps> = () => {
  return (
    <section id="terrace" className="py-20 sm:py-28 bg-white text-stone-800 border-b border-[#500000]/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header with well-thought headlines */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs uppercase tracking-[0.25em] text-[#500000] font-semibold block mb-3">
            Rooftop & Panorama
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
            The Sanakdeik Peak Glacier Terrace.
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            All guest accommodations sit on the coveted top floor. Step directly onto our open rooftop terrace overlooking the high ridges of the Lahaul Himalayas and ancient Kardang Monastery.
          </p>
        </div>

        {/* 2-Column Minimalist Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Visual Image */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#500000]/20">
              <img
                src="/images/gallery/sanakdeik_peak.jpg"
                alt="Sanakdeik Jot Peak View"
                className="w-full h-80 sm:h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white font-semibold block mb-1">
                  6,000-Meter Glacial Ridges
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                  Direct Line of Sight to Sanakdeik Peak
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 font-light leading-relaxed">
                  A serene vantage point above the valley, illuminated by golden dawn and crystal clear starlight.
                </p>
              </div>
            </div>
          </div>

          {/* Moments on the Terrace */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-[#500000]/20 shadow-2xs">
              <div className="flex items-center gap-3 mb-2">
                <Sun className="w-5 h-5 text-[#500000]" />
                <h4 className="font-serif text-lg font-bold text-stone-900">Sunrise Mountain Chai</h4>
              </div>
              <p className="text-stone-600 text-sm font-light leading-relaxed">
                Watch early morning mountain sunlight strike the snow peaks while enjoying fresh ginger chai or salted Tibetan butter tea in crisp 3,000m air.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#500000]/20 shadow-2xs">
              <div className="flex items-center gap-3 mb-2">
                <Coffee className="w-5 h-5 text-[#500000]" />
                <h4 className="font-serif text-lg font-bold text-stone-900">Rooftop Chill Haven</h4>
              </div>
              <p className="text-stone-600 text-sm font-light leading-relaxed">
                Quiet seating where travelers, trekkers, and riders unlace their boots, read, write journals, and exchange route notes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#500000]/20 shadow-2xs">
              <div className="flex items-center gap-3 mb-2">
                <Moon className="w-5 h-5 text-[#500000]" />
                <h4 className="font-serif text-lg font-bold text-stone-900">Milky Way Stargazing</h4>
              </div>
              <p className="text-stone-600 text-sm font-light leading-relaxed">
                Zero light pollution reveals the dense galactic core arching over snow-capped ridges on clear Himalayan nights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

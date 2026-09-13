import React from 'react';
import { TibetanDragonIcon } from './TibetanIcons';
import { MapPin, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AboutHomestay: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white text-stone-800 border-b border-[#500000]/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header with well-thought headlines */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs uppercase tracking-[0.25em] text-[#500000] font-semibold block mb-3">
            Heritage & Mountain Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight mb-6">
            Adding The Dragon Luck in your travel life.
          </h2>
          <div className="space-y-4 text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            <p>
              Perched at 3,000 meters in the historic village of Keylong, Kyelang Times—once home to a tribal family for generations—now welcomes guests to experience the authentic rhythm of village life without compromising on comfort.
            </p>
            <p>
              Facing the sacred Mount Dril-bu, a mountain of deep Buddhist significance, our home is surrounded by the timeless beauty, spirituality, and cultural heritage of the Himalayas.
            </p>
            <p>
              Rooted in the traditions of the Tribal Himalayas, Kyelang Times invites you to slow down, live like a local, and immerse yourself in the stories, culture, and enduring spirit of this ancient mountain land.
            </p>
          </div>
        </div>

        {/* 2-Column Balanced Narrative & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Clean 4 Key Aspects Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-400 font-medium block mb-1">
                  Elevation
                </span>
                <span className="font-serif text-xl font-bold text-[#500000] block">
                  3,000 Meters
                </span>
                <span className="text-xs text-stone-500">Ideal acclimatization stop</span>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-stone-400 font-medium block mb-1">
                  Location
                </span>
                <span className="font-serif text-xl font-bold text-[#500000] block">
                  Village Heart
                </span>
                <span className="text-xs text-stone-500">Away from highway transit</span>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-stone-400 font-medium block mb-1">
                  Sub-Zero Heating
                </span>
                <span className="font-serif text-xl font-bold text-[#500000] block">
                  Electric Beds
                </span>
                <span className="text-xs text-stone-500">Heated mattresses & dorm blankets</span>
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider text-stone-400 font-medium block mb-1">
                  Panorama
                </span>
                <span className="font-serif text-lg sm:text-xl font-bold text-[#500000] block leading-snug">
                  Sanakdeik Jot Peak ( 6,045 mtrs)
                </span>
                <span className="text-xs text-stone-500">Top-floor glacier views</span>
              </div>
            </div>

            {/* Minimal Quote */}
            <div className="p-6 rounded-2xl bg-white border border-[#500000]/20 flex items-start gap-4">
              <TibetanDragonIcon className="w-8 h-8 text-[#500000] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif italic text-stone-700 text-sm leading-relaxed">
                  "May all who step across our threshold find warmth from high-altitude winds, cozy homestay hospitality, and peaceful contemplation from the eternal glaciers."
                </p>
                <span className="text-[11px] text-stone-500 uppercase tracking-wider block mt-2 font-sans font-medium">
                  — Kyelang Times Host Family
                </span>
              </div>
            </div>
          </div>

          {/* Right Serene Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#500000]/20">
              <img
                src="/images/our-story.jpg"
                alt="Tibetan Dragon Heritage Homestay Story"
                className="w-full h-[460px] object-cover object-center"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                <span className="text-xs uppercase tracking-[0.2em] text-white font-medium block">
                  Dragon Painted Boutique Rooms
                </span>
                <span className="text-sm font-light text-stone-200">
                  Hand-painted dragon artwork inspired by centuries of Lahauli heritage.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { HOTEL_INFO, TRAVEL_TIPS } from '../data/hotelData';
import { MapPin, Compass, Phone, Clock } from 'lucide-react';

interface LocationGuideProps {
  onOpenWhatsApp?: (message: string) => void;
}

export const LocationGuide: React.FC<LocationGuideProps> = () => {
  return (
    <section id="location" className="py-20 sm:py-28 bg-white text-stone-800 border-b border-[#500000]/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header with well-thought headlines */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs uppercase tracking-[0.25em] text-[#500000] font-semibold block mb-3">
            Geography & Arrival
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
            In the Quiet Heart of Keylong Village.
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Positioned within historic Keylong away from highway transit dust. Surrounded by willow groves, ancient stone alleys, and trans-Himalayan mountain quiet.
          </p>
        </div>

        {/* 2-Column Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Homestay Coordinates & Logistics */}
          <div className="lg:col-span-5 bg-white p-7 sm:p-8 rounded-2xl border border-[#500000]/20 shadow-2xs space-y-6">
            <div className="flex items-start gap-3.5 pb-6 border-b border-stone-100">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#500000]/20 flex items-center justify-center shrink-0 text-[#500000]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Kyelang Times
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Keylong Village, Lahaul & Spiti, Himachal Pradesh · 175132
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Compass className="w-4 h-4 text-[#500000] shrink-0 mt-1" />
                <div>
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-medium">Altitude & Coordinates</span>
                  <span className="text-stone-800 font-medium">{HOTEL_INFO.altitude} · {HOTEL_INFO.coordinates}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#500000] shrink-0 mt-1" />
                <div>
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-medium">Host Contact</span>
                  <a
                    href={`tel:${HOTEL_INFO.phone}`}
                    className="text-stone-800 font-medium hover:text-[#500000] transition-colors"
                  >
                    {HOTEL_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#500000] shrink-0 mt-1" />
                <div>
                  <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-medium">Check-In</span>
                  <span className="text-stone-600 text-xs">Flexible 12:00 PM / Check-out 10:00 AM (Adapted to pass openings)</span>
                </div>
              </div>
            </div>

            {/* Road Distances */}
            <div className="pt-6 border-t border-stone-100">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-3">
                Scenic Travel Times
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-[#500000]/20">
                  <span className="text-stone-500 block text-[10px]">Manali (Atal Tunnel)</span>
                  <strong className="text-stone-900">72 km · 2.5 hrs</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#500000]/20">
                  <span className="text-stone-500 block text-[10px]">Jispa / Darcha</span>
                  <strong className="text-stone-900">22 km · 45 mins</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#500000]/20">
                  <span className="text-stone-500 block text-[10px]">Baralacha La Pass</span>
                  <strong className="text-stone-900">73 km · 2.5 hrs</strong>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#500000]/20">
                  <span className="text-stone-500 block text-[10px]">Keylong Bus Stand</span>
                  <strong className="text-stone-900">5-min walk</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right: High-Altitude Acclimatization Guidance */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6">
              Essential High-Pass Travel Advice
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TRAVEL_TIPS.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-[#500000]/20 shadow-2xs"
                >
                  <h4 className="font-serif text-base font-bold text-stone-900 mb-2">
                    {tip.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                    {tip.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Note for travelers */}
            <div className="p-5 rounded-2xl bg-white border border-[#500000]/20 flex items-center justify-between mt-4">
              <p className="text-xs text-stone-600 font-light">
                Need current pass weather or road clearance status for Rohtang or Baralacha La? Drop a message to our hosts using the chat button at the bottom right.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

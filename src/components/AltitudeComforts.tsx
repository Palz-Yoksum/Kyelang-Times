import React from 'react';
import { Flame, ShowerHead, MountainSnow, Wifi, Utensils, ShieldCheck, Heart } from 'lucide-react';

export const AltitudeComforts: React.FC = () => {
  const comforts = [
    {
      icon: <Flame className="w-5 h-5 text-[#500000]" />,
      title: 'Heated Mattresses & Blankets',
      subtitle: 'Sub-Zero Bed Warmth',
      description: 'Dual-control electric heated mattresses in private rooms and individual electric blankets on all 8 dorm beds for cozy sleep.'
    },
    {
      icon: <ShowerHead className="w-5 h-5 text-[#500000]" />,
      title: '24/7 Geyser Hot Showers',
      subtitle: 'Piping Hot Water',
      description: 'Instant geysers providing steaming hot water in private attached baths and in the 2 dedicated shared washrooms for the dorm.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#500000]" />,
      title: 'Cleanliness As Top Priority',
      subtitle: 'Spotless & Sanitized Daily',
      description: 'Fresh crisp linens, immaculate bedrooms, and meticulously sanitized washrooms maintained to the highest hygiene standards.'
    },
    {
      icon: <MountainSnow className="w-5 h-5 text-[#500000]" />,
      title: 'Glacier Panoramas',
      subtitle: 'Top-Floor Terrace',
      description: 'Unimpeded open-air viewing of the Sanakdeik Peak glacier and surrounding 6,000m peaks from our open chill deck.'
    },
    {
      icon: <Utensils className="w-5 h-5 text-[#500000]" />,
      title: 'Himalayan Home Kitchen',
      subtitle: 'Fresh Local Homestay Meals',
      description: 'Steaming Tibetan momos, hot thukpa soup, butter tea, and hearty North Indian food cooked fresh to order.'
    },
    {
      icon: <Wifi className="w-5 h-5 text-[#500000]" />,
      title: 'High-Speed Fiber Wi-Fi',
      subtitle: 'Stay Connected in Keylong',
      description: 'Reliable fiber broadband for travelers, motorcyclists, and remote workers needing map and road updates.'
    }
  ];

  return (
    <section id="comforts" className="py-20 sm:py-28 bg-white text-stone-800 border-b border-[#500000]/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header with well-thought headlines */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs uppercase tracking-[0.25em] text-[#500000] font-semibold block mb-3">
            High-Altitude Care & Homestay Hospitality
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
            Cozy Vibes & Cleanliness at 3,000 Meters.
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            High altitude living at 3,000 meters in Lahaul demands uncompromising warmth and hygiene. We provide individual electric mattress heating and blankets, steaming hot geysers, and authentic homestay care.
          </p>
        </div>

        {/* Minimalist 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {comforts.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#500000]/20 shadow-2xs hover:border-[#500000]/50 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-[#500000]/20 flex items-center justify-center mb-5">
                {item.icon}
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 block mb-1">
                {item.subtitle}
              </span>

              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                {item.title}
              </h3>

              <p className="text-stone-600 text-sm font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Minimal Reassurance Note */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-[#500000]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-[#500000] shrink-0" />
            <p className="text-xs sm:text-sm text-stone-600 font-light">
              <strong className="font-semibold text-stone-900">Trans-Himalayan Acclimatization:</strong> Our hosts provide warm ginger lemon honey water and genuine road condition advice for Baralacha La, Shinku La, and Leh.
            </p>
          </div>
          <span className="text-xs uppercase tracking-wider text-[#500000] font-semibold shrink-0">
            Keylong 3,000m
          </span>
        </div>
      </div>
    </section>
  );
};

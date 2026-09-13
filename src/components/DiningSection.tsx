import React from 'react';

interface DiningProps {
  onOpenWhatsApp?: (message: string) => void;
}

export const DiningSection: React.FC<DiningProps> = () => {
  return (
    <section id="dining" className="py-16 sm:py-24 bg-white text-stone-800 border-b border-[#500000]/10">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <p className="text-center text-lg sm:text-2xl text-stone-800 font-serif leading-relaxed max-w-3xl mx-auto mb-10">
          We have an in-house restaurant which serves simple Indian and traditional food of Lahaul.
        </p>

        {/* 2 Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="overflow-hidden rounded-2xl border border-[#500000]/20 shadow-xs aspect-[4/3] bg-stone-100 group">
            <img
              src="/images/gallery/food_gallery_1.jpg"
              alt="Traditional steamed Tibetan momos and food"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#500000]/20 shadow-xs aspect-[4/3] bg-stone-100 group">
            <img
              src="/images/gallery/food_gallery_2.jpg"
              alt="Simple Indian and traditional food of Lahaul"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};


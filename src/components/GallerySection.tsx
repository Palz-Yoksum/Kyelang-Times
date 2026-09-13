import React, { useState, useEffect } from 'react';
import { usePhotos } from '../context/PhotoContext';
import { Maximize2, X, ChevronLeft, ChevronRight, UploadCloud, Layers } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { galleryPhotos, openManager } = usePhotos();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'dragon-room-1', label: 'Dragon Room 1' },
    { id: 'dragon-room-2', label: 'Dragon Room 2' },
    { id: 'hostel-dorm', label: 'Hostel Dorm Room' },
    { id: 'glaciers', label: 'Glaciers & Terrace' },
    { id: 'dining', label: 'Kitchen & Dining' },
    { id: 'buddhist-art', label: 'Dragon Art & Culture' },
    { id: 'keylong', label: 'Keylong Village' }
  ];

  const filteredPhotos = galleryPhotos.filter(photo => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'dragon-room-1') {
      return photo.category === 'dragon-room-1' || photo.title.toLowerCase().includes('room 1');
    }
    if (activeCategory === 'dragon-room-2') {
      return photo.category === 'dragon-room-2' || photo.title.toLowerCase().includes('room 2');
    }
    if (activeCategory === 'hostel-dorm') {
      return photo.category === 'hostel-dorm' || photo.title.toLowerCase().includes('dorm');
    }
    return photo.category === activeCategory;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos]);

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
  };

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const currentModalPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-white text-stone-800 border-b border-[#500000]/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header with well-thought headlines & Photo Management CTAs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-[#500000] font-semibold block mb-3">
              Visual Archive
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
              Life at 3,000 Meters in Keylong.
            </h2>
            <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
              Glacier vistas, dragon painted rooms, hostel dorm beds with electric blankets, and the quiet rhythm of Keylong village.
            </p>
          </div>
        </div>

        {/* Minimalist Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedPhotoIndex(null);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#500000] text-white shadow-2xs'
                    : 'bg-white border border-[#500000]/20 text-stone-700 hover:border-[#500000] hover:text-[#500000]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-stone-950 border border-[#500000]/20 shadow-2xs hover:shadow-md cursor-pointer transition-all duration-300"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-white font-semibold mb-1">
                  {photo.categoryLabel}
                </span>
                <h3 className="font-serif text-sm font-bold text-white mb-0.5">
                  {photo.title}
                </h3>
                <p className="text-[11px] text-stone-200 line-clamp-1 font-light">
                  {photo.caption}
                </p>
              </div>

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-7 h-7 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {currentModalPhoto && selectedPhotoIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentModalPhoto.src}
                alt={currentModalPhoto.title}
                className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="mt-4 text-center text-white">
                <h4 className="font-serif text-lg font-bold">
                  {currentModalPhoto.title}
                </h4>
                <p className="text-xs text-stone-300 mt-1 max-w-md mx-auto font-light">
                  {currentModalPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

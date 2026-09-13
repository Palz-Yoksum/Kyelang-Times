import React, { useState } from 'react';
import { ROOMS } from '../data/hotelData';
import { usePhotos } from '../context/PhotoContext';
import { Flame, ShowerHead, Wifi, Check, Bed, Users, Camera } from 'lucide-react';

interface RoomsSectionProps {
  onOpenWhatsApp: (message: string) => void;
  selectedRoomHighlight?: string | null;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  onOpenWhatsApp,
  selectedRoomHighlight
}) => {
  const { roomImages, openManager } = usePhotos();
  const [selectedImageIndex, setSelectedImageIndex] = useState<{ [roomId: string]: number }>({});
  const [activeFilter, setActiveFilter] = useState<'all' | 'private' | 'dorm'>('all');

  const handleImageSelect = (roomId: string, index: number) => {
    setSelectedImageIndex(prev => ({ ...prev, [roomId]: index }));
  };

  const filteredRooms = ROOMS.filter((room) => {
    if (activeFilter === 'private') return room.category === 'dragon_boutique';
    if (activeFilter === 'dorm') return room.category === 'hostel_dorm';
    return true;
  });

  return (
    <section id="rooms" className="py-20 sm:py-28 bg-white text-stone-800 border-b border-[#500000]/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header with well-thought headlines */}
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-xs uppercase tracking-[0.25em] text-[#500000] font-semibold block mb-3">
            Accommodations · Homestay
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
            Dragon Private Rooms & Hostel Dorm.
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            We are an authentic family-run homestay with dragon cultural hospitality, cozy vibes, and cleanliness as our top priority. All rooms and dorm beds are positioned on our top floor with glacier vistas, sub-zero thermal bed warmth, and 24/7 piping hot showers.
          </p>

          {/* Clean Accommodation Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-8">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#500000] text-white shadow-2xs'
                  : 'bg-white border border-[#500000]/20 text-stone-700 hover:border-[#500000] hover:text-[#500000]'
              }`}
            >
              All Accommodations ({ROOMS.length})
            </button>
            <button
              onClick={() => setActiveFilter('private')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'private'
                  ? 'bg-[#500000] text-white shadow-2xs'
                  : 'bg-white border border-[#500000]/20 text-stone-700 hover:border-[#500000] hover:text-[#500000]'
              }`}
            >
              Dragon Private Rooms (2)
            </button>
            <button
              onClick={() => setActiveFilter('dorm')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'dorm'
                  ? 'bg-[#500000] text-white shadow-2xs'
                  : 'bg-white border border-[#500000]/20 text-stone-700 hover:border-[#500000] hover:text-[#500000]'
              }`}
            >
              Hostel Dorm Room (8 Single Beds)
            </button>
          </div>
        </div>

        {/* Clean, Refined Room List */}
        <div className="space-y-12">
          {filteredRooms.map((room) => {
            const currentRoomPhotos = roomImages[room.id] || room.images;
            const currentImgIdx = Math.min(selectedImageIndex[room.id] || 0, currentRoomPhotos.length - 1);
            const activePhoto = currentRoomPhotos[currentImgIdx] || currentRoomPhotos[0];
            const isDorm = room.category === 'hostel_dorm';

            return (
              <div
                key={room.id}
                id={room.id}
                className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${
                  selectedRoomHighlight === room.id
                    ? 'border-[#500000] shadow-md ring-2 ring-[#500000]/20'
                    : 'border-[#500000]/20 shadow-xs hover:border-[#500000]/50'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Photo Column */}
                  <div className="lg:col-span-5 relative bg-stone-950 flex flex-col justify-between">
                    <div className="relative h-64 sm:h-80 lg:h-full min-h-[300px] overflow-hidden">
                      <img
                        src={activePhoto}
                        alt={room.name}
                        className="w-full h-full object-cover transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                      {room.badge && (
                        <div className="absolute top-4 left-4 bg-[#500000] text-white text-[10px] font-semibold uppercase tracking-[0.18em] px-3 py-1 rounded-full">
                          {room.badge}
                        </div>
                      )}

                      <div className="absolute bottom-4 left-4 text-white">
                        <span className="inline-block bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-medium text-stone-200">
                          {room.floor} · {room.view}
                        </span>
                      </div>
                    </div>

                    {/* Image Selector Thumbnails */}
                    <div className="p-2.5 bg-stone-950 flex items-center justify-between gap-2 border-t border-stone-800">
                      <div className="flex items-center gap-2 overflow-x-auto">
                        {currentRoomPhotos.map((imgUrl, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleImageSelect(room.id, idx)}
                            aria-label={`View photo ${idx + 1}`}
                            className={`relative h-11 w-14 rounded overflow-hidden border transition-all cursor-pointer shrink-0 ${
                              currentImgIdx === idx ? 'border-[#500000]' : 'border-transparent opacity-50 hover:opacity-100'
                            }`}
                          >
                            <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Room Details Column */}
                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      {/* Category & Pricing */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-stone-100">
                        <span className="text-[11px] font-semibold text-[#500000] uppercase tracking-wider">
                          {isDorm ? 'Hostel Backpacker Dorm' : 'Dragon Painted Boutique Room'}
                        </span>

                        <div className="text-right">
                          <span className="font-serif text-2xl font-bold text-stone-900">
                            {room.pricePerNight}
                          </span>
                          <span className="text-xs text-stone-500 ml-1">
                            {isDorm ? '/ bed / night' : '/ night'}
                          </span>
                        </div>
                      </div>

                      {/* Room Title & Short Description */}
                      <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                        {room.name}
                      </h3>

                      <p className="text-stone-600 text-sm font-light leading-relaxed mb-6">
                        {room.description}
                      </p>

                      {/* Specs */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-white border border-[#500000]/20 mb-6 text-xs">
                        <div className="flex items-center gap-2.5">
                          <Bed className="w-4 h-4 text-[#500000] shrink-0" />
                          <div>
                            <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Beds</span>
                            <span className="font-medium text-stone-800">{room.bedConfig}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <Users className="w-4 h-4 text-[#500000] shrink-0" />
                          <div>
                            <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Capacity</span>
                            <span className="font-medium text-stone-800">{room.capacity}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                          <Flame className="w-4 h-4 text-[#500000] shrink-0" />
                          <div>
                            <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Warmth</span>
                            <span className="font-medium text-stone-800">
                              {isDorm ? 'Electric Blanket / Bed' : 'Heated Mattress'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Features Checklist */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 mb-6">
                        {room.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#500000] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Amenities Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {room.amenities.map((amenity, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#500000]/20 text-stone-800 text-[11px]"
                          >
                            {(amenity.includes('Heated') || amenity.includes('Electric')) && <Flame className="w-3 h-3 text-[#500000]" />}
                            {(amenity.includes('Shower') || amenity.includes('Washroom')) && <ShowerHead className="w-3 h-3 text-[#500000]" />}
                            {amenity.includes('Wi-Fi') && <Wifi className="w-3 h-3 text-[#500000]" />}
                            <span>{amenity}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-xs text-stone-500">
                        {isDorm
                          ? '8 single beds · 2 shared washrooms with hot shower · Cleanliness priority'
                          : 'Top-floor glacier vistas · 24/7 hot geyser shower · Attached bath'}
                      </span>

                      <button
                        onClick={() =>
                          onOpenWhatsApp(
                            `Hello! I want to check dates & availability for ${room.name} (${room.pricePerNight}) at Kyelang Times Dragon Homestay.`
                          )
                        }
                        className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#500000] hover:bg-[#3B0000] text-white font-medium text-xs tracking-wider uppercase transition-colors cursor-pointer shadow-2xs"
                      >
                        Inquire Availability
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

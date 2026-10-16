import React, { useState } from 'react';
import { Sparkles, Maximize, Bed, Users, ArrowRight, Eye } from 'lucide-react';
import { Room } from '../types/hotel';
import { ROOMS } from '../data/hotelData';
import { SuiteDetailModal } from './SuiteDetailModal';

interface AccommodationsSectionProps {
  onSelectRoomForBooking: (room: Room) => void;
  currency: 'INR' | 'USD';
}

export const AccommodationsSection: React.FC<AccommodationsSectionProps> = ({
  onSelectRoomForBooking,
  currency,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalRoom, setModalRoom] = useState<Room | null>(null);

  const categories = [
    { id: 'all', label: 'All Accommodations' },
    { id: 'presidential', label: 'Presidential & Royal' },
    { id: 'heritage', label: 'Peacock Heritage' },
    { id: 'courtyard', label: 'Terrace & Garden' },
    { id: 'executive', label: 'Deluxe Palace' },
  ];

  const filteredRooms =
    selectedCategory === 'all'
      ? ROOMS
      : ROOMS.filter((room) => room.category === selectedCategory);

  return (
    <section id="suites" className="py-24 bg-[#060a12] border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-amber-400 uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ACCOMMODATIONS & SUITES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-cinzel text-white font-bold tracking-tight">
              Palatial Sanctuary in Indore
            </h2>
            <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              Crafted in homage to the royal Holkars, each chamber combines authentic Indian handcraft,
              silken peacock textures, and contemporary 5-star indulgences.
            </p>
          </div>

          {/* Interactive Filter Tabs (Buttons with click handlers per frontend-design guidelines) */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-stone-900/80 rounded-xl border border-stone-800">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-md'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Suites Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredRooms.map((room) => {
            const priceFormatted =
              currency === 'INR'
                ? `₹${room.priceINR.toLocaleString('en-IN')}`
                : `$${room.priceUSD}`;

            return (
              <div
                key={room.id}
                className="group rounded-2xl overflow-hidden bg-stone-900/50 border border-amber-500/20 hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                {/* Photo & Overlays */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Top tags (Unboxed metadata with separators) */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-amber-200">
                    <span className="px-3 py-1 bg-black/70 backdrop-blur-md rounded-md border border-amber-400/30 font-mono text-[11px] uppercase tracking-wider">
                      {room.sqFt} SQ.FT
                    </span>
                    <span className="px-3 py-1 bg-black/70 backdrop-blur-md rounded-md border border-amber-400/30 text-[11px] font-medium">
                      {room.bed}
                    </span>
                  </div>

                  {/* Bottom title lockup over photo */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[11px] text-amber-300 font-mono tracking-wider uppercase mb-1">
                      {room.category} Class
                    </div>
                    <h3 className="text-xl sm:text-2xl font-cinzel text-white font-bold group-hover:text-amber-200 transition-colors">
                      {room.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content & Features */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light mb-4 line-clamp-2">
                      {room.description}
                    </p>

                    {/* Highlights bullet points */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-stone-300">
                      {room.highlights.slice(0, 4).map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 truncate">
                          <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action row */}
                  <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] text-stone-400 uppercase tracking-wider">Starting Rate</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-cinzel font-bold text-amber-300 tabular-nums">
                          {priceFormatted}
                        </span>
                        <span className="text-[11px] text-stone-400">/ night</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModalRoom(room)}
                        className="px-3.5 py-2.5 rounded-lg border border-amber-500/30 text-amber-200 text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                        title="View suite photos and details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Suite Details</span>
                      </button>

                      <button
                        onClick={() => onSelectRoomForBooking(room)}
                        className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-xs font-bold uppercase tracking-wider hover:brightness-110 shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Reserve</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Suite Detail Modal */}
      <SuiteDetailModal
        room={modalRoom}
        onClose={() => setModalRoom(null)}
        onBook={(room) => {
          setModalRoom(null);
          onSelectRoomForBooking(room);
        }}
        currency={currency}
      />
    </section>
  );
};

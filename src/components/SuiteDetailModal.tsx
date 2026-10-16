import React, { useState } from 'react';
import { X, Check, Bed, Users, Maximize, Compass, ShieldCheck, Sparkles, Phone } from 'lucide-react';
import { Room } from '../types/hotel';

interface SuiteDetailModalProps {
  room: Room | null;
  onClose: () => void;
  onBook: (room: Room) => void;
  currency: 'INR' | 'USD';
}

export const SuiteDetailModal: React.FC<SuiteDetailModalProps> = ({
  room,
  onClose,
  onBook,
  currency,
}) => {
  if (!room) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'virtualTour'>('overview');

  const priceFormatted =
    currency === 'INR'
      ? `₹${room.priceINR.toLocaleString('en-IN')}`
      : `$${room.priceUSD}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0a101b] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#070b13]">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
              The Vrindavan Accommodations · {room.category.toUpperCase()}
            </span>
            <h2 className="text-xl sm:text-2xl font-cinzel text-white font-bold">
              {room.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Main Photo Gallery Carousel */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-stone-800">
              <img
                src={room.gallery[activeImageIdx] || room.image}
                alt={room.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/75 backdrop-blur-md rounded-md text-xs font-mono text-stone-300">
                {activeImageIdx + 1} / {room.gallery.length}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {room.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIdx === idx ? 'border-amber-400 scale-95' : 'border-stone-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Specifications Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-stone-900/60 border border-amber-500/15 text-xs">
            <div className="flex items-center gap-2.5">
              <Maximize className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-stone-400 text-[10px] uppercase tracking-wider">Suite Area</div>
                <div className="text-stone-100 font-semibold">{room.sqFt} sq.ft</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Bed className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-stone-400 text-[10px] uppercase tracking-wider">Bed Type</div>
                <div className="text-stone-100 font-semibold truncate">{room.bed}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-stone-400 text-[10px] uppercase tracking-wider">Occupancy</div>
                <div className="text-stone-100 font-semibold">{room.capacity.adults} Adults, {room.capacity.children} Child</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-stone-400 text-[10px] uppercase tracking-wider">Outlook</div>
                <div className="text-stone-100 font-semibold truncate">{room.view}</div>
              </div>
            </div>
          </div>

          {/* Interactive Tabs */}
          <div className="border-b border-stone-800 flex gap-4 text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 cursor-pointer uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'overview'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              Overview & Story
            </button>
            <button
              onClick={() => setActiveTab('amenities')}
              className={`pb-2.5 cursor-pointer uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'amenities'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              All Amenities ({room.amenities.length})
            </button>
            <button
              onClick={() => setActiveTab('virtualTour')}
              className={`pb-2.5 cursor-pointer uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'virtualTour'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              360° Virtual Preview
            </button>
          </div>

          {/* Tab Contents */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              <p>{room.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {room.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-stone-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'amenities' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300">
              {room.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-stone-900/40 border border-stone-800">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'virtualTour' && (
            <div className="p-6 rounded-xl bg-stone-900/60 border border-amber-500/20 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                <Compass className="w-6 h-6 animate-spin [animation-duration:8s]" />
              </div>
              <div className="font-cinzel text-stone-100 font-semibold text-sm">
                Interactive Panoramic Suite View
              </div>
              <p className="text-xs text-stone-400 max-w-md mx-auto">
                Simulated 360° virtual walkthrough looking out from the carved sandstone balcony overlooking the palace lotus pool and Ushaganj heritage quarter.
              </p>
              <div className="aspect-[21/9] rounded-lg overflow-hidden border border-amber-500/30 relative">
                <img
                  src={room.image}
                  alt="360 view simulation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-md text-amber-300 text-xs border border-amber-500/40 font-mono">
                    Drag / Pan Active · 360° Room Perspective
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Pricing & Direct Reserve CTA */}
        <div className="px-6 py-4 bg-[#070b13] border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-stone-400">Starting from</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-cinzel font-bold text-amber-300 tabular-nums">
                {priceFormatted}
              </span>
              <span className="text-xs text-stone-400">/ night + taxes</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onBook(room);
              }}
              className="flex-1 sm:flex-none px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-bold text-xs tracking-wider uppercase shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              Reserve This Suite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

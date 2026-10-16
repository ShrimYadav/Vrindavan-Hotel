import React, { useState } from 'react';
import { Sparkles, UtensilsCrossed, Clock, Check, Calendar, ArrowRight } from 'lucide-react';
import { DINING_VENUES } from '../data/hotelData';
import { DiningVenue } from '../types/hotel';
import { TableReservationModal } from './TableReservationModal';

export const DiningSection: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState<DiningVenue | null>(null);

  return (
    <section id="dining" className="py-24 bg-[#080d16] border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-amber-400 uppercase mb-3">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>CULINARY SANCTUARY & ROOFTOP DINING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel text-white font-bold tracking-tight">
            The Gastronomy of Malwa & CHHAT Sky Lounge
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Indore is India’s culinary capital. At The Vrindavan, dining is an art form—from our panoramic open-air rooftop CHHAT under the stars to ceremonial pure vegetarian royal thalis simmered with heirloom spices.
          </p>
        </div>

        {/* Venues Showcase */}
        <div className="space-y-16">
          {DINING_VENUES.map((venue, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={venue.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 rounded-3xl bg-stone-900/40 border border-amber-500/20 shadow-2xl`}
              >
                {/* Visual Image Column */}
                <div
                  className={`lg:col-span-7 relative rounded-2xl overflow-hidden border border-amber-500/30 ${
                    isReversed ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Top pill-free metadata */}
                  <div className="absolute top-4 left-4 p-2.5 rounded-lg bg-black/75 backdrop-blur-md border border-amber-400/30 text-xs text-amber-300 flex items-center gap-2 font-mono">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{venue.timings}</span>
                  </div>

                  {/* Bottom tagline */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-amber-300 tracking-wider uppercase font-semibold">
                      {venue.cuisine}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-cinzel text-white font-bold mt-1">
                      {venue.name}
                    </h3>
                  </div>
                </div>

                {/* Details Column */}
                <div className={`lg:col-span-5 space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="inline-block text-xs font-mono text-amber-400/80 tracking-widest uppercase">
                    Dress Code: {venue.dressCode}
                  </div>

                  <p className="text-stone-300 text-sm leading-relaxed font-light">
                    {venue.description}
                  </p>

                  {/* Signature Dishes List */}
                  <div>
                    <h4 className="text-xs font-cinzel tracking-wider uppercase text-amber-300 mb-3 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Signature Creations</span>
                    </h4>
                    <div className="space-y-2">
                      {venue.signatureDishes.map((dish, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-stone-200">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{dish}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights list */}
                  <div className="pt-2 border-t border-stone-800">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-400">
                      {venue.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-amber-400" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reserve Table CTA */}
                  <div className="pt-2">
                    <button
                      onClick={() => setSelectedVenue(venue)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition-all cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Reserve a Table</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Table Reservation Modal */}
      <TableReservationModal
        venue={selectedVenue}
        onClose={() => setSelectedVenue(null)}
      />
    </section>
  );
};

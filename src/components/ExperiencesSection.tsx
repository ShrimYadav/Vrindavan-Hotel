import React, { useState } from 'react';
import { Compass, Clock, MapPin, Check, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES } from '../data/hotelData';
import { Experience } from '../types/hotel';

export const ExperiencesSection: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [bookedState, setBookedState] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookedState(true);
  };

  return (
    <section id="experiences" className="py-24 bg-[#060a12] border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-amber-400 uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>INDORE & MALWA CONCIERGE EXCURSIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel text-white font-bold tracking-tight">
            Curated Journeys Beyond the Palace Walls
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Indore is rich with storied kingdoms, nighttime culinary magic, and sacred Jyotirlinga shrines.
            Our royal concierge arranges private luxury sedans, historian escorts, and VIP temple priority.
          </p>
        </div>

        {/* 3 Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="rounded-2xl overflow-hidden bg-stone-900/50 border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <div className="absolute top-4 left-4 p-2 rounded-lg bg-black/75 backdrop-blur-md text-[11px] font-mono text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>{exp.duration}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[11px] text-amber-300 font-mono tracking-wider uppercase mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{exp.distanceFromHotel}</span>
                  </div>
                  <h3 className="text-lg font-cinzel text-white font-bold group-hover:text-amber-200 transition-colors">
                    {exp.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-amber-200/90 font-medium mb-2 font-cormorant text-base">
                    {exp.subtitle}
                  </div>
                  <p className="text-xs text-stone-300 font-light leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-stone-800">
                    {exp.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800">
                  <button
                    onClick={() => {
                      setSelectedExp(exp);
                      setBookedState(false);
                    }}
                    className="w-full py-2.5 rounded-lg border border-amber-500/30 text-amber-300 text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Request Private Concierge Escort</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Booking Modal */}
      {selectedExp && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#0a101b] border border-amber-500/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-lg font-cinzel text-white font-bold">Concierge Excursion Request</h3>
              <button
                onClick={() => setSelectedExp(null)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {bookedState ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-cinzel text-white">Chauffeur & Itinerary Confirmed</h4>
                <p className="text-xs text-stone-300">
                  Thank you, <strong className="text-amber-300">{guestName}</strong>. Our Head Concierge has logged your private excursion to <strong>{selectedExp.title}</strong>. We will arrange your luxury sedan at the palace porch.
                </p>
                <button
                  onClick={() => setSelectedExp(null)}
                  className="mt-2 px-5 py-2 rounded-lg bg-amber-500 text-stone-950 text-xs font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4 pt-4">
                <div className="p-3 bg-stone-900 rounded-lg border border-amber-500/20 text-xs text-amber-200">
                  <div className="font-semibold text-white">{selectedExp.title}</div>
                  <div className="text-[11px] text-stone-400">Duration: {selectedExp.duration} · Chauffeur Driven Luxury Fleet</div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                    Contact Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98260 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider"
                >
                  Confirm Excursion with Concierge
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

import React, { useState } from 'react';
import { Crown, Users, Maximize, Sparkles, Check, Send, CheckCircle2 } from 'lucide-react';
import { BANQUET_SPACES } from '../data/hotelData';

export const BanquetsSection: React.FC = () => {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    eventType: 'Royal Wedding Celebration',
    guestCount: '300 - 500 Guests',
    tentativeDate: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <section id="banquets" className="py-24 bg-[#060a12] border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-amber-400 uppercase mb-3">
            <Crown className="w-3.5 h-3.5" />
            <span>ROYAL WEDDINGS & CELEBRATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel text-white font-bold tracking-tight">
            Grand Celebrations in Royal Holkar Splendor
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Whether an extravagant Indian wedding pheras under the stars or a high-level summit,
            The Vrindavan delivers Taj-inspired grandeur, ceremonial royal welcomes, and legendary catering.
          </p>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {BANQUET_SPACES.map((space) => (
            <div
              key={space.id}
              className="rounded-2xl overflow-hidden bg-stone-900/50 border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={space.image}
                  alt={space.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs text-amber-300 font-mono tracking-wider uppercase mb-1">
                    {space.idealFor}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-cinzel text-white font-bold">
                    {space.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  {space.description}
                </p>

                {/* Capacity Strip */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-stone-900/90 border border-amber-500/15 text-xs text-center font-mono">
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase">Total Space</div>
                    <div className="text-amber-300 font-bold">{space.areaSqFt.toLocaleString()} sq.ft</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase">Theatre</div>
                    <div className="text-stone-200 font-semibold">{space.theatreCapacity} Guests</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-400 uppercase">Banqueting</div>
                    <div className="text-stone-200 font-semibold">{space.banquetCapacity} Guests</div>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-stone-800">
                  {space.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Wedding / Event Inquiry Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c1422] to-[#080d16] border border-amber-500/30 shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-mono text-amber-400 tracking-widest uppercase">
                Dedicated Royal Wedding Concierge
              </span>
              <h3 className="text-2xl sm:text-3xl font-cinzel text-white font-bold mt-1">
                Plan Your Unforgettable Occasion
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light">
                Our bespoke event specialists curate customized decor, pure gourmet menus, and luxury bridal suites.
              </p>
            </div>

            {inquirySubmitted ? (
              <div className="p-8 rounded-2xl bg-stone-900/80 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-cinzel text-white font-bold">
                  Inquiry Received with Royal Honor
                </h4>
                <p className="text-xs text-stone-300 max-w-md mx-auto">
                  Thank you, <strong className="text-amber-300">{formData.name}</strong>. Our Chief Banquet Director will contact you within 2 business hours with a bespoke proposal and wedding brochure.
                </p>
                <button
                  onClick={() => setInquirySubmitted(false)}
                  className="mt-3 px-5 py-2 text-xs text-amber-300 border border-amber-500/30 rounded-lg hover:bg-stone-800"
                >
                  Submit Another Event Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                      Event Nature
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    >
                      <option>Royal Wedding Celebration</option>
                      <option>Sangeet & Ring Ceremony</option>
                      <option>Corporate Annual Gala / Summit</option>
                      <option>Private Milestone Anniversary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                      Estimated Guests
                    </label>
                    <select
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    >
                      <option>50 - 150 Guests (Intimate)</option>
                      <option>150 - 300 Guests</option>
                      <option>300 - 500 Guests</option>
                      <option>500 - 900+ Guests (Grand Durbar)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                      Tentative Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.tentativeDate}
                      onChange={(e) => setFormData({ ...formData, tentativeDate: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98260 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                    Special Vision or Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about decor theme, catering preferences (Pure Veg, Malwa thali live counter), room blocks..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Request Royal Wedding / Event Brochure</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

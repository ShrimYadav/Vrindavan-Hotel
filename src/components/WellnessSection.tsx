import React, { useState } from 'react';
import { Sparkles, Waves, Clock, Check, Calendar, CheckCircle2 } from 'lucide-react';
import { ASSETS } from '../data/hotelData';

export const WellnessSection: React.FC = () => {
  const [spaModalOpen, setSpaModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState('Royal Abhyanga & Marigold Vitality Bath');
  const [spaBooked, setSpaBooked] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('11:00 AM');

  const treatments = [
    {
      title: 'Royal Abhyanga & Marigold Vitality Bath',
      duration: '90 Minutes',
      priceINR: 6500,
      priceUSD: 78,
      desc: 'Traditional synchronized four-hand herbal oil massage followed by an aromatic sunken marble petal bath with pure sandalwood oil.',
    },
    {
      title: 'Malwa Saffron & Almond Radiance Scrub',
      duration: '60 Minutes',
      priceINR: 4800,
      priceUSD: 58,
      desc: 'Exfoliation using organic Kashmiri saffron, crushed almonds, and fresh milk cream for a regal bridal glow.',
    },
    {
      title: 'Shirodhara Meditative Mind Therapy',
      duration: '75 Minutes',
      priceINR: 5200,
      priceUSD: 62,
      desc: 'A steady stream of warm herbal Brahmi oil poured rhythmically over the forehead third-eye chakra to dissolve stress and insomnia.',
    },
    {
      title: 'Heated Rooftop Poolside Hydro-Session',
      duration: '45 Minutes',
      priceINR: 2800,
      priceUSD: 34,
      desc: 'Water resistance hydrotherapy overlooking Indore skyline, followed by antioxidant herbal green tea infusions.',
    },
  ];

  const handleSpaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSpaBooked(true);
  };

  return (
    <section id="wellness" className="py-24 bg-[#080d16] border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-amber-400 uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MAYURA AYURVEDIC SANCTUARY & ROOFTOP POOL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel text-white font-bold tracking-tight">
            Restorative Wellness & Heated Infinity Water
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Surrender to ancient Indian healing wisdom. Carved sandstone pavilions, fragrant floral petal baths,
            and our temperature-regulated rooftop pool offer a sublime sanctuary above the bustling city.
          </p>
        </div>

        {/* Feature Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Visual with Floating Floral Bath */}
          <div className="lg:col-span-7 relative">
            <div className="rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl aspect-[16/10]">
              <img
                src={ASSETS.mayuraSpa}
                alt="Mayura Ayurvedic Spa Bath"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-amber-400/30 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-amber-300 tracking-wider uppercase font-medium">Mayura Vitality Sanctuary</div>
                  <div className="text-sm font-cinzel text-white">Sunken Marble Marigold & Rose Hydro-Bath</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-amber-400 font-mono">100% Ayurvedic Oils</span>
                </div>
              </div>
            </div>
          </div>

          {/* Treatments Menu */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              Signature Wellness Rituals
            </div>

            <div className="space-y-3">
              {treatments.map((t, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 transition-all cursor-pointer group"
                  onClick={() => {
                    setSelectedTreatment(t.title);
                    setSpaModalOpen(true);
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-cinzel text-stone-100 font-semibold group-hover:text-amber-300 transition-colors">
                      {t.title}
                    </h4>
                    <span className="text-xs font-mono text-amber-400">
                      ₹{t.priceINR.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-2">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{t.duration}</span>
                  </div>

                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSpaModalOpen(true)}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition-all cursor-pointer"
              >
                Book a Spa Sanctuary Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spa Booking Modal */}
      {spaModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#0a101b] border border-amber-500/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <h3 className="text-lg font-cinzel text-white font-bold">Reserve Spa Appointment</h3>
              <button
                onClick={() => {
                  setSpaModalOpen(false);
                  setSpaBooked(false);
                }}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {spaBooked ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-cinzel text-white">Appointment Confirmed</h4>
                <p className="text-xs text-stone-300">
                  Thank you, <strong className="text-amber-300">{guestName}</strong>. Your sanctuary reservation for <strong className="text-stone-100">{selectedTreatment}</strong> has been secured for {date} at {time}.
                </p>
                <button
                  onClick={() => {
                    setSpaModalOpen(false);
                    setSpaBooked(false);
                  }}
                  className="mt-2 px-5 py-2 rounded-lg bg-amber-500 text-stone-950 text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSpaSubmit} className="space-y-4 pt-4">
                <div>
                  <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                    Select Ritual
                  </label>
                  <select
                    value={selectedTreatment}
                    onChange={(e) => setSelectedTreatment(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100"
                  >
                    {treatments.map((t, i) => (
                      <option key={i} value={t.title}>
                        {t.title} ({t.duration} - ₹{t.priceINR})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                      Time Slot
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100"
                    >
                      <option>09:00 AM</option>
                      <option>11:00 AM</option>
                      <option>02:00 PM</option>
                      <option>04:30 PM</option>
                      <option>06:30 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                    Guest Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Mehra"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider"
                >
                  Confirm Spa Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

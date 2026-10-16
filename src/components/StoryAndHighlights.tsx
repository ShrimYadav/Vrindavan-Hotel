import React from 'react';
import { Crown, Moon, Sparkles, Plane, ShieldCheck, HeartHandshake } from 'lucide-react';
import { HOTEL_INFO, ASSETS } from '../data/hotelData';

export const StoryAndHighlights: React.FC = () => {
  const highlights = [
    {
      num: '01',
      title: '5-Star Heritage Architecture',
      desc: 'Hand-carved sandstone jharokhas, illuminated lotus reflecting pool, and Holkar-dynasty motifs.',
      icon: Crown,
    },
    {
      num: '02',
      title: 'CHHAT (छत) Sky Lounge',
      desc: 'Central India’s most celebrated open-sky rooftop dining overlooking the Indore city lights.',
      icon: Moon,
    },
    {
      num: '03',
      title: 'Mayura Ayurvedic Spa',
      desc: 'Restorative Abhyanga therapies, aromatic floral baths, and a heated rooftop vitality pool.',
      icon: Sparkles,
    },
    {
      num: '04',
      title: '15 Mins to Airport & Station',
      desc: 'Devi Ahilya Bai Holkar Int’l Airport (6.2 mi) and Indore Junction (1.2 mi) with luxury transfers.',
      icon: Plane,
    },
  ];

  return (
    <section className="pt-16 pb-20 bg-[#080d16] border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* 4-Column Balanced Luxury Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="p-6 rounded-xl bg-stone-900/60 border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-amber-400/70 tracking-widest">{item.num}.</span>
                  <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-cinzel font-semibold text-stone-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Palace Heritage & Story Section (Asymmetric 2-column) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Composition with Peacock & Architecture */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
              <img
                src={ASSETS.hotelExterior}
                alt="Hotel Vrindavan Palace Indore Court"
                referrerPolicy="no-referrer"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-amber-400/30 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-amber-300 tracking-wider uppercase font-medium">Legacy of Hospitality</div>
                  <div className="text-sm font-cinzel text-white">The Royal Holkar Heritage of Indore</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-amber-400 font-mono">Est. 1998</span>
                </div>
              </div>
            </div>

            {/* Overlapping Peacock Badge */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 p-4 rounded-2xl bg-[#09111c] border border-amber-400/40 shadow-2xl items-center gap-3 max-w-xs">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-amber-500/40">
                <img
                  src={ASSETS.peacockFeather}
                  alt="Peacock symbol"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs">
                <div className="font-cinzel text-amber-200 font-semibold">Peacock Sanctuary</div>
                <div className="text-stone-400 text-[11px]">Symbol of eternal beauty & purity in Vrindavan</div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-amber-400 uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE TAJ OF CENTRAL INDIA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-cinzel text-white font-bold tracking-tight leading-snug">
              A Living Tribute to Royal Malwa & Sacred Vrindavan
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              Located in Ushaganj near Indore’s legendary Rajwada Palace, <strong className="text-amber-200 font-medium">The Vrindavan Hotel & Palace</strong> was envisioned to bring the regal splendor of Rajasthan and the soulful warmth of Malwa to the heart of the city.
            </p>

            <p className="text-stone-400 text-sm leading-relaxed font-light">
              Just as the peacock feather symbolizes divinity, grace, and eternal joy, every corridor of our palace is imbued with bespoke craftsmanship: stone arches carved by master masons, 100% pure culinary discipline, and attentive butler hospitality that honours the ancient Indian proverb <span className="italic text-amber-200 font-cormorant text-lg">“Atithi Devo Bhava”</span> (The Guest is Divine).
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-stone-800">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-stone-200">100% Pure Dining</div>
                  <div className="text-[11px] text-stone-400">Strict pure vegetarian kitchen sanctity</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-stone-200">Bespoke Concierge</div>
                  <div className="text-[11px] text-stone-400">Curated Sarafa & Ujjain itineraries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

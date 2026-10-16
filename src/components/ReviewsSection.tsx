import React from 'react';
import { Star, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../data/hotelData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#060a12] border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-amber-400 uppercase mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>GUEST REVIEWS & ACCOLADES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel text-white font-bold tracking-tight">
            Voices of Royal Patronage
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Recognized among the finest palace hotels in Central India. Discover impressions from our esteemed patrons across the globe.
          </p>

          {/* Aggregate Rating Banner */}
          <div className="mt-8 inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-stone-900/90 border border-amber-500/30">
            <div className="text-3xl font-cinzel font-bold text-amber-300 tabular-nums">4.9</div>
            <div className="text-left">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">
                TripAdvisor Excellence · 1,420+ Verified Stays
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-2xl bg-stone-900/40 border border-amber-500/20 hover:border-amber-400/50 transition-all flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                {/* Stars & Stay Room */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-amber-300/80">
                    {rev.roomStayed}
                  </span>
                </div>

                <h3 className="text-base font-cinzel text-white font-bold">
                  “{rev.title}”
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-stone-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-stone-100 flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[11px] text-stone-400">{rev.location}</div>
                </div>

                <div className="text-[11px] text-amber-400/80 font-mono">
                  {rev.stayDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Sparkles, Award, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { HOTEL_INFO, ASSETS } from '../data/hotelData';

interface FooterProps {
  onReplayIntro: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro, onOpenBooking }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#05080e] border-t border-amber-500/20 text-stone-300">
      {/* Newsletter / Privilege Membership Strip */}
      <div className="border-b border-stone-800 py-12 px-4 sm:px-8 bg-gradient-to-r from-[#070b14] via-[#09111c] to-[#070b14]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Vrindavan Heritage Club</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-cinzel text-white font-bold">
              Receive 15% Off Your Inaugural Palace Stay
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Subscribe to privileged invitations, seasonal Malwa culinary previews, and royal suite upgrades.
            </p>
          </div>

          <div className="w-full max-w-md">
            {newsletterSubscribed ? (
              <div className="p-3 bg-stone-900 border border-emerald-500/40 rounded-xl text-xs text-center flex items-center justify-center gap-2 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Privilege code <strong>VRINDAVANROYAL</strong> is activated for your stay!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400/40 shrink-0">
                <img
                  src={ASSETS.peacockFeather}
                  alt="Peacock symbol"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-cinzel font-bold text-white tracking-wider">
                  THE VRINDAVAN
                </h4>
                <div className="text-[10px] text-amber-300/80 font-mono tracking-widest uppercase">
                  Hotel & Palace · Indore
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed font-light">
              A tribute to the majestic Holkar kingdom of Indore and the timeless luxury of Taj palace hospitality. Featuring luxury suites, pure Malwa vegetarian dining, CHHAT rooftop sky lounge, and the serene Mayura Ayurvedic Spa.
            </p>

            <div className="pt-2">
              <button
                onClick={onReplayIntro}
                className="inline-flex items-center gap-2 text-xs text-amber-300 hover:text-amber-200 transition-colors font-medium border border-amber-500/30 px-3 py-1.5 rounded-lg bg-stone-900/60 cursor-pointer"
              >
                <span>Replay Peacock Feather Experience</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-cinzel font-bold text-amber-300 uppercase tracking-wider">
              Palace Living
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#suites" className="hover:text-amber-200 transition-colors">
                  The Maharaja Suite
                </a>
              </li>
              <li>
                <a href="#suites" className="hover:text-amber-200 transition-colors">
                  Mayur Peacock Suite
                </a>
              </li>
              <li>
                <a href="#suites" className="hover:text-amber-200 transition-colors">
                  Chhat Garden Suite
                </a>
              </li>
              <li>
                <a href="#suites" className="hover:text-amber-200 transition-colors">
                  Deluxe Palace Room
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-amber-400 hover:underline cursor-pointer"
                >
                  Direct Reservation
                </button>
              </li>
            </ul>
          </div>

          {/* Dining & Experiences */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-cinzel font-bold text-amber-300 uppercase tracking-wider">
              Dining & Sanctuaries
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#dining" className="hover:text-amber-200 transition-colors">
                  CHHAT Sky Lounge & Rooftop
                </a>
              </li>
              <li>
                <a href="#dining" className="hover:text-amber-200 transition-colors">
                  Mayur Pure Malwa Restaurant
                </a>
              </li>
              <li>
                <a href="#wellness" className="hover:text-amber-200 transition-colors">
                  Mayura Ayurvedic Spa & Pool
                </a>
              </li>
              <li>
                <a href="#banquets" className="hover:text-amber-200 transition-colors">
                  The Durbar Grand Ballroom
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-amber-200 transition-colors">
                  Sarafa & Rajwada Excursions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-cinzel font-bold text-amber-300 uppercase tracking-wider">
              Palace Address & Contact
            </h5>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${HOTEL_INFO.phoneConcierge}`} className="hover:text-white">
                  {HOTEL_INFO.phoneConcierge}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-white">
                  {HOTEL_INFO.email}
                </a>
              </div>
              <div className="pt-2 text-[11px] text-stone-400">
                15 Mins from Devi Ahilya Bai Holkar Airport · Valet Parking Available
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} The Vrindavan Hotel & Palace, Indore. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400 text-[11px]">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Royal Stay</span>
            <span>·</span>
            <span>Sanctity & Heritage Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

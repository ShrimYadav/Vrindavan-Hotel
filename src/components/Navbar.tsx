import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, Menu, X, Play } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onReplayIntro: () => void;
  currency: 'INR' | 'USD';
  onToggleCurrency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onReplayIntro,
  currency,
  onToggleCurrency,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Heritage Utility Ribbon */}
      <div className="bg-[#060a12] border-b border-amber-500/15 text-stone-300 text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-300/90 tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Taj-Inspired Royal Hospitality in Central Indore</span>
            </span>
            <span className="hidden md:inline text-stone-600">|</span>
            <span className="hidden md:inline text-stone-400">Near Rajwada Palace & Sarafa</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <button
              onClick={onReplayIntro}
              className="flex items-center gap-1 hover:text-amber-300 transition-colors text-[11px] cursor-pointer"
              title="Experience Peacock Feather Intro"
            >
              <Play className="w-2.5 h-2.5 text-amber-400" />
              <span>Peacock Intro</span>
            </button>
            <span className="text-stone-700">·</span>
            <button
              onClick={onToggleCurrency}
              className="hover:text-amber-300 font-mono text-[11px] transition-colors cursor-pointer"
              title="Switch currency"
            >
              Currency: <span className="text-amber-400 font-semibold">{currency}</span>
            </button>
            <span className="text-stone-700">·</span>
            <a
              href="tel:+917314205000"
              className="hidden sm:flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>+91 731 420 5000</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 Wordmark — Zone 2 Links — Zone 3 Primary Action */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080d16]/95 backdrop-blur-md border-b border-amber-500/20 shadow-xl py-3'
            : 'bg-gradient-to-b from-[#080d16]/90 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-xl sm:text-2xl font-cinzel tracking-wider text-amber-100 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 font-bold"
          >
            THE VRINDAVAN
          </a>

          {/* Zone 2: 4-5 single-line nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
            <a
              href="#suites"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 tracking-wide"
            >
              Suites
            </a>
            <a
              href="#dining"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 tracking-wide"
            >
              Dining & Chhat
            </a>
            <a
              href="#banquets"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 tracking-wide"
            >
              Banquets
            </a>
            <a
              href="#wellness"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 tracking-wide"
            >
              Wellness & Pool
            </a>
            <a
              href="#experiences"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 tracking-wide"
            >
              Indore Excursions
            </a>
            <a
              href="#gallery"
              className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 tracking-wide"
            >
              Gallery
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-lg hover:brightness-110 shadow-[0_0_15px_rgba(251,191,36,0.25)] transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book a Stay
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-amber-200 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[88px] z-30 bg-[#080d16]/95 backdrop-blur-xl border-b border-amber-500/20 lg:hidden p-6 flex flex-col gap-5 overflow-y-auto">
          <nav className="flex flex-col gap-4 text-base font-cinzel">
            <a
              href="#suites"
              onClick={() => setMobileMenuOpen(false)}
              className="text-stone-200 hover:text-amber-300 py-2 border-b border-stone-800"
            >
              Suites & Royal Living
            </a>
            <a
              href="#dining"
              onClick={() => setMobileMenuOpen(false)}
              className="text-stone-200 hover:text-amber-300 py-2 border-b border-stone-800"
            >
              Dining & CHHAT Sky Lounge
            </a>
            <a
              href="#banquets"
              onClick={() => setMobileMenuOpen(false)}
              className="text-stone-200 hover:text-amber-300 py-2 border-b border-stone-800"
            >
              Weddings & Banquets
            </a>
            <a
              href="#wellness"
              onClick={() => setMobileMenuOpen(false)}
              className="text-stone-200 hover:text-amber-300 py-2 border-b border-stone-800"
            >
              Mayura Spa & Heated Pool
            </a>
            <a
              href="#experiences"
              onClick={() => setMobileMenuOpen(false)}
              className="text-stone-200 hover:text-amber-300 py-2 border-b border-stone-800"
            >
              Indore Excursions (Rajwada & Sarafa)
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="text-stone-200 hover:text-amber-300 py-2 border-b border-stone-800"
            >
              Palace Gallery
            </a>
          </nav>

          <div className="pt-4 border-t border-amber-500/20 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-center text-xs font-semibold tracking-wider uppercase text-stone-950 bg-amber-400 rounded-lg shadow-md cursor-pointer"
            >
              Reserve a Suite
            </button>
            <a
              href="tel:+917314205000"
              className="flex items-center justify-center gap-2 py-2.5 text-xs text-amber-200/90 border border-amber-500/30 rounded-lg hover:bg-stone-800"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Royal Concierge</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState } from 'react';
import { Calendar, Users, ChevronDown, Sparkles, MapPin, Award, Compass } from 'lucide-react';
import { ASSETS, HOTEL_INFO, ROOMS } from '../data/hotelData';

interface HeroSectionProps {
  onCheckAvailability: (params: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    rooms: number;
    preferredRoomId: string;
  }) => void;
  currency: 'INR' | 'USD';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCheckAvailability,
  currency,
}) => {
  // Booking state defaults
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 3);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDate(dayAfter));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [preferredRoomId, setPreferredRoomId] = useState(ROOMS[0].id);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      checkIn,
      checkOut,
      adults,
      children,
      rooms,
      preferredRoomId,
    });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden">
      {/* Background Exterior Hero Visual */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.hotelExterior}
          alt="The Vrindavan Palace Indore Exterior"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform hover:scale-100 transition-transform duration-1000"
        />
        {/* Measured scrims for optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/65 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#080c14_85%)]" />
      </div>

      {/* Main Hero Header Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-8 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Subtle editorial kicker */}
          <div className="inline-flex items-center gap-2 mb-4 text-xs font-medium tracking-[0.25em] text-amber-300 uppercase">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Central India’s Most Prestigious Heritage Haven</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-cinzel font-bold text-white tracking-tight leading-[1.1] mb-6 [text-wrap:balance]">
            Where Malwa Royalty Meets <span className="gold-gradient-text">Timeless Luxury</span>
          </h1>

          {/* Description */}
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-2xl font-cormorant text-xl">
            Inspired by Indore’s legendary Holkar legacy and Taj-grade hospitality.
            Step into exquisite sandstone jharokhas, starlit dining at <span className="text-amber-300 font-normal">CHHAT Sky Lounge</span>,
            and regal wellness in Ushaganj.
          </p>

          {/* Location & Trust markers */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-300 mb-8">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Ushaganj, Murai Mohalla, Indore</span>
            </span>
            <span className="text-stone-600">·</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>TripAdvisor Travelers’ Choice 2026</span>
            </span>
            <span className="text-stone-600">·</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Pure Dining & Private Butler Service</span>
            </span>
          </div>
        </div>
      </div>

      {/* Taj-Style Integrated Booking Engine Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 w-full -mb-10 sm:-mb-12">
        <form
          onSubmit={handleSubmit}
          className="bg-[#0e1624]/95 border border-amber-500/30 rounded-2xl shadow-2xl p-4 sm:p-6 backdrop-blur-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
        >
          {/* Check-In */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold tracking-wider text-amber-300 uppercase flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Check-In</span>
            </label>
            <input
              type="date"
              value={checkIn}
              min={formatDate(today)}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-stone-900/90 border border-stone-700 rounded-lg px-3 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          {/* Check-Out */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold tracking-wider text-amber-300 uppercase flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Check-Out</span>
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-stone-900/90 border border-stone-700 rounded-lg px-3 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          {/* Guests & Rooms */}
          <div className="space-y-1.5 relative">
            <label className="text-[11px] font-semibold tracking-wider text-amber-300 uppercase flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Guests & Rooms</span>
            </label>
            <button
              type="button"
              onClick={() => setShowGuestDropdown(!showGuestDropdown)}
              className="w-full bg-stone-900/90 border border-stone-700 rounded-lg px-3 py-2.5 text-xs text-stone-100 flex items-center justify-between hover:border-amber-400 transition-colors cursor-pointer"
            >
              <span className="truncate">
                {adults + children} Guests · {rooms} Room{rooms > 1 ? 's' : ''}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            </button>

            {/* Guest Popover */}
            {showGuestDropdown && (
              <div className="absolute bottom-full mb-2 left-0 w-64 bg-[#0d1420] border border-amber-500/30 rounded-xl p-4 shadow-2xl z-30 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span>Adults (12+ yrs)</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-6 h-6 rounded bg-stone-800 text-stone-200 disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-mono">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="w-6 h-6 rounded bg-stone-800 text-stone-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span>Children (0-11 yrs)</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-6 h-6 rounded bg-stone-800 text-stone-200 disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-mono">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="w-6 h-6 rounded bg-stone-800 text-stone-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span>Rooms</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={rooms <= 1}
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="w-6 h-6 rounded bg-stone-800 text-stone-200 disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-mono">{rooms}</span>
                    <button
                      type="button"
                      onClick={() => setRooms(rooms + 1)}
                      className="w-6 h-6 rounded bg-stone-800 text-stone-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowGuestDropdown(false)}
                  className="w-full mt-2 py-1.5 text-xs text-center bg-amber-500/20 text-amber-300 rounded hover:bg-amber-500/30 font-medium"
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Preferred Suite */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold tracking-wider text-amber-300 uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Suite Class</span>
            </label>
            <select
              value={preferredRoomId}
              onChange={(e) => setPreferredRoomId(e.target.value)}
              className="w-full bg-stone-900/90 border border-stone-700 rounded-lg px-3 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400 truncate"
            >
              {ROOMS.map((room) => (
                <option key={room.id} value={room.id} className="bg-stone-900 text-stone-100">
                  {room.title} (from {currency === 'INR' ? `₹${room.priceINR.toLocaleString('en-IN')}` : `$${room.priceUSD}`})
                </option>
              ))}
            </select>
          </div>

          {/* Action Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:brightness-110 transition-all cursor-pointer whitespace-nowrap"
            >
              Check Availability
            </button>
          </div>
        </form>
      </div>

      {/* Spacer to allow floating bar overlap */}
      <div className="h-12 sm:h-16" />
    </section>
  );
};

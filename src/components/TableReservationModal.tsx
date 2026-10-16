import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, Sparkles } from 'lucide-react';
import { DiningVenue } from '../types/hotel';

interface TableReservationModalProps {
  venue: DiningVenue | null;
  onClose: () => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  venue,
  onClose,
}) => {
  if (!venue) return null;

  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('07:30 PM');
  const [guests, setGuests] = useState(2);
  const [seating, setSeating] = useState('Skyline Edge Gazebo');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const timeSlots = [
    '06:30 PM',
    '07:00 PM',
    '07:30 PM',
    '08:00 PM',
    '08:30 PM',
    '09:00 PM',
    '09:30 PM',
    '10:00 PM',
  ];

  const seatingOptions = [
    'Skyline Edge Gazebo',
    'Poolside Candlelight Alcove',
    'Center Royal Courtyard',
    'Private Dining Room (PDR)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `VRN-DINE-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(id);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-[#0a101b] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#070b13]">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
              Table Reservation · The Vrindavan
            </div>
            <h3 className="text-xl font-cinzel text-white font-bold">{venue.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="text-2xl font-cinzel text-white font-bold">
                Table Reserved Successfully
              </h4>

              <p className="text-xs text-stone-300 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-amber-300">{name}</strong>. Your royal table has been confirmed at {venue.name}. A confirmation SMS and digital pass have been dispatched.
              </p>

              <div className="p-4 rounded-xl bg-stone-900 border border-amber-500/30 text-xs text-left max-w-md mx-auto space-y-1.5 font-mono">
                <div className="flex justify-between text-stone-400">
                  <span>Reservation Code:</span>
                  <span className="text-amber-400 font-bold">{bookingId}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Date & Time:</span>
                  <span>{date} · {timeSlot}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Guests & Seating:</span>
                  <span>{guests} Guests · {seating}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Dress Code:</span>
                  <span>{venue.dressCode}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors"
                >
                  Return to Dining
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs text-stone-300 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Complimentary royal welcome drink served upon arrival at {venue.name}.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date */}
                <div>
                  <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                {/* Time Slot */}
                <div>
                  <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Guests */}
                <div>
                  <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seating Preference */}
                <div>
                  <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                    Seating Area
                  </label>
                  <select
                    value={seating}
                    onChange={(e) => setSeating(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  >
                    {seatingOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Shrivastava"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98260 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-amber-300 uppercase mb-1">
                  Special Dining Notes / Occasion
                </label>
                <input
                  type="text"
                  placeholder="Anniversary, birthday, dietary preference (Jain, vegan)..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition-all cursor-pointer"
                >
                  Confirm Table Reservation
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

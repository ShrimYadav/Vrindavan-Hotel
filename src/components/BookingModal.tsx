import React, { useState } from 'react';
import { X, Calendar, Users, Sparkles, Check, ShieldCheck, Printer, CheckCircle2, Tag } from 'lucide-react';
import { Room } from '../types/hotel';
import { ROOMS, HOTEL_INFO } from '../data/hotelData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoom?: Room | null;
  currency: 'INR' | 'USD';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialRoom,
  currency,
}) => {
  if (!isOpen) return null;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 3);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    initialRoom ? initialRoom.id : ROOMS[0].id
  );
  const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDate(dayAfter));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomsCount, setRoomsCount] = useState(1);

  // Add-ons
  const [addOnChauffeur, setAddOnChauffeur] = useState(false);
  const [addOnThali, setAddOnThali] = useState(false);
  const [addOnSpa, setAddOnSpa] = useState(false);
  const [addOnTurndown, setAddOnTurndown] = useState(false);

  // Promo code
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<string>('');

  // Guest Info
  const [guestTitle, setGuestTitle] = useState('Mr.');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Completion State
  const [isBooked, setIsBooked] = useState(false);
  const [reservationId, setReservationId] = useState('');

  const currentRoom = ROOMS.find((r) => r.id === selectedRoomId) || ROOMS[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.max(1, checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Base Room Rate
  const baseRate = currency === 'INR' ? currentRoom.priceINR : currentRoom.priceUSD;
  const roomTotal = baseRate * nights * roomsCount;

  // Add-ons totals
  const chauffeurCost = currency === 'INR' ? 3500 : 42;
  const thaliCost = currency === 'INR' ? 2400 : 29;
  const spaCost = currency === 'INR' ? 5800 : 70;
  const turndownCost = currency === 'INR' ? 1800 : 22;

  let addOnsTotal = 0;
  if (addOnChauffeur) addOnsTotal += chauffeurCost;
  if (addOnThali) addOnsTotal += thaliCost;
  if (addOnSpa) addOnsTotal += spaCost;
  if (addOnTurndown) addOnsTotal += turndownCost;

  // Subtotal & Discount
  const subtotal = roomTotal + addOnsTotal;
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const taxes = Math.round((subtotal - discountAmount) * 0.12); // 12% GST
  const grandTotal = subtotal - discountAmount + taxes;

  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'VRINDAVANROYAL') {
      setAppliedDiscount(0.15);
      setPromoMessage('15% Royal Privilege Discount Applied!');
    } else if (code === 'TAJMALWA') {
      setAppliedDiscount(0.1);
      setPromoMessage('10% Heritage Malwa Offer Applied!');
    } else {
      setPromoMessage('Invalid promo code. Try "VRINDAVANROYAL"');
    }
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `VRN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationId(generatedId);
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0a101b] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#070b13]">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
              The Vrindavan Palace · Official Reservation
            </div>
            <h2 className="text-xl sm:text-2xl font-cinzel text-white font-bold">
              {isBooked ? 'Reservation Confirmed' : 'Reserve Your Palace Stay'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {isBooked ? (
            /* Confirmation Voucher Screen */
            <div className="space-y-6">
              <div className="text-center py-6 space-y-3 bg-stone-900/60 rounded-2xl border border-emerald-500/30 p-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-cinzel text-white font-bold">
                  Khamma Ghani & Pranam, {guestTitle} {fullName}!
                </h3>
                <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                  Your royal stay at <strong className="text-amber-300">The Vrindavan Hotel & Palace</strong> has been confirmed. A formal confirmation dossier and digital palace key have been dispatched to <span className="text-amber-200">{email}</span>.
                </p>

                <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono">
                  Reservation Voucher ID: <span className="font-bold">{reservationId}</span>
                </div>
              </div>

              {/* Booking Summary Card */}
              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-800 gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={currentRoom.image}
                      alt={currentRoom.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-amber-500/30"
                    />
                    <div>
                      <h4 className="text-sm font-cinzel text-white font-bold">{currentRoom.title}</h4>
                      <div className="text-xs text-stone-400">{nights} Night{nights > 1 ? 's' : ''} · {roomsCount} Suite · {adults} Adults</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-stone-400 uppercase">Grand Total</div>
                    <div className="text-xl font-cinzel font-bold text-amber-300">
                      {currency === 'INR' ? `₹${grandTotal.toLocaleString('en-IN')}` : `$${grandTotal}`}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-stone-300">
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Check-In</span>
                    <span className="font-semibold text-stone-100">{checkIn} (2:00 PM)</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Check-Out</span>
                    <span className="font-semibold text-stone-100">{checkOut} (12:00 PM)</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Contact Guest</span>
                    <span className="font-semibold text-stone-100">{phone}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Address</span>
                    <span className="font-semibold text-stone-100">78, Ushaganj, Indore</span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-amber-300/80 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Free cancellation up to 48 hours before check-in. Welcome saffron drink on arrival.</span>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-lg border border-stone-700 hover:bg-stone-800 text-stone-300 text-xs flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Royal Voucher</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleConfirmReservation} className="space-y-6">
              {/* Step 1: Select Room */}
              <div>
                <label className="block text-xs font-cinzel text-amber-300 uppercase tracking-wider mb-2">
                  1. Selected Chamber / Suite
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ROOMS.map((room) => {
                    const isSelected = room.id === selectedRoomId;
                    const priceFmt =
                      currency === 'INR'
                        ? `₹${room.priceINR.toLocaleString('en-IN')}`
                        : `$${room.priceUSD}`;

                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-400 shadow-md'
                            : 'bg-stone-900/50 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <img
                          src={room.image}
                          alt={room.title}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-semibold text-white truncate">{room.title}</h4>
                          <div className="text-[11px] text-amber-300 font-mono font-medium">
                            {priceFmt} <span className="text-stone-400">/ night</span>
                          </div>
                          <div className="text-[10px] text-stone-400">{room.sqFt} sq.ft · {room.bed}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Dates & Guests */}
              <div>
                <label className="block text-xs font-cinzel text-amber-300 uppercase tracking-wider mb-2">
                  2. Stay Dates & Party
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] text-stone-400 uppercase block mb-1">Check-In</label>
                    <input
                      type="date"
                      value={checkIn}
                      min={formatDate(today)}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-2 text-xs text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-stone-400 uppercase block mb-1">Check-Out</label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-2 text-xs text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-stone-400 uppercase block mb-1">Guests</label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-2 text-xs text-white"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} Adult{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-stone-400 uppercase block mb-1">Suites</label>
                    <select
                      value={roomsCount}
                      onChange={(e) => setRoomsCount(Number(e.target.value))}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-2 text-xs text-white"
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n} Suite{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Royal Indulgence Add-ons */}
              <div>
                <label className="block text-xs font-cinzel text-amber-300 uppercase tracking-wider mb-2">
                  3. Royal Curations & Add-Ons
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label className="p-3 rounded-xl bg-stone-900/50 border border-stone-800 hover:border-amber-500/40 flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addOnChauffeur}
                      onChange={(e) => setAddOnChauffeur(e.target.checked)}
                      className="mt-1 accent-amber-500 rounded"
                    />
                    <div>
                      <div className="font-semibold text-stone-200">Mercedes Airport Pickup</div>
                      <div className="text-[11px] text-stone-400">Devi Ahilya Bai Holkar Airport transfer with chilled tender coconut water</div>
                      <div className="text-amber-400 font-mono mt-0.5">+{currency === 'INR' ? '₹3,500' : '$42'}</div>
                    </div>
                  </label>

                  <label className="p-3 rounded-xl bg-stone-900/50 border border-stone-800 hover:border-amber-500/40 flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addOnThali}
                      onChange={(e) => setAddOnThali(e.target.checked)}
                      className="mt-1 accent-amber-500 rounded"
                    />
                    <div>
                      <div className="font-semibold text-stone-200">Grand Malwa Thali for Two</div>
                      <div className="text-[11px] text-stone-400">16-course ceremonial feast served in brass ware at Mayur Restaurant</div>
                      <div className="text-amber-400 font-mono mt-0.5">+{currency === 'INR' ? '₹2,400' : '$29'}</div>
                    </div>
                  </label>

                  <label className="p-3 rounded-xl bg-stone-900/50 border border-stone-800 hover:border-amber-500/40 flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addOnSpa}
                      onChange={(e) => setAddOnSpa(e.target.checked)}
                      className="mt-1 accent-amber-500 rounded"
                    />
                    <div>
                      <div className="font-semibold text-stone-200">Mayura Abhyanga Couple Spa</div>
                      <div className="text-[11px] text-stone-400">60-minute synchronized Ayurvedic massage & rose petal bath</div>
                      <div className="text-amber-400 font-mono mt-0.5">+{currency === 'INR' ? '₹5,800' : '$70'}</div>
                    </div>
                  </label>

                  <label className="p-3 rounded-xl bg-stone-900/50 border border-stone-800 hover:border-amber-500/40 flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addOnTurndown}
                      onChange={(e) => setAddOnTurndown(e.target.checked)}
                      className="mt-1 accent-amber-500 rounded"
                    />
                    <div>
                      <div className="font-semibold text-stone-200">Rose Petal & Candle Turndown</div>
                      <div className="text-[11px] text-stone-400">Evening room preparation with scented candles, fresh marigold & chocolates</div>
                      <div className="text-amber-400 font-mono mt-0.5">+{currency === 'INR' ? '₹1,800' : '$22'}</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 4: Promo Code & Privilege */}
              <div>
                <label className="block text-xs font-cinzel text-amber-300 uppercase tracking-wider mb-2">
                  4. Privilege & Promo Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. VRINDAVANROYAL)"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white uppercase font-mono"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-stone-800 hover:bg-stone-700 border border-stone-600 rounded-lg text-xs font-semibold text-amber-300 cursor-pointer"
                  >
                    Apply Code
                  </button>
                </div>
                {promoMessage && (
                  <div className="text-[11px] mt-1.5 text-amber-300 font-mono">{promoMessage}</div>
                )}
              </div>

              {/* Step 5: Primary Guest Info */}
              <div>
                <label className="block text-xs font-cinzel text-amber-300 uppercase tracking-wider mb-2">
                  5. Guest Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-stone-400 uppercase block mb-1">Title</label>
                    <select
                      value={guestTitle}
                      onChange={(e) => setGuestTitle(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-2 text-xs text-white"
                    >
                      <option>Mr.</option>
                      <option>Mrs.</option>
                      <option>Ms.</option>
                      <option>Dr.</option>
                    </select>
                  </div>

                  <div className="sm:col-span-5">
                    <label className="text-[10px] text-stone-400 uppercase block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aniruddh Pratap"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-5">
                    <label className="text-[10px] text-stone-400 uppercase block mb-1">Phone (with WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98260 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="text-[10px] text-stone-400 uppercase block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="mt-3">
                  <label className="text-[10px] text-stone-400 uppercase block mb-1">Special Preferences / Requests</label>
                  <input
                    type="text"
                    placeholder="High floor, quiet wing, anniversary setup, Jain meals..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Price Breakdown & Submit */}
              <div className="p-4 rounded-xl bg-stone-900/90 border border-amber-500/20 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-stone-400">
                  <span>Room Charge ({nights} Night{nights > 1 ? 's' : ''} × {roomsCount} Suite):</span>
                  <span>{currency === 'INR' ? `₹${roomTotal.toLocaleString('en-IN')}` : `$${roomTotal}`}</span>
                </div>
                {addOnsTotal > 0 && (
                  <div className="flex justify-between text-stone-400">
                    <span>Royal Curations & Add-Ons:</span>
                    <span>+{currency === 'INR' ? `₹${addOnsTotal.toLocaleString('en-IN')}` : `$${addOnsTotal}`}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Privilege Discount ({appliedDiscount * 100}%):</span>
                    <span>-{currency === 'INR' ? `₹${discountAmount.toLocaleString('en-IN')}` : `$${discountAmount}`}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-400">
                  <span>Luxury Hospitality Tax (GST 12%):</span>
                  <span>+{currency === 'INR' ? `₹${taxes.toLocaleString('en-IN')}` : `$${taxes}`}</span>
                </div>
                <div className="flex justify-between text-amber-300 font-bold text-sm pt-2 border-t border-stone-800">
                  <span>Estimated Total (Pay at Palace):</span>
                  <span>{currency === 'INR' ? `₹${grandTotal.toLocaleString('en-IN')}` : `$${grandTotal}`}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-xl transition-all cursor-pointer"
              >
                Confirm Royal Reservation
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

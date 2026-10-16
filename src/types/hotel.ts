export interface Room {
  id: string;
  title: string;
  subtitle: string;
  category: 'presidential' | 'heritage' | 'courtyard' | 'executive';
  priceINR: number;
  priceUSD: number;
  capacity: {
    adults: number;
    children: number;
  };
  sqFt: number;
  bed: string;
  view: string;
  description: string;
  image: string;
  gallery: string[];
  amenities: string[];
  highlights: string[];
  features: string[];
}

export interface DiningVenue {
  id: string;
  name: string;
  tagline: string;
  timings: string;
  cuisine: string;
  dressCode: string;
  description: string;
  image: string;
  signatureDishes: string[];
  seatingCapacity: number;
  features: string[];
}

export interface BanquetSpace {
  id: string;
  name: string;
  areaSqFt: number;
  theatreCapacity: number;
  banquetCapacity: number;
  idealFor: string;
  description: string;
  image: string;
  features: string[];
}

export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  distanceFromHotel: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface GuestReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  stayDate: string;
  roomStayed: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface BookingState {
  checkIn: string;
  checkOut: string;
  roomsCount: number;
  adultsCount: number;
  childrenCount: number;
  selectedRoom: Room | null;
  promoCode: string;
  discountPercentage: number;
  addOns: {
    airportPickUp: boolean; // Mercedes Benz Chauffeur
    malwaRoyalThali: boolean; // Heritage Royal Feast for 2
    spaTreatment: boolean; // 60 min Abhyanga Couple Session
    candlelightTurndown: boolean; // Rose petal & Belgian chocolates
  };
  guestDetails: {
    title: string;
    fullName: string;
    email: string;
    phone: string;
    specialRequests: string;
  };
}

export interface TableBooking {
  venueId: string;
  venueName: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  seatingPreference: string;
  fullName: string;
  phone: string;
  email: string;
  specialNotes: string;
}

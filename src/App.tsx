/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PeacockSplashScreen } from './components/PeacockSplashScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StoryAndHighlights } from './components/StoryAndHighlights';
import { AccommodationsSection } from './components/AccommodationsSection';
import { DiningSection } from './components/DiningSection';
import { BanquetsSection } from './components/BanquetsSection';
import { WellnessSection } from './components/WellnessSection';
import { ExperiencesSection } from './components/ExperiencesSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ConciergeChatDrawer } from './components/ConciergeChatDrawer';
import { Room } from './types/hotel';
import { ROOMS } from './data/hotelData';

export default function App() {
  // Splash screen state: starts visible, then zooms into feather and transitions into homepage
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // Currency toggle state
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleReplayIntro = () => {
    setShowSplash(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (room?: Room) => {
    setSelectedRoom(room || ROOMS[0]);
    setIsBookingModalOpen(true);
  };

  const handleHeroCheckAvailability = (params: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    rooms: number;
    preferredRoomId: string;
  }) => {
    const matchedRoom = ROOMS.find((r) => r.id === params.preferredRoomId) || ROOMS[0];
    setSelectedRoom(matchedRoom);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-stone-100 flex flex-col font-sans selection:bg-amber-600 selection:text-white relative">
      {/* Hyper-realistic Peacock Feather Splash & Cinematic Zoom Experience */}
      {showSplash && <PeacockSplashScreen onComplete={handleSplashComplete} />}

      {/* Main Website - Appears as splash zooms into the peacock eye */}
      <div
        className={`flex-1 flex flex-col transition-opacity duration-1000 ${
          showSplash ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Navigation Bar strictly conforming to Top Bar Contract */}
        <Navbar
          onOpenBooking={() => handleOpenBooking()}
          onReplayIntro={handleReplayIntro}
          currency={currency}
          onToggleCurrency={() => setCurrency((c) => (c === 'INR' ? 'USD' : 'INR'))}
        />

        {/* Hero Section with Palace Exterior & Booking Engine Bar */}
        <main className="flex-1">
          <HeroSection
            onCheckAvailability={handleHeroCheckAvailability}
            currency={currency}
          />

          {/* 4-Column Luxury Metrics & Palace Heritage Narrative */}
          <StoryAndHighlights />

          {/* Accommodations & Royal Suites Showcase */}
          <AccommodationsSection
            onSelectRoomForBooking={(room) => handleOpenBooking(room)}
            currency={currency}
          />

          {/* Dining Sanctuary & CHHAT Sky Lounge */}
          <DiningSection />

          {/* Banquets & Royal Destination Weddings */}
          <BanquetsSection />

          {/* Mayura Ayurvedic Spa & Heated Rooftop Pool */}
          <WellnessSection />

          {/* Indore & Malwa Concierge Excursions (Rajwada, Sarafa, Mahakaleshwar) */}
          <ExperiencesSection />

          {/* Palace Gallery & 360 Lightbox */}
          <GallerySection />

          {/* Patron Reviews & Accolades */}
          <ReviewsSection />
        </main>

        {/* Footer with Verified Ushaganj Address, Concierge, and Newsletter */}
        <Footer
          onReplayIntro={handleReplayIntro}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Interactive Full Reservation Engine Modal */}
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          initialRoom={selectedRoom}
          currency={currency}
        />

        {/* 24/7 Royal Concierge Chat Drawer */}
        <ConciergeChatDrawer />
      </div>
    </div>
  );
}

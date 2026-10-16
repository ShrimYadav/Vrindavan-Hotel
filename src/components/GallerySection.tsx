import React, { useState } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ASSETS } from '../data/hotelData';

interface GalleryItem {
  id: string;
  category: 'architecture' | 'suites' | 'dining' | 'wellness';
  title: string;
  location: string;
  src: string;
}

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      category: 'architecture',
      title: 'Grand Palace Facade & Lotus Mirror Pool',
      location: 'Main Porte-Cochère, Ushaganj',
      src: ASSETS.hotelExterior,
    },
    {
      id: 'g-2',
      category: 'suites',
      title: 'The Maharaja Presidential Bedroom & Balcony',
      location: 'Level 4 Royal Wing',
      src: ASSETS.royalSuite,
    },
    {
      id: 'g-3',
      category: 'dining',
      title: 'CHHAT Sky Lounge Twilight Table Service',
      location: 'Rooftop Terrace',
      src: ASSETS.chhatRooftop,
    },
    {
      id: 'g-4',
      category: 'wellness',
      title: 'Sunken Marble Marigold Hydrotherapy Vitality Bath',
      location: 'Mayura Ayurvedic Spa',
      src: ASSETS.mayuraSpa,
    },
    {
      id: 'g-5',
      category: 'suites',
      title: 'Sacred Peacock Iridescent Eye Heritage Motif',
      location: 'Mayur Suite Artisanal Fresco',
      src: ASSETS.peacockFeather,
    },
    {
      id: 'g-6',
      category: 'architecture',
      title: 'Carved Sandstone Jharokhas at Sunset',
      location: 'Inner Royal Courtyard',
      src: ASSETS.hotelExterior,
    },
  ];

  const filteredItems =
    filter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="py-24 bg-[#080d16] border-b border-amber-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-amber-400 uppercase mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>THE PALACE GALLERY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-cinzel text-white font-bold tracking-tight">
              A Visual Odyssey in Indore
            </h2>
            <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              From hand-carved Holkar filigree to celestial rooftop sunsets, immerse yourself in the living grandeur of The Vrindavan.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1 bg-stone-900/80 rounded-xl border border-stone-800">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'architecture', label: 'Architecture' },
              { id: 'suites', label: 'Royal Suites' },
              { id: 'dining', label: 'CHHAT Dining' },
              { id: 'wellness', label: 'Spa & Vitality' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-amber-500 text-stone-950 font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Bento Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900/40 border border-amber-500/20 hover:border-amber-400/60 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <img
                src={item.src}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 flex items-center justify-center text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                  {item.location}
                </div>
                <h4 className="text-base font-cinzel text-white font-semibold mt-0.5">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Viewer */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full text-stone-300 hover:text-white bg-stone-900/80 border border-stone-700 cursor-pointer z-20"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={() =>
              setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1))
            }
            className="absolute left-6 p-3 rounded-full text-stone-300 hover:text-white bg-stone-900/80 border border-stone-700 cursor-pointer z-20 hidden sm:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() =>
              setLightboxIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0))
            }
            className="absolute right-6 p-3 rounded-full text-stone-300 hover:text-white bg-stone-900/80 border border-stone-700 cursor-pointer z-20 hidden sm:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full text-center space-y-3">
            <div className="aspect-[16/10] max-h-[75vh] w-auto mx-auto rounded-xl overflow-hidden border border-amber-500/40 shadow-2xl">
              <img
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain bg-black"
              />
            </div>
            <div className="font-cinzel text-lg text-white font-bold">
              {filteredItems[lightboxIndex].title}
            </div>
            <div className="text-xs text-amber-300 font-mono">
              {filteredItems[lightboxIndex].location} · Photo {lightboxIndex + 1} of {filteredItems.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

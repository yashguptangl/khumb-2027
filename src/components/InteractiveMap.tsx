'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Navigation,
  Compass,
  Layers,
  ChevronRight,
  ExternalLink,
  Phone,
  Sparkles
} from 'lucide-react';
import { HARIDWAR_DESTINATIONS, MOCK_HOTELS } from '@/data/catalog';

interface InteractiveMapProps {
  lang: 'en' | 'hi';
}

export default function InteractiveMap({ lang }: InteractiveMapProps) {
  const [selectedPin, setSelectedPin] = useState<any>(HARIDWAR_DESTINATIONS[0]);
  const [filterType, setFilterType] = useState<'ALL' | 'TEMPLE' | 'GHAT' | 'HOTEL'>('ALL');

  const filteredPlaces = HARIDWAR_DESTINATIONS.filter((d) =>
    filterType === 'ALL' ? true : d.category === filterType
  );

  return (
    <div className="relative w-full h-[calc(100vh-120px)] flex flex-col">
      {/* Top Controls Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex gap-1 bg-white/90 backdrop-blur-md p-1 rounded-2xl border border-[#F0EAE1] shadow-md pointer-events-auto">
          {['ALL', 'TEMPLE', 'GHAT'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f as any)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                filterType === f
                  ? 'bg-[#F47A20] text-white shadow-sm'
                  : 'text-[#777777] hover:text-[#242424]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-[#F0EAE1] shadow-md text-[11px] font-bold text-[#C65312] pointer-events-auto">
          Haridwar Live Map
        </div>
      </div>

      {/* Map Interactive Canvas (OpenStreetMap Embed with Custom Markers) */}
      <div className="relative flex-1 w-full bg-[#E5E3DF] overflow-hidden rounded-3xl border border-[#F0EAE1] shadow-inner">
        {/* OpenStreetMap interactive frame */}
        <iframe
          title="Haridwar Map"
          className="w-full h-full border-0"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=78.130%2C29.910%2C78.220%2C29.995&layer=mapnik&marker=${selectedPin.latitude}%2C${selectedPin.longitude}`}
        />

        {/* Live Marker Pills Overlay on Map */}
        <div className="absolute bottom-28 left-2 right-2 flex gap-2 overflow-x-auto no-scrollbar py-1 z-20 pointer-events-auto">
          {filteredPlaces.map((place) => {
            const isSelected = selectedPin.id === place.id;
            return (
              <button
                key={place.id}
                onClick={() => setSelectedPin(place)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all shadow-md ${
                  isSelected
                    ? 'bg-[#F47A20] text-white ring-2 ring-white scale-105'
                    : 'bg-white/95 backdrop-blur-md text-[#242424] hover:bg-white'
                }`}
              >
                <MapPin size={13} className={isSelected ? 'text-white' : 'text-[#F47A20]'} />
                <span className="truncate max-w-[120px]">
                  {lang === 'hi' ? place.nameHi : place.nameEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* iOS Style Bottom Sheet for Selected Location */}
      {selectedPin && (
        <div className="absolute bottom-2 left-2 right-2 bg-white rounded-3xl p-3.5 border border-[#F0EAE1] shadow-2xl z-30 space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-2">
              <span className="text-[10px] font-bold text-[#C65312] bg-[#FFF1E5] px-2 py-0.5 rounded-full uppercase">
                {selectedPin.category}
              </span>
              <h3 className="text-sm font-bold text-[#242424] mt-1 truncate">
                {lang === 'hi' ? selectedPin.nameHi : selectedPin.nameEn}
              </h3>
              <p className="text-[10px] text-[#777777] truncate mt-0.5">{selectedPin.address}</p>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="text-xs font-bold text-[#F47A20]">
                {selectedPin.distanceFromHarKiPauriKm} km
              </span>
              <div className="text-[9px] text-[#777777]">from Har Ki Pauri</div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-[#F0EAE1]">
            <Link
              href={`/explore/${selectedPin.id}`}
              className="flex-1 py-2 rounded-xl bg-[#FFF1E5] text-[#C65312] text-xs font-bold text-center hover:bg-[#F47A20] hover:text-white transition-all"
            >
              {lang === 'hi' ? 'विवरण देखें' : 'View Full Details'}
            </Link>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPin.latitude},${selectedPin.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#F47A20] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#DE6313] transition-all shadow-sm"
            >
              <Navigation size={13} />
              <span>{lang === 'hi' ? 'नेविगेट करें' : 'Navigate'}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

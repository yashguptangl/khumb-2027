'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Navigation, SlidersHorizontal, Star, CheckCircle, ChevronRight } from 'lucide-react';
import { HARIDWAR_DESTINATIONS, MOCK_HOTELS, MOCK_RESTAURANTS } from '@/data/catalog';
import { calculateDistanceKm } from '@/lib/utils';

interface NearbyDiscoveryProps {
  userLat?: number;
  userLon?: number;
  locationName: string;
  lang: 'en' | 'hi';
}

export default function NearbyDiscovery({
  userLat = 29.9577, // Default Har Ki Pauri coordinates
  userLon = 78.1707,
  locationName,
  lang
}: NearbyDiscoveryProps) {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'TEMPLE' | 'GHAT' | 'HOTEL' | 'FOOD'>('ALL');
  const [selectedRadius, setSelectedRadius] = useState<number>(5); // in km
  const [sortBy, setSortBy] = useState<'DISTANCE' | 'RATING'>('DISTANCE');

  // Compute live distance for destinations
  const placesWithDistance = HARIDWAR_DESTINATIONS.map((dest) => {
    const dist = calculateDistanceKm(userLat, userLon, dest.latitude, dest.longitude);
    return {
      ...dest,
      currentDistKm: dist,
      type: dest.category
    };
  });

  // Filter by category & radius
  const filteredPlaces = placesWithDistance.filter((place) => {
    const withinRadius = place.currentDistKm <= selectedRadius;
    if (!withinRadius) return false;
    if (selectedCategory === 'ALL') return true;
    return place.category === selectedCategory;
  });

  // Sort
  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    if (sortBy === 'DISTANCE') return a.currentDistKm - b.currentDistKm;
    return 0;
  });

  return (
    <div className="w-full my-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div>
          <h2 className="text-sm font-bold text-[#242424] flex items-center gap-1.5">
            <Navigation size={15} className="text-[#F47A20]" />
            <span>{lang === 'hi' ? 'समीपवर्ती दर्शन एवं सुविधाएं' : 'Nearby Discovery'}</span>
          </h2>
          <p className="text-[10px] text-[#777777]">
            {lang === 'hi'
              ? `${locationName} से दूरी के अनुसार सूचीबद्ध`
              : `Calculated from ${locationName}`}
          </p>
        </div>
        <Link
          href="/map"
          className="text-xs font-semibold text-[#F47A20] flex items-center hover:underline"
        >
          <span>{lang === 'hi' ? 'मानचित्र देखें' : 'View Map'}</span>
          <ChevronRight size={13} />
        </Link>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'ALL', en: 'All Places', hi: 'सभी' },
          { id: 'TEMPLE', en: 'Temples', hi: 'मंदिर' },
          { id: 'GHAT', en: 'Ghats', hi: 'घाट' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#F47A20] text-white shadow-sm'
                : 'bg-white border border-[#F0EAE1] text-[#555555]'
            }`}
          >
            {lang === 'hi' ? cat.hi : cat.en}
          </button>
        ))}
      </div>

      {/* Radius selector */}
      <div className="flex items-center justify-between text-[11px] text-[#777777] bg-white border border-[#F0EAE1] rounded-xl px-3 py-1.5 my-2">
        <span>{lang === 'hi' ? 'खोज दायरा (त्रिज्या):' : 'Search Radius:'}</span>
        <div className="flex items-center gap-1.5">
          {[1, 3, 5, 10].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRadius(r)}
              className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-colors ${
                selectedRadius === r
                  ? 'bg-[#FFF1E5] text-[#C65312] border border-[#F47A20]/30'
                  : 'text-[#777777] hover:text-[#242424]'
              }`}
            >
              {r} km
            </button>
          ))}
        </div>
      </div>

      {/* Nearby Places Cards */}
      <div className="space-y-2.5 mt-2">
        {sortedPlaces.length === 0 ? (
          <div className="p-6 text-center bg-white rounded-2xl border border-[#F0EAE1] text-xs text-[#777777]">
            {lang === 'hi'
              ? `${selectedRadius} किमी के दायरे में कोई स्थान नहीं मिला। दायरा बढ़ाएं।`
              : `No places found within ${selectedRadius} km. Try increasing the search radius.`}
          </div>
        ) : (
          sortedPlaces.slice(0, 5).map((place) => (
            <Link
              key={place.id}
              href={`/explore/${place.id}`}
              className="flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-[#F0EAE1] shadow-sm hover:shadow active:scale-98 transition-all"
            >
              <img
                src={place.imageUrl}
                alt={place.nameEn}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#242424] truncate">
                    {lang === 'hi' ? place.nameHi : place.nameEn}
                  </h3>
                  <span className="text-[10px] font-bold text-[#C65312] bg-[#FFF1E5] px-2 py-0.5 rounded-full flex-shrink-0">
                    {place.currentDistKm} km
                  </span>
                </div>
                <p className="text-[10px] text-[#777777] line-clamp-1 mt-0.5">
                  {lang === 'hi' ? place.descriptionHi : place.descriptionEn}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    {place.category}
                  </span>
                  <span className="text-[9px] text-[#777777] truncate">{place.timings}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

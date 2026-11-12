'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, X, Sparkles, MapPin, Building, Utensils, Car, ShieldAlert } from 'lucide-react';
import { HARIDWAR_DESTINATIONS, MOCK_HOTELS, MOCK_RESTAURANTS, MOCK_TRANSPORTS } from '@/data/catalog';

interface UniversalSearchProps {
  lang: 'en' | 'hi';
}

export default function UniversalSearch({ lang }: UniversalSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const cleanQuery = query.toLowerCase().trim();

  // Unified Search Results across Temples, Hotels, Restaurants, and Transport
  const matchedDestinations = cleanQuery
    ? HARIDWAR_DESTINATIONS.filter(
        (d) =>
          d.nameEn.toLowerCase().includes(cleanQuery) ||
          d.nameHi.includes(cleanQuery) ||
          d.tags.some((t) => t.toLowerCase().includes(cleanQuery))
      ).slice(0, 4)
    : [];

  const matchedHotels = cleanQuery
    ? MOCK_HOTELS.filter((h) => h.name.toLowerCase().includes(cleanQuery)).slice(0, 2)
    : [];

  const matchedRestaurants = cleanQuery
    ? MOCK_RESTAURANTS.filter((r) => r.name.toLowerCase().includes(cleanQuery)).slice(0, 2)
    : [];

  const hasResults =
    matchedDestinations.length > 0 || matchedHotels.length > 0 || matchedRestaurants.length > 0;

  return (
    <div className="relative w-full my-2 z-30">
      {/* Search Input Bar */}
      <div
        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white border transition-all shadow-sm ${
          isFocused ? 'border-[#F47A20] ring-2 ring-[#F47A20]/20 shadow-md' : 'border-[#F0EAE1]'
        }`}
      >
        <Search size={18} className="text-[#F47A20] flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={
            lang === 'hi'
              ? 'मंदिर, घाट, होटल, सात्विक भोजन, टैक्सी खोजें...'
              : 'Search temples, hotels, ghats, food, taxi...'
          }
          className="w-full text-xs text-[#242424] placeholder:text-[#777777] bg-transparent outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Instant Dropdown Results */}
      {isFocused && cleanQuery && (
        <div className="absolute top-12 left-0 right-0 bg-white rounded-2xl border border-[#F0EAE1] shadow-2xl p-3 max-h-96 overflow-y-auto z-50">
          {!hasResults ? (
            <div className="p-4 text-center text-xs text-[#777777]">
              {lang === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No places found matching your search.'}
            </div>
          ) : (
            <div className="space-y-3">
              {matchedDestinations.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-[#C65312] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <MapPin size={11} />
                    <span>{lang === 'hi' ? 'मंदिर एवं पवित्र स्थल' : 'Temples & Ghats'}</span>
                  </div>
                  <div className="space-y-1">
                    {matchedDestinations.map((d) => (
                      <Link
                        key={d.id}
                        href={`/explore/${d.id}`}
                        onClick={() => setIsFocused(false)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FFF1E5]/60 transition-colors"
                      >
                        <div>
                          <div className="text-xs font-semibold text-[#242424]">
                            {lang === 'hi' ? d.nameHi : d.nameEn}
                          </div>
                          <div className="text-[10px] text-[#777777]">
                            {d.distanceFromHarKiPauriKm} km from Har Ki Pauri
                          </div>
                        </div>
                        <span className="text-[10px] font-medium bg-[#FFF1E5] text-[#C65312] px-2 py-0.5 rounded-full">
                          {d.category}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {matchedHotels.length > 0 && (
                <div className="border-t border-[#F0EAE1] pt-2">
                  <div className="text-[10px] font-bold text-[#C65312] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Building size={11} />
                    <span>{lang === 'hi' ? 'होटल एवं धर्मशाला' : 'Accommodations'}</span>
                  </div>
                  <div className="space-y-1">
                    {matchedHotels.map((h) => (
                      <Link
                        key={h.id}
                        href={`/bookings?property=${h.id}`}
                        onClick={() => setIsFocused(false)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FFF1E5]/60 transition-colors"
                      >
                        <div className="text-xs font-semibold text-[#242424]">{h.name}</div>
                        <div className="text-[10px] text-[#F47A20] font-bold">₹{h.pricePerNight}/night</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {matchedRestaurants.length > 0 && (
                <div className="border-t border-[#F0EAE1] pt-2">
                  <div className="text-[10px] font-bold text-[#C65312] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Utensils size={11} />
                    <span>{lang === 'hi' ? 'सात्विक भोजन' : 'Satvik Food'}</span>
                  </div>
                  <div className="space-y-1">
                    {matchedRestaurants.map((r) => (
                      <Link
                        key={r.id}
                        href="/explore?tab=food"
                        onClick={() => setIsFocused(false)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FFF1E5]/60 transition-colors"
                      >
                        <div className="text-xs font-semibold text-[#242424]">{r.name}</div>
                        <div className="text-[10px] text-green-700 font-medium">⭐ {r.rating}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

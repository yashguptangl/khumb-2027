'use client';

import React from 'react';
import Link from 'next/link';
import { Building, Star, CheckCircle2, ChevronRight, Phone } from 'lucide-react';
import { MOCK_HOTELS } from '@/data/catalog';

interface FeaturedAccommodationsProps {
  lang: 'en' | 'hi';
}

export default function FeaturedAccommodations({ lang }: FeaturedAccommodationsProps) {
  return (
    <div className="w-full my-4">
      <div className="flex items-center justify-between mb-2 px-1">
        <div>
          <h2 className="text-sm font-bold text-[#242424] flex items-center gap-1.5">
            <Building size={15} className="text-[#F47A20]" />
            <span>{lang === 'hi' ? 'होटल एवं धर्मशालाएं' : 'Hotels & Dharamshalas'}</span>
          </h2>
          <p className="text-[10px] text-[#777777]">
            {lang === 'hi' ? 'सत्यापित आवास व सीधा संपर्क' : 'Verified stays with direct inquiry'}
          </p>
        </div>
        <Link
          href="/explore?tab=accommodations"
          className="text-xs font-semibold text-[#F47A20] flex items-center hover:underline"
        >
          <span>{lang === 'hi' ? 'सभी देखें' : 'View All'}</span>
          <ChevronRight size={13} />
        </Link>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
        {MOCK_HOTELS.map((hotel) => (
          <div
            key={hotel.id}
            className="flex-shrink-0 w-64 bg-white rounded-2xl border border-[#F0EAE1] overflow-hidden shadow-sm hover:shadow transition-all"
          >
            <div className="relative h-32 w-full">
              <img
                src={hotel.imageUrl}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {hotel.type.replace('_', ' ')}
              </div>
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md text-[#242424] text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Star size={11} className="text-amber-500 fill-amber-500" />
                <span>{hotel.rating}</span>
              </div>
            </div>

            <div className="p-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#242424] truncate flex-1">{hotel.name}</h3>
                {hotel.isVerified && (
                  <CheckCircle2 size={13} className="text-[#218653] flex-shrink-0 ml-1" />
                )}
              </div>
              <p className="text-[10px] text-[#777777] truncate mt-0.5">{hotel.address}</p>

              {/* Stay Type & Price */}
              <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#F0EAE1]">
                <div>
                  <div className="text-[9px] uppercase font-bold text-[#777777]">
                    {hotel.stayType === 'FREE'
                      ? 'Free Stay'
                      : hotel.stayType === 'DONATION_BASED'
                      ? 'Donation Stay'
                      : 'Per Night'}
                  </div>
                  <div className="text-xs font-bold text-[#F47A20]">
                    {hotel.pricePerNight === 0 ? 'मुफ्त आवास (Free)' : `₹${hotel.pricePerNight}`}
                  </div>
                </div>

                <Link
                  href={`/bookings?property=${hotel.id}&name=${encodeURIComponent(hotel.name)}`}
                  className="px-3 py-1.5 rounded-xl bg-[#F47A20] text-white text-[11px] font-bold hover:bg-[#DE6313] active:scale-95 transition-all shadow-sm"
                >
                  {lang === 'hi' ? 'पूछताछ करें' : 'Enquire'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TopHeader from '@/components/TopHeader';
import BookingEngine from '@/components/BookingEngine';
import BottomNav from '@/components/BottomNav';

function BookingContent() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const searchParams = useSearchParams();
  const property = searchParams.get('property') || '';
  const name = searchParams.get('name') || '';

  return (
    <div className="min-h-screen bg-[#FFFCF8] text-[#242424] flex flex-col items-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative px-4 pb-20 shadow-sm border-x border-[#F0EAE1]/80 bg-[#FFFCF8]">
        <TopHeader
          currentLocation="Haridwar Bookings Desk"
          onRequestGPS={() => {}}
          lang={lang}
          onToggleLang={() => setLang(lang === 'en' ? 'hi' : 'en')}
        />

        <div className="pt-2 mb-2">
          <h1 className="text-base font-bold text-[#242424]">
            {lang === 'hi' ? 'बुकिंग व पूछताछ केंद्र' : 'Kumbh Bookings & Inquiries'}
          </h1>
          <p className="text-[11px] text-[#777777]">
            {lang === 'hi'
              ? 'होटल, धर्मशाला एवं टैक्सी ऑपरेटरों से सीधी कोटेशन प्राप्त करें'
              : 'Direct quotations from verified hotels, dharamshalas & taxi operators'}
          </p>
        </div>

        <BookingEngine initialProperty={property} initialName={name} lang={lang} />
        <BottomNav lang={lang} />
      </div>
    </div>
  );
}

export default function BookingsPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-xs">Loading bookings...</div>}>
      <BookingContent />
    </Suspense>
  );
}

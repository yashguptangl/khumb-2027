'use client';

import React, { useState } from 'react';
import TopHeader from '@/components/TopHeader';
import InteractiveMap from '@/components/InteractiveMap';
import BottomNav from '@/components/BottomNav';

export default function MapPage() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  return (
    <div className="min-h-screen bg-[#FFFCF8] text-[#242424] flex flex-col items-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative px-4 pb-20 shadow-sm border-x border-[#F0EAE1]/80 bg-[#FFFCF8]">
        <TopHeader
          currentLocation="Haridwar GPS Map View"
          onRequestGPS={() => {}}
          lang={lang}
          onToggleLang={() => setLang(lang === 'en' ? 'hi' : 'en')}
        />

        <div className="pt-2 flex-1 flex flex-col">
          <InteractiveMap lang={lang} />
        </div>

        <BottomNav lang={lang} />
      </div>
    </div>
  );
}

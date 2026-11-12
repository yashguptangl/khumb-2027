'use client';

import React, { useState } from 'react';
import TopHeader from '@/components/TopHeader';
import ExploreCatalogue from '@/components/ExploreCatalogue';
import BottomNav from '@/components/BottomNav';
import AiTravelAssistant from '@/components/AiTravelAssistant';

export default function ExplorePage() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  return (
    <div className="min-h-screen bg-[#FFFCF8] text-[#242424] flex flex-col items-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative px-4 pb-20 shadow-sm border-x border-[#F0EAE1]/80 bg-[#FFFCF8]">
        <TopHeader
          currentLocation="Haridwar Teerth Kshetra"
          onRequestGPS={() => {}}
          lang={lang}
          onToggleLang={() => setLang(lang === 'en' ? 'hi' : 'en')}
        />

        <div className="pt-2">
          <h1 className="text-base font-bold text-[#242424]">
            {lang === 'hi' ? 'हरिद्वार दर्शन व यात्रा मार्गदर्शिका' : 'Explore Haridwar & Kumbh Services'}
          </h1>
          <p className="text-[11px] text-[#777777] mb-2">
            {lang === 'hi'
              ? 'सिद्ध शक्तिपीठ, पवित्र घाट, आश्रम, होटल व सात्विक खानपान'
              : 'Sacred Siddha Peeths, Holy Ghats, Ashrams, Hotels & Satvik Food'}
          </p>
        </div>

        <ExploreCatalogue lang={lang} />
        <AiTravelAssistant lang={lang} />
        <BottomNav lang={lang} />
      </div>
    </div>
  );
}

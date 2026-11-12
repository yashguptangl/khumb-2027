'use client';

import React, { useState } from 'react';
import TopHeader from '@/components/TopHeader';
import SnanCalendarView from '@/components/SnanCalendarView';
import BottomNav from '@/components/BottomNav';
import { Calendar, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

export default function KumbhCenterPage() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  return (
    <div className="min-h-screen bg-[#FFFCF8] text-[#242424] flex flex-col items-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative px-4 pb-20 shadow-sm border-x border-[#F0EAE1]/80 bg-[#FFFCF8]">
        <TopHeader
          currentLocation="Haridwar Ardh Kumbh HQ"
          onRequestGPS={() => {}}
          lang={lang}
          onToggleLang={() => setLang(lang === 'en' ? 'hi' : 'en')}
        />

        <div className="pt-3 mb-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#C65312] uppercase tracking-wider">
            <Sparkles size={13} />
            <span>{lang === 'hi' ? 'आधिकारिक सूचना केंद्र' : 'Official Information & Event Center'}</span>
          </div>
          <h1 className="text-base font-bold text-[#242424] mt-0.5">
            {lang === 'hi' ? 'हरिद्वार अर्ध कुंभ 2027 — स्नान कैलेंडर' : 'Haridwar Ardh Kumbh 2027 — Snan Schedule'}
          </h1>
          <p className="text-[11px] text-[#777777]">
            {lang === 'hi'
              ? 'समस्त 11 स्नान पर्व, 4 प्रमुख शाही अमृत स्नान एवं अधिकृत अखाड़ा परंपरा'
              : 'All 11 bathing festivals, 4 Royal Amrit Snan occasions & verified traditions'}
          </p>
        </div>

        {/* Snan Calendar with Verified Muhurat Status */}
        <SnanCalendarView lang={lang} />

        <BottomNav lang={lang} />
      </div>
    </div>
  );
}

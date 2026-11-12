'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ChevronRight, Sparkles, Clock, AlertCircle } from 'lucide-react';

interface KumbhCountdownProps {
  lang: 'en' | 'hi';
}

export default function KumbhCountdown({ lang }: KumbhCountdownProps) {
  // Ardh Kumbh 2027 start date: 2027-01-14 (Makar Sankranti)
  const targetDate = new Date('2027-01-14T00:00:00Z').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="w-full my-3 space-y-3">
      {/* Premium Bhagwa Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F47A20] via-[#DE6313] to-[#C65312] text-white p-4 shadow-lg shadow-[#F47A20]/25">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/90">
            <Sparkles size={14} className="text-[#FFF1E5]" />
            <span>{lang === 'hi' ? 'हरिद्वार अर्ध कुंभ 2027' : 'Haridwar Ardh Kumbh 2027'}</span>
          </div>
          <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
            14 Jan 2027
          </span>
        </div>

        <h3 className="text-sm font-medium text-white/95 leading-snug">
          {lang === 'hi'
            ? 'पावन अमृत स्नान का शुभारंभ होने में शेष समय'
            : 'Countdown to the Sacred Mahakumbh Snan'}
        </h3>

        {/* Countdown Digits */}
        <div className="grid grid-cols-4 gap-2 my-3 text-center">
          <div className="bg-black/15 backdrop-blur-md rounded-2xl py-2 px-1">
            <div className="text-xl font-bold tracking-tight">{timeLeft.days}</div>
            <div className="text-[9px] uppercase tracking-wider text-white/80">
              {lang === 'hi' ? 'दिन' : 'Days'}
            </div>
          </div>
          <div className="bg-black/15 backdrop-blur-md rounded-2xl py-2 px-1">
            <div className="text-xl font-bold tracking-tight">{timeLeft.hours}</div>
            <div className="text-[9px] uppercase tracking-wider text-white/80">
              {lang === 'hi' ? 'घंटे' : 'Hours'}
            </div>
          </div>
          <div className="bg-black/15 backdrop-blur-md rounded-2xl py-2 px-1">
            <div className="text-xl font-bold tracking-tight">{timeLeft.minutes}</div>
            <div className="text-[9px] uppercase tracking-wider text-white/80">
              {lang === 'hi' ? 'मिनट' : 'Mins'}
            </div>
          </div>
          <div className="bg-black/15 backdrop-blur-md rounded-2xl py-2 px-1">
            <div className="text-xl font-bold tracking-tight">{timeLeft.seconds}</div>
            <div className="text-[9px] uppercase tracking-wider text-white/80">
              {lang === 'hi' ? 'सेकंड' : 'Secs'}
            </div>
          </div>
        </div>

        {/* View Calendar Link */}
        <Link
          href="/kumbh-2027"
          className="flex items-center justify-between pt-2 border-t border-white/20 text-xs font-semibold text-white hover:text-white/80 transition-colors"
        >
          <div className="flex items-center gap-1.5">
            <Calendar size={13} />
            <span>{lang === 'hi' ? 'सभी 11 स्नान तिथियां देखें' : 'View All 11 Snan Dates'}</span>
          </div>
          <ChevronRight size={14} />
        </Link>
      </div>

      {/* Next Upcoming Amrit Snan Card */}
      <div className="rounded-2xl bg-white border border-[#F0EAE1] p-3 shadow-sm flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#218653]" />
            <span className="text-[11px] font-bold text-[#C65312] uppercase tracking-wider">
              {lang === 'hi' ? 'आगामी प्रमुख अमृत स्नान' : 'Upcoming Royal Amrit Snan'}
            </span>
          </div>
          <div className="text-xs font-bold text-[#242424]">
            {lang === 'hi' ? 'महाशिवरात्रि अमृत स्नान' : 'Mahashivratri First Amrit Snan'}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#777777]">
            <span className="font-semibold text-[#242424]">06 March 2027</span>
            <span>•</span>
            <span className="text-[#218653] font-medium bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
              {lang === 'hi' ? 'आधिकारिक पुष्टित' : 'Officially Confirmed'}
            </span>
          </div>
        </div>

        <Link
          href="/kumbh-2027"
          className="px-2.5 py-1.5 rounded-xl bg-[#FFF1E5] text-[#C65312] text-xs font-bold hover:bg-[#F47A20] hover:text-white transition-all flex items-center gap-0.5"
        >
          <span>{lang === 'hi' ? 'मुहूर्त' : 'Muhurat'}</span>
          <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
}

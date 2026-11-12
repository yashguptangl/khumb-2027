'use client';

import React from 'react';
import { Calendar, Sparkles, CheckCircle2, Clock, AlertTriangle, Info, Sunrise, Sunset } from 'lucide-react';
import { OFFICIAL_SNAN_DATES } from '@/data/catalog';

interface SnanCalendarViewProps {
  lang: 'en' | 'hi';
}

export default function SnanCalendarView({ lang }: SnanCalendarViewProps) {
  return (
    <div className="w-full pb-20 space-y-4">
      {/* Official Disclaimer Banner */}
      <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
        <Info size={16} className="text-[#C65312] flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">
            {lang === 'hi' ? 'आधिकारिक सूचना स्थिति: ' : 'Official Status Notice: '}
          </span>
          {lang === 'hi'
            ? 'अमृत स्नान की तिथियां अखिल भारतीय अखाड़ा परिषद एवं शासन द्वारा पुष्टित हैं। दैनिक सूक्ष्म मुहूर्त प्रशासनिक अंतिम अधिसूचना के उपरांत अद्यतन किए जाएंगे।'
            : 'Royal Amrit Snan dates are officially verified by the Akhara Parishad and administration. Exact daily muhurats will be finalized with the notification.'}
        </div>
      </div>

      {/* Snan Events List */}
      <div className="space-y-3">
        {OFFICIAL_SNAN_DATES.map((snan, index) => (
          <div
            key={snan.id}
            className={`bg-white rounded-3xl border p-4 shadow-sm transition-all ${
              snan.isAmritSnan
                ? 'border-[#F47A20]/40 ring-1 ring-[#F47A20]/15'
                : 'border-[#F0EAE1]'
            }`}
          >
            {/* Top row: Snan Number & Status Badge */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold bg-[#FFF1E5] text-[#C65312] px-2 py-0.5 rounded-full">
                  #{index + 1}
                </span>
                {snan.isAmritSnan && (
                  <span className="text-[10px] font-bold bg-gradient-to-r from-[#F47A20] to-[#C65312] text-white px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <Sparkles size={10} />
                    <span>{lang === 'hi' ? 'शाही अमृत स्नान' : 'Royal Amrit Snan'}</span>
                  </span>
                )}
              </div>

              {/* Verification Status Badge */}
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                  snan.status === 'OFFICIALLY_CONFIRMED'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                {snan.status === 'OFFICIALLY_CONFIRMED'
                  ? lang === 'hi'
                    ? 'आधिकारिक पुष्टित'
                    : 'Officially Confirmed'
                  : lang === 'hi'
                  ? 'अनंतिम (Provisional)'
                  : 'Provisional'}
              </span>
            </div>

            {/* Occasion & Date */}
            <h3 className="text-sm font-bold text-[#242424]">
              {lang === 'hi' ? snan.occasionHi : snan.occasionEn}
            </h3>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#F47A20] mt-0.5">
              <Calendar size={13} />
              <span>{snan.date}</span>
              <span className="text-[#777777] font-normal text-[11px]">• {snan.tithi}</span>
            </div>

            <p className="text-[11px] text-[#555555] mt-1.5 leading-relaxed">
              {lang === 'hi' ? snan.descriptionHi : snan.descriptionEn}
            </p>

            {/* Timings & Solar Details */}
            <div className="mt-3 pt-2.5 border-t border-[#F0EAE1] grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-[#FFFCF8] p-2 rounded-xl border border-[#F0EAE1]">
                <div className="text-[#777777] font-medium flex items-center gap-1">
                  <Clock size={11} className="text-[#F47A20]" />
                  <span>Snan Muhurat</span>
                </div>
                <div className="font-semibold text-[#242424] mt-0.5 truncate">
                  {snan.muhuratStartTime}
                </div>
              </div>

              <div className="bg-[#FFFCF8] p-2 rounded-xl border border-[#F0EAE1]">
                <div className="text-[#777777] font-medium flex items-center gap-1">
                  <Sunrise size={11} className="text-amber-600" />
                  <span>Sunrise / Sunset</span>
                </div>
                <div className="font-semibold text-[#242424] mt-0.5">
                  {snan.sunrise} - {snan.sunset}
                </div>
              </div>
            </div>

            <div className="text-[9px] text-[#9E9E9E] mt-2 text-right">
              Source: {snan.sourceAuthority}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Megaphone, AlertCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import { OFFICIAL_ANNOUNCEMENTS } from '@/data/catalog';

interface OfficialUpdatesProps {
  lang: 'en' | 'hi';
}

export default function OfficialUpdates({ lang }: OfficialUpdatesProps) {
  return (
    <div className="w-full my-4">
      <div className="flex items-center justify-between mb-2 px-1">
        <h2 className="text-sm font-bold text-[#242424] flex items-center gap-1.5">
          <Megaphone size={15} className="text-[#C65312]" />
          <span>{lang === 'hi' ? 'आधिकारिक सूचना एवं यातायात परामर्श' : 'Official Announcements'}</span>
        </h2>
        <span className="text-[10px] text-[#218653] font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Verified
        </span>
      </div>

      <div className="space-y-2">
        {OFFICIAL_ANNOUNCEMENTS.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-2xl border transition-all ${
              item.isUrgent
                ? 'bg-amber-50/70 border-amber-200/80 shadow-sm'
                : 'bg-white border-[#F0EAE1] shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                  item.category === 'TRAFFIC'
                    ? 'bg-orange-100 text-[#C65312]'
                    : item.category === 'GHAT_ACCESS'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {item.category.replace('_', ' ')}
              </span>
              <span className="text-[10px] text-[#777777] font-medium">{item.authority}</span>
            </div>

            <h3 className="text-xs font-bold text-[#242424] leading-snug">
              {lang === 'hi' ? item.titleHi : item.titleEn}
            </h3>

            <p className="text-[11px] text-[#555555] mt-1 leading-relaxed">
              {lang === 'hi' ? item.contentHi : item.contentEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

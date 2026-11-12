'use client';

import React from 'react';
import { MapPin, Bell, Globe, Sparkles } from 'lucide-react';

interface TopHeaderProps {
  currentLocation: string;
  onRequestGPS: () => void;
  lang: 'en' | 'hi';
  onToggleLang: () => void;
  hasNotifications?: boolean;
}

export default function TopHeader({
  currentLocation,
  onRequestGPS,
  lang,
  onToggleLang,
  hasNotifications = true
}: TopHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full max-w-md mx-auto ios-glass-header px-4 pt-3 pb-2.5 flex items-center justify-between border-b border-[#F47A20]/15">
      <div className="flex items-center gap-2.5">
        {/* Brand Icon */}
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#C65312] to-[#F47A20] flex items-center justify-center text-white shadow-md shadow-[#F47A20]/25">
          <Sparkles size={20} className="animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold text-[#242424] tracking-tight">KumbhConnect</span>
            <span className="text-[10px] bg-[#FFF1E5] text-[#C65312] font-semibold px-1.5 py-0.5 rounded-full border border-[#F47A20]/20">
              2027
            </span>
          </div>
          {/* Location button */}
          <button
            onClick={onRequestGPS}
            className="flex items-center gap-1 text-[11px] text-[#777777] hover:text-[#F47A20] transition-colors mt-0.5"
            title="Click to refresh current GPS location"
          >
            <MapPin size={11} className="text-[#F47A20]" />
            <span className="font-medium truncate max-w-[130px]">{currentLocation}</span>
            <span className="text-[10px] text-[#F47A20] underline ml-0.5">Change</span>
          </button>
        </div>
      </div>

      {/* Action shortcuts */}
      <div className="flex items-center gap-2">
        {/* Language switcher */}
        <button
          onClick={onToggleLang}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-[#F0EAE1] text-xs font-semibold text-[#242424] shadow-sm active:scale-95 transition-transform"
        >
          <Globe size={13} className="text-[#F47A20]" />
          <span>{lang === 'hi' ? 'ENG' : 'हिंदी'}</span>
        </button>

        {/* Notification Bell */}
        <button
          className="relative w-8 h-8 rounded-full bg-white border border-[#F0EAE1] flex items-center justify-center text-[#242424] shadow-sm active:scale-95 transition-transform"
          aria-label="Notifications"
        >
          <Bell size={15} />
          {hasNotifications && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D94040] rounded-full ring-2 ring-white" />
          )}
        </button>
      </div>
    </header>
  );
}

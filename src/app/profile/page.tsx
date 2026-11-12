'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Heart,
  CalendarCheck,
  ShieldAlert,
  Settings,
  Globe,
  Sliders,
  ChevronRight,
  LogOut,
  Sparkles,
  QrCode
} from 'lucide-react';
import TopHeader from '@/components/TopHeader';
import RoleDashboards from '@/components/RoleDashboards';
import BottomNav from '@/components/BottomNav';

export default function ProfilePage() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [showRoleDashboards, setShowRoleDashboards] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFCF8] text-[#242424] flex flex-col items-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative px-4 pb-20 shadow-sm border-x border-[#F0EAE1]/80 bg-[#FFFCF8]">
        <TopHeader
          currentLocation="Haridwar Pilgrim Account"
          onRequestGPS={() => {}}
          lang={lang}
          onToggleLang={() => setLang(lang === 'en' ? 'hi' : 'en')}
        />

        <div className="space-y-4 pt-3">
          {/* User Profile Card */}
          <div className="bg-white rounded-3xl border border-[#F0EAE1] p-4 shadow-sm flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#C65312] to-[#F47A20] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#F47A20]/25">
              P
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-[#242424] truncate">Pradeep V.</h2>
                <span className="text-[9px] font-bold bg-[#FFF1E5] text-[#C65312] px-2 py-0.2 rounded-full border border-[#F47A20]/20">
                  Pilgrim
                </span>
              </div>
              <p className="text-[11px] text-[#777777]">+91 98112 00027</p>
              <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                ● Ardh Kumbh 2027 Registered
              </div>
            </div>
          </div>

          {/* Business & Administration Dashboard Toggle */}
          <div className="bg-gradient-to-r from-[#FFF1E5] to-[#FFFCF8] border border-[#F47A20]/30 rounded-3xl p-3.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#C65312] uppercase tracking-wider block">
                  Management Portal
                </span>
                <h3 className="text-xs font-bold text-[#242424] mt-0.5">
                  Business & Super Admin Workspace
                </h3>
              </div>
              <button
                onClick={() => setShowRoleDashboards(!showRoleDashboards)}
                className="px-3 py-1.5 rounded-xl bg-[#F47A20] text-white text-xs font-bold shadow-sm active:scale-95 transition-all"
              >
                {showRoleDashboards ? 'Hide' : 'Open Dashboard'}
              </button>
            </div>
          </div>

          {/* Conditional Multi-Role Dashboard */}
          {showRoleDashboards && <RoleDashboards lang={lang} />}

          {/* Quick Settings & Navigation Menu */}
          <div className="bg-white rounded-3xl border border-[#F0EAE1] overflow-hidden shadow-sm divide-y divide-[#F0EAE1]">
            <Link
              href="/bookings"
              className="flex items-center justify-between p-3.5 hover:bg-[#FFF1E5]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <CalendarCheck size={18} className="text-[#F47A20]" />
                <span className="text-xs font-semibold text-[#242424]">
                  {lang === 'hi' ? 'मेरी बुकिंग एवं पूछताछ' : 'My Bookings & Inquiries'}
                </span>
              </div>
              <ChevronRight size={15} className="text-[#777777]" />
            </Link>

            <Link
              href="/safety"
              className="flex items-center justify-between p-3.5 hover:bg-[#FFF1E5]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShieldAlert size={18} className="text-[#D94040]" />
                <span className="text-xs font-semibold text-[#242424]">
                  {lang === 'hi' ? 'आपातकालीन सहायता (112 & अस्पताल)' : 'Emergency Help & Safety (112)'}
                </span>
              </div>
              <ChevronRight size={15} className="text-[#777777]" />
            </Link>

            <Link
              href="/kumbh-2027"
              className="flex items-center justify-between p-3.5 hover:bg-[#FFF1E5]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-[#C65312]" />
                <span className="text-xs font-semibold text-[#242424]">
                  {lang === 'hi' ? 'कुंभ 2027 आधिकारिक इतिहास व परंपरा' : 'Kumbh 2027 Official Guide'}
                </span>
              </div>
              <ChevronRight size={15} className="text-[#777777]" />
            </Link>
          </div>
        </div>

        <BottomNav lang={lang} />
      </div>
    </div>
  );
}

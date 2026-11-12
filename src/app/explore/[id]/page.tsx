'use client';

import React, { useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Share2,
  Heart,
  Navigation,
  Clock,
  Ticket,
  Sparkles,
  MapPin,
  Info,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { HARIDWAR_DESTINATIONS } from '@/data/catalog';
import BottomNav from '@/components/BottomNav';

function DestinationDetailContent() {
  const params = useParams();
  const router = useRouter();
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [isSaved, setIsSaved] = useState(false);

  const destination = HARIDWAR_DESTINATIONS.find((d) => d.id === params.id) || HARIDWAR_DESTINATIONS[0];

  return (
    <div className="min-h-screen bg-[#FFFCF8] text-[#242424] flex flex-col items-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative pb-24 shadow-sm border-x border-[#F0EAE1]/80 bg-[#FFFCF8]">
        {/* Cover Image & Top Floating Actions */}
        <div className="relative h-72 w-full">
          <img
            src={destination.imageUrl}
            alt={destination.nameEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

          {/* Floating Navigation Header */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-[#242424] flex items-center justify-center shadow-md active:scale-95"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md text-[#242424] text-xs font-bold shadow-md"
              >
                {lang === 'hi' ? 'ENG' : 'हिंदी'}
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-[#242424] flex items-center justify-center shadow-md active:scale-95"
              >
                <Heart size={18} className={isSaved ? 'text-red-500 fill-red-500' : ''} />
              </button>
            </div>
          </div>

          {/* Name & Badges on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-bold bg-[#F47A20] px-2 py-0.5 rounded-full uppercase">
                {destination.category}
              </span>
              <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full font-medium">
                {destination.distanceFromHarKiPauriKm} km from Har Ki Pauri
              </span>
            </div>
            <h1 className="text-xl font-extrabold leading-tight">
              {lang === 'hi' ? destination.nameHi : destination.nameEn}
            </h1>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-4">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-white rounded-2xl border border-[#F0EAE1] shadow-sm">
              <div className="text-[10px] text-[#777777] font-semibold flex items-center gap-1">
                <Clock size={12} className="text-[#F47A20]" />
                <span>Timings</span>
              </div>
              <div className="font-bold text-[#242424] mt-1 text-[11px] truncate">
                {destination.timings}
              </div>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-[#F0EAE1] shadow-sm">
              <div className="text-[10px] text-[#777777] font-semibold flex items-center gap-1">
                <Ticket size={12} className="text-[#218653]" />
                <span>Entry Fee</span>
              </div>
              <div className="font-bold text-[#242424] mt-1 text-[11px] truncate">
                {destination.entryFee}
              </div>
            </div>
          </div>

          {/* Ropeway Info if present */}
          {destination.ropewayInfo && (
            <div className="p-3 bg-[#FFF1E5] rounded-2xl border border-[#F47A20]/25 text-[#C65312] text-xs flex items-center gap-2">
              <Sparkles size={16} className="flex-shrink-0" />
              <div className="font-semibold">{destination.ropewayInfo}</div>
            </div>
          )}

          {/* Description */}
          <div className="bg-white rounded-3xl border border-[#F0EAE1] p-4 shadow-sm space-y-2">
            <h2 className="text-xs font-bold text-[#C65312] uppercase tracking-wider">
              {lang === 'hi' ? 'तीर्थ परिचय व महत्व' : 'About & Significance'}
            </h2>
            <p className="text-xs text-[#242424] leading-relaxed">
              {lang === 'hi' ? destination.descriptionHi : destination.descriptionEn}
            </p>
            <p className="text-xs text-[#555555] leading-relaxed pt-2 border-t border-[#F0EAE1]">
              <span className="font-bold text-[#242424]">
                {lang === 'hi' ? 'पौराणिक मान्यता: ' : 'Scriptural Context: '}
              </span>
              {lang === 'hi' ? destination.significanceHi : destination.significanceEn}
            </p>
          </div>

          {/* Best Time to Visit */}
          <div className="p-3.5 bg-white rounded-2xl border border-[#F0EAE1] shadow-sm flex items-center gap-2 text-xs">
            <Calendar size={16} className="text-[#F47A20] flex-shrink-0" />
            <div>
              <span className="text-[10px] text-[#777777] block font-bold">
                {lang === 'hi' ? 'दर्शन का श्रेष्ठ समय' : 'Best Time to Visit'}
              </span>
              <span className="font-bold text-[#242424]">{destination.bestTimeToVisit}</span>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex gap-2 pt-2">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-[#F47A20] text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#F47A20]/25 active:scale-95 transition-all"
            >
              <Navigation size={14} />
              <span>{lang === 'hi' ? 'सीधा नेविगेशन शुरू करें' : 'Get Live Directions'}</span>
            </a>

            <Link
              href="/bookings"
              className="px-4 py-3 bg-[#FFF1E5] text-[#C65312] rounded-2xl text-xs font-bold hover:bg-[#F47A20] hover:text-white transition-all text-center"
            >
              {lang === 'hi' ? 'होटल खोजें' : 'Nearby Hotels'}
            </Link>
          </div>
        </div>

        <BottomNav lang={lang} />
      </div>
    </div>
  );
}

export default function DestinationDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFCF8] p-6 text-center text-xs">Loading sacred place...</div>}>
      <DestinationDetailContent />
    </Suspense>
  );
}
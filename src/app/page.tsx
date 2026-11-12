'use client';

import React, { useState } from 'react';
import TopHeader from '@/components/TopHeader';
import UniversalSearch from '@/components/UniversalSearch';
import QuickActionGrid from '@/components/QuickActionGrid';
import KumbhCountdown from '@/components/KumbhCountdown';
import NearbyDiscovery from '@/components/NearbyDiscovery';
import FeaturedAccommodations from '@/components/FeaturedAccommodations';
import OfficialUpdates from '@/components/OfficialUpdates';
import BottomNav from '@/components/BottomNav';
import AiTravelAssistant from '@/components/AiTravelAssistant';

export default function Home() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [currentLocation, setCurrentLocation] = useState('Har Ki Pauri, Haridwar');
  const [userCoords, setUserCoords] = useState({ lat: 29.9577, lon: 78.1707 });

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleRequestGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          });
          setCurrentLocation('GPS Located (Haridwar)');
        },
        () => {
          setCurrentLocation('Har Ki Pauri (Default)');
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFCF8] text-[#242424] flex flex-col items-center">
      {/* Mobile-first centered frame container */}
      <div className="w-full max-w-md min-h-screen flex flex-col relative px-4 pb-24 shadow-sm border-x border-[#F0EAE1]/80 bg-[#FFFCF8]">
        {/* Sticky iOS Top Header */}
        <TopHeader
          currentLocation={currentLocation}
          onRequestGPS={handleRequestGPS}
          lang={lang}
          onToggleLang={handleToggleLang}
        />

        {/* Universal Search Bar */}
        <UniversalSearch lang={lang} />

        {/* Quick Action Shortcuts Grid */}
        <QuickActionGrid lang={lang} />

        {/* Kumbh 2027 Countdown & Upcoming Royal Amrit Snan */}
        <KumbhCountdown lang={lang} />

        {/* Nearby Discovery with Real GPS Distance calculation */}
        <NearbyDiscovery
          userLat={userCoords.lat}
          userLon={userCoords.lon}
          locationName={currentLocation}
          lang={lang}
        />

        {/* Accommodation Marketplace Carousel */}
        <FeaturedAccommodations lang={lang} />

        {/* Official News, Traffic & Crowd Advisories */}
        <OfficialUpdates lang={lang} />

        {/* AI Travel Assistant Chatbot Floating Widget */}
        <AiTravelAssistant lang={lang} />

        {/* Persistent iOS Bottom 5-Tab Navigation Bar */}
        <BottomNav lang={lang} />
      </div>
    </div>
  );
}

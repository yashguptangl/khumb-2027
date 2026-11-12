'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Building,
  Utensils,
  Car,
  Star,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
  PhoneCall,
  Send
} from 'lucide-react';
import {
  HARIDWAR_DESTINATIONS,
  MOCK_HOTELS,
  MOCK_RESTAURANTS,
  MOCK_TRANSPORTS
} from '@/data/catalog';

interface ExploreCatalogueProps {
  initialTab?: string;
  lang: 'en' | 'hi';
}

export default function ExploreCatalogue({
  initialTab = 'destinations',
  lang
}: ExploreCatalogueProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const tabs = [
    { id: 'destinations', nameEn: 'Temples & Ghats', nameHi: 'तीर्थ एवं मंदिर', icon: Compass },
    { id: 'accommodations', nameEn: 'Hotels & Ashrams', nameHi: 'आवास व आश्रम', icon: Building },
    { id: 'food', nameEn: 'Satvik Dining', nameHi: 'सात्विक भोजन', icon: Utensils },
    { id: 'transport', nameEn: 'Taxi & Transport', nameHi: 'टैक्सी सेवा', icon: Car }
  ];

  return (
    <div className="w-full pb-20">
      {/* Top Tab Bar */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 border-b border-[#F0EAE1]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#F47A20] text-white shadow-md shadow-[#F47A20]/25'
                  : 'bg-white border border-[#F0EAE1] text-[#777777] hover:text-[#242424]'
              }`}
            >
              <Icon size={14} />
              <span>{lang === 'hi' ? tab.nameHi : tab.nameEn}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content 1: Temples & Ghats */}
      {activeTab === 'destinations' && (
        <div className="my-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#242424]">
              {HARIDWAR_DESTINATIONS.length}{' '}
              {lang === 'hi' ? 'सत्यापित तीर्थ स्थल' : 'Verified Sacred Sites'}
            </span>
            <div className="flex items-center gap-1 text-[11px]">
              {['ALL', 'TEMPLE', 'GHAT', 'ASHRAM'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#FFF1E5] text-[#C65312] font-bold border border-[#F47A20]/30'
                      : 'text-[#777777]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {HARIDWAR_DESTINATIONS.filter((d) =>
              selectedCategory === 'ALL' ? true : d.category === selectedCategory
            ).map((dest) => (
              <Link
                key={dest.id}
                href={`/explore/${dest.id}`}
                className="block bg-white rounded-2xl border border-[#F0EAE1] overflow-hidden shadow-sm hover:shadow transition-all group"
              >
                <div className="relative h-40 w-full">
                  <img
                    src={dest.imageUrl}
                    alt={dest.nameEn}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    {dest.category}
                  </div>
                  {dest.featured && (
                    <div className="absolute top-2.5 right-2.5 bg-[#F47A20] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <Sparkles size={11} />
                      <span>Must Visit</span>
                    </div>
                  )}
                </div>

                <div className="p-3.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#242424]">
                      {lang === 'hi' ? dest.nameHi : dest.nameEn}
                    </h3>
                    <span className="text-[10px] font-bold text-[#C65312] bg-[#FFF1E5] px-2 py-0.5 rounded-full">
                      {dest.distanceFromHarKiPauriKm} km from Har Ki Pauri
                    </span>
                  </div>

                  <p className="text-[11px] text-[#777777] line-clamp-2 mt-1">
                    {lang === 'hi' ? dest.descriptionHi : dest.descriptionEn}
                  </p>

                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#F0EAE1] text-[10px] text-[#777777]">
                    <Clock size={11} className="text-[#F47A20]" />
                    <span className="truncate">{dest.timings}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 2: Accommodations */}
      {activeTab === 'accommodations' && (
        <div className="my-4 space-y-3">
          <div className="text-xs font-bold text-[#242424] mb-2">
            {lang === 'hi' ? 'होटल, धर्मशाला व आश्रम सूची' : 'Hotels, Dharamshalas & Ashrams'}
          </div>

          <div className="space-y-3">
            {MOCK_HOTELS.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-2xl border border-[#F0EAE1] p-3.5 shadow-sm space-y-2.5"
              >
                <div className="flex gap-3">
                  <img
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-[#242424] truncate">{hotel.name}</h3>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                        <Star size={10} className="fill-amber-500" />
                        <span>{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-[#777777] truncate mt-0.5">{hotel.address}</div>
                    <div className="flex items-center gap-1 mt-1 text-[9px] text-[#218653] font-medium">
                      <CheckCircle2 size={11} />
                      <span>{hotel.roomsAvailable} Rooms Available</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {hotel.amenities.map((am) => (
                    <span
                      key={am}
                      className="text-[9px] bg-[#FFFCF8] text-[#777777] border border-[#F0EAE1] px-1.5 py-0.5 rounded"
                    >
                      {am}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#F0EAE1]">
                  <div>
                    <span className="text-[10px] text-[#777777]">
                      {hotel.stayType === 'FREE' ? 'Nishulk Stay' : 'Starting from'}
                    </span>
                    <div className="text-xs font-bold text-[#F47A20]">
                      {hotel.pricePerNight === 0 ? 'मुफ्त आवास (Free)' : `₹${hotel.pricePerNight}/night`}
                    </div>
                  </div>

                  <Link
                    href={`/bookings?property=${hotel.id}&name=${encodeURIComponent(hotel.name)}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#F47A20] text-white text-xs font-bold hover:bg-[#DE6313] transition-all shadow-sm"
                  >
                    <Send size={12} />
                    <span>{lang === 'hi' ? 'पूछताछ भेजें' : 'Send Enquiry'}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 3: Food */}
      {activeTab === 'food' && (
        <div className="my-4 space-y-3">
          <div className="text-xs font-bold text-[#242424] mb-2">
            {lang === 'hi' ? 'शुद्ध सात्विक भोजन व भोजनालय' : 'Satvik Restaurants & Sweet Shops'}
          </div>

          <div className="space-y-3">
            {MOCK_RESTAURANTS.map((rest) => (
              <div
                key={rest.id}
                className="bg-white rounded-2xl border border-[#F0EAE1] p-3.5 shadow-sm space-y-3"
              >
                <div className="flex gap-3">
                  <img
                    src={rest.imageUrl}
                    alt={rest.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-[#242424] truncate">{rest.name}</h3>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        {rest.category}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#777777] truncate mt-0.5">{rest.address}</div>
                    <div className="text-[10px] font-semibold text-[#F47A20] mt-1">
                      Avg. ₹{rest.avgPriceForTwo} for two
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFF1E5]/40 rounded-xl p-2.5 space-y-1.5 border border-[#F47A20]/15">
                  <span className="text-[10px] font-bold text-[#C65312] uppercase tracking-wider block">
                    {lang === 'hi' ? 'लोकप्रिय व्यंजन (Menu Highlights)' : 'Menu Highlights'}
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {rest.menu.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between text-[10px] bg-white p-1.5 rounded-lg border border-[#F0EAE1]"
                      >
                        <span className="text-[#242424] truncate font-medium">{item.name}</span>
                        <span className="text-[#F47A20] font-bold ml-1">₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 4: Transport */}
      {activeTab === 'transport' && (
        <div className="my-4 space-y-3">
          <div className="text-xs font-bold text-[#242424] mb-2">
            {lang === 'hi' ? 'टैक्सी, ई-रिक्शा व वाहन बुकिंग' : 'Taxi & Local Transport Operators'}
          </div>

          <div className="space-y-3">
            {MOCK_TRANSPORTS.map((trans) => (
              <div
                key={trans.id}
                className="bg-white rounded-2xl border border-[#F0EAE1] p-3.5 shadow-sm space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                      <Car size={16} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#242424]">{trans.operatorName}</h3>
                      <div className="text-[10px] text-[#777777]">
                        Driver: {trans.driverName} • {trans.vehicleType.replace('_', ' ')}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-[#218653] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Verified
                  </span>
                </div>

                <div className="text-[10px] text-[#555555] bg-[#FFFCF8] p-2 rounded-xl border border-[#F0EAE1]">
                  <span className="font-semibold text-[#242424]">Routes / Service Area: </span>
                  {trans.serviceArea}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#F0EAE1]">
                  <div>
                    <span className="text-[10px] text-[#777777]">Base Fare</span>
                    <div className="text-xs font-bold text-[#F47A20]">
                      ₹{trans.baseFare} (+₹{trans.perKmRate}/km)
                    </div>
                  </div>

                  <Link
                    href={`/bookings?transport=${trans.id}&name=${encodeURIComponent(trans.operatorName)}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#F47A20] text-white text-xs font-bold hover:bg-[#DE6313] transition-all shadow-sm"
                  >
                    <span>{lang === 'hi' ? 'किराया कोटेशन लें' : 'Request Fare Quote'}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

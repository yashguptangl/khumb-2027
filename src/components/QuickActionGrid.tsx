'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Waves,
  Building,
  Home,
  Utensils,
  Car,
  Flame,
  Calendar,
  Eye,
  HeartPulse,
  ParkingCircle,
  ShoppingBag,
  AlertTriangle
} from 'lucide-react';

interface QuickActionGridProps {
  lang: 'en' | 'hi';
}

export default function QuickActionGrid({ lang }: QuickActionGridProps) {
  const actions = [
    {
      id: 'temples',
      nameEn: 'Nearby Temples',
      nameHi: 'प्रमुख मंदिर',
      href: '/explore?category=TEMPLE',
      icon: Compass,
      bg: 'bg-[#FFF1E5]',
      color: 'text-[#C65312]'
    },
    {
      id: 'ghats',
      nameEn: 'Holy Ghats',
      nameHi: 'पवित्र घाट',
      href: '/explore?category=GHAT',
      icon: Waves,
      bg: 'bg-blue-50',
      color: 'text-blue-600'
    },
    {
      id: 'hotels',
      nameEn: 'Hotels',
      nameHi: 'होटल',
      href: '/explore?tab=accommodations&type=HOTEL',
      icon: Building,
      bg: 'bg-amber-50',
      color: 'text-amber-700'
    },
    {
      id: 'dharamshala',
      nameEn: 'Dharamshalas',
      nameHi: 'धर्मशाला',
      href: '/explore?tab=accommodations&type=DHARAMSHALA',
      icon: Home,
      bg: 'bg-emerald-50',
      color: 'text-emerald-700'
    },
    {
      id: 'restaurants',
      nameEn: 'Satvik Food',
      nameHi: 'सात्विक भोजन',
      href: '/explore?tab=food',
      icon: Utensils,
      bg: 'bg-orange-50',
      color: 'text-[#F47A20]'
    },
    {
      id: 'transport',
      nameEn: 'Taxi & Transport',
      nameHi: 'टैक्सी सेवा',
      href: '/explore?tab=transport',
      icon: Car,
      bg: 'bg-purple-50',
      color: 'text-purple-700'
    },
    {
      id: 'aarti',
      nameEn: 'Ganga Aarti',
      nameHi: 'गंगा आरती',
      href: '/explore/har-ki-pauri',
      icon: Flame,
      bg: 'bg-rose-50',
      color: 'text-rose-600'
    },
    {
      id: 'snan',
      nameEn: 'Snan Calendar',
      nameHi: 'स्नान कैलेंडर',
      href: '/kumbh-2027',
      icon: Calendar,
      bg: 'bg-[#FFF1E5]',
      color: 'text-[#C65312]'
    },
    {
      id: 'tourist',
      nameEn: 'Sightseeing',
      nameHi: 'दर्शनीय स्थल',
      href: '/explore?category=NATURE',
      icon: Eye,
      bg: 'bg-teal-50',
      color: 'text-teal-700'
    },
    {
      id: 'medical',
      nameEn: 'Medical Help',
      nameHi: 'चिकित्सा सहायता',
      href: '/safety#medical',
      icon: HeartPulse,
      bg: 'bg-red-50',
      color: 'text-red-600'
    },
    {
      id: 'parking',
      nameEn: 'Parking Lots',
      nameHi: 'पार्किंग स्थल',
      href: '/map?filter=parking',
      icon: ParkingCircle,
      bg: 'bg-indigo-50',
      color: 'text-indigo-600'
    },
    {
      id: 'emergency',
      nameEn: 'Emergency 112',
      nameHi: 'आपातकालीन 112',
      href: '/safety',
      icon: AlertTriangle,
      bg: 'bg-red-100',
      color: 'text-[#D94040]'
    }
  ];

  return (
    <div className="w-full my-3">
      <div className="grid grid-cols-4 gap-2.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <Link
              key={act.id}
              href={act.href}
              className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-[#F0EAE1] shadow-sm hover:shadow active:scale-95 transition-all text-center group"
            >
              <div
                className={`w-11 h-11 rounded-2xl ${act.bg} ${act.color} flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-105 transition-transform`}
              >
                <Icon size={20} strokeWidth={2.1} />
              </div>
              <span className="text-[10px] font-medium text-[#242424] leading-tight line-clamp-1">
                {lang === 'hi' ? act.nameHi : act.nameEn}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

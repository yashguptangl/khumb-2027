'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, CalendarCheck, MapPin, User } from 'lucide-react';

interface BottomNavProps {
  lang?: 'en' | 'hi';
}

export default function BottomNav({ lang = 'en' }: BottomNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      id: 'home',
      nameEn: 'Home',
      nameHi: 'होम',
      href: '/',
      icon: Home
    },
    {
      id: 'explore',
      nameEn: 'Explore',
      nameHi: 'दर्शन',
      href: '/explore',
      icon: Compass
    },
    {
      id: 'bookings',
      nameEn: 'Bookings',
      nameHi: 'बुकिंग',
      href: '/bookings',
      icon: CalendarCheck
    },
    {
      id: 'map',
      nameEn: 'Map',
      nameHi: 'नक्शा',
      href: '/map',
      icon: MapPin
    },
    {
      id: 'profile',
      nameEn: 'Profile',
      nameHi: 'प्रोफ़ाइल',
      href: '/profile',
      icon: User
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto ios-glass border-t border-[#F47A20]/20 pb-safe shadow-lg">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full py-1 transition-all duration-200 select-none ${
                isActive ? 'text-[#F47A20] font-semibold scale-105' : 'text-[#777777] hover:text-[#242424]'
              }`}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.4 : 1.9} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#F47A20] rounded-full" />
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">
                {lang === 'hi' ? item.nameHi : item.nameEn}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

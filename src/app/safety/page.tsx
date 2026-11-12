'use client';

import React, { useState } from 'react';
import TopHeader from '@/components/TopHeader';
import BottomNav from '@/components/BottomNav';
import {
  AlertTriangle,
  PhoneCall,
  HeartPulse,
  Shield,
  LifeBuoy,
  Info,
  MapPin,
  ExternalLink
} from 'lucide-react';

export default function SafetyPage() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const emergencyContacts = [
    { title: 'Emergency National Helpline', number: '112', desc: 'Police, Fire, Ambulance 24x7', color: 'bg-red-600' },
    { title: 'Uttarakhand 108 Ambulance', number: '108', desc: 'Emergency Medical & Cardiac Care', color: 'bg-rose-600' },
    { title: 'Kumbh Mela Control Room', number: '+91 1334 227000', desc: 'District Administration HQ', color: 'bg-[#C65312]' },
    { title: 'Haridwar Women Helpline', number: '1090', desc: 'Special 24x7 Women Safety Wing', color: 'bg-purple-600' }
  ];

  const hospitals = [
    { name: 'Mela Base Hospital (Bairagi Camp)', contact: '+91 1334 226108', type: 'Special 100-Bed Field Hospital' },
    { name: 'District Hospital (Male & Female), Haridwar', contact: '+91 1334 227038', type: 'General & Trauma Emergency' },
    { name: 'Ramakrishna Mission Sevashrama, Kankhal', contact: '+91 1334 246141', type: 'Charitable Multispecialty' }
  ];

  return (
    <div className="min-h-screen bg-[#FFFCF8] text-[#242424] flex flex-col items-center">
      <div className="w-full max-w-md min-h-screen flex flex-col relative px-4 pb-20 shadow-sm border-x border-[#F0EAE1]/80 bg-[#FFFCF8]">
        <TopHeader
          currentLocation="Haridwar Emergency Desk"
          onRequestGPS={() => {}}
          lang={lang}
          onToggleLang={() => setLang(lang === 'en' ? 'hi' : 'en')}
        />

        <div className="pt-3 space-y-4">
          {/* Header Disclaimer */}
          <div className="p-3 bg-red-50 border border-red-200/80 rounded-2xl text-red-950 text-xs flex items-start gap-2">
            <AlertTriangle size={16} className="text-[#D94040] flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">
                {lang === 'hi' ? 'आपातकालीन सहायता केंद्र: ' : 'Emergency Help & Safety: '}
              </span>
              {lang === 'hi'
                ? 'किसी भी आपात स्थिति में सीधे 112 या 108 डायल करें। यह ऐप उत्तराखंड शासन एवं मेला पुलिस के आपातकालीन नंबर सीधे उपलब्ध कराता है।'
                : 'In any emergency, dial 112 or 108 directly. KumbhConnect provides direct dials to official Mela health and police desks.'}
            </div>
          </div>

          {/* Quick Direct Dial Buttons */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-[#242424]">
              {lang === 'hi' ? 'त्वरित आपातकालीन नंबर' : 'Primary Emergency Hotlines'}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {emergencyContacts.map((c, i) => (
                <a
                  key={i}
                  href={`tel:${c.number.replace(/\s+/g, '')}`}
                  className="p-3 rounded-2xl bg-white border border-[#F0EAE1] shadow-sm hover:shadow flex flex-col justify-between active:scale-95 transition-all"
                >
                  <div>
                    <div className="text-[10px] text-[#777777] font-medium leading-tight">{c.title}</div>
                    <div className="text-base font-extrabold text-[#D94040] mt-1">{c.number}</div>
                  </div>
                  <div className="text-[9px] text-[#777777] mt-1.5 flex items-center gap-1 font-medium">
                    <PhoneCall size={10} className="text-[#F47A20]" />
                    <span>Tap to Call</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Hospitals and Medical Kiosks */}
          <div className="bg-white rounded-3xl border border-[#F0EAE1] p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <HeartPulse size={16} className="text-red-600" />
              <h3 className="text-xs font-bold text-[#242424]">
                {lang === 'hi' ? 'निकटवर्ती प्रमुख अस्पताल व चिकित्सा केंद्र' : 'Hospitals & Medical Centers'}
              </h3>
            </div>

            <div className="space-y-2 divide-y divide-[#F0EAE1]">
              {hospitals.map((h, i) => (
                <div key={i} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-semibold text-[#242424]">{h.name}</h4>
                    <span className="text-[10px] text-[#777777]">{h.type}</span>
                  </div>
                  <a
                    href={`tel:${h.contact.replace(/\s+/g, '')}`}
                    className="p-2 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[11px]"
                  >
                    Call
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BottomNav lang={lang} />
      </div>
    </div>
  );
}

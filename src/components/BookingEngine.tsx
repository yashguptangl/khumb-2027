'use client';

import React, { useState } from 'react';
import {
  CalendarCheck,
  Send,
  CheckCircle2,
  Clock,
  Building,
  User,
  Phone,
  Calendar,
  Users,
  FileText,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { BookingEnquiry } from '@/types';

interface BookingEngineProps {
  initialProperty?: string;
  initialName?: string;
  lang: 'en' | 'hi';
}

export default function BookingEngine({
  initialProperty,
  initialName,
  lang
}: BookingEngineProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '2027-03-06', // Default to 1st Amrit Snan
    guestsCount: 2,
    requirements: '',
    propertyName: initialName || 'Ganga Lahari Heritage Hotel'
  });

  const [activeEnquiries, setActiveEnquiries] = useState<BookingEnquiry[]>([
    {
      id: 'enq-101',
      category: 'HOTEL',
      listingId: 'prop-1',
      listingName: 'Ganga Lahari Heritage Hotel',
      customerName: 'Aarav Sharma',
      customerPhone: '+91 98765 43210',
      date: '2027-03-06',
      guestsCount: 2,
      requirements: 'Need Ganga river view room for Mahashivratri Amrit Snan.',
      quotedPrice: 3850,
      status: 'QUOTED',
      timeline: [
        { time: '10:30 AM', note: 'Enquiry submitted by customer' },
        { time: '11:15 AM', note: 'Hotel verified availability and quoted ₹3,850/night' }
      ],
      createdAt: '2026-11-12'
    }
  ]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    const newEnq: BookingEnquiry = {
      id: `enq-${Date.now().toString().slice(-4)}`,
      category: 'HOTEL',
      listingId: initialProperty || 'prop-custom',
      listingName: form.propertyName,
      customerName: form.name,
      customerPhone: form.phone,
      date: form.date,
      guestsCount: Number(form.guestsCount),
      requirements: form.requirements || 'Standard stay request',
      status: 'NEW',
      timeline: [{ time: 'Just now', note: 'Enquiry submitted to provider' }],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setActiveEnquiries([newEnq, ...activeEnquiries]);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const handleAcceptQuotation = (enqId: string) => {
    setActiveEnquiries(
      activeEnquiries.map((enq) => {
        if (enq.id === enqId) {
          return {
            ...enq,
            status: 'AVAILABILITY_CONFIRMED',
            timeline: [
              ...enq.timeline,
              { time: 'Just now', note: 'Quotation accepted by customer. Booking confirmed.' }
            ]
          };
        }
        return enq;
      })
    );
  };

  return (
    <div className="w-full pb-20 space-y-5">
      {/* Enquiry Submission Card */}
      <div className="bg-white rounded-3xl border border-[#F0EAE1] p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-[#FFF1E5] text-[#C65312] flex items-center justify-center font-bold">
            <Send size={16} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#242424]">
              {lang === 'hi' ? 'सीधी होटल / धर्मशाला पूछताछ' : 'Direct Booking Enquiry'}
            </h2>
            <p className="text-[10px] text-[#777777]">
              {lang === 'hi' ? 'सीधा मालिक से बात करें व पक्की कोटेशन पाएं' : 'Contact provider directly for verified pricing'}
            </p>
          </div>
        </div>

        {isSubmitted && (
          <div className="p-3 mb-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#218653] flex-shrink-0" />
            <span>
              {lang === 'hi'
                ? 'आपकी पूछताछ सफलतापूर्वक प्रेषित हो गई है!'
                : 'Enquiry sent successfully! Provider will review and reply.'}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-[#555555] block mb-1">
              {lang === 'hi' ? 'होटल / धर्मशाला का नाम' : 'Selected Hotel / Property'}
            </label>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFFCF8] border border-[#F0EAE1]">
              <Building size={14} className="text-[#F47A20]" />
              <input
                type="text"
                value={form.propertyName}
                onChange={(e) => setForm({ ...form, propertyName: e.target.value })}
                className="w-full text-xs font-semibold text-[#242424] bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-[#555555] block mb-1">
                {lang === 'hi' ? 'आपका नाम' : 'Full Name'}
              </label>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFFCF8] border border-[#F0EAE1]">
                <User size={14} className="text-[#777777]" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full text-xs text-[#242424] bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#555555] block mb-1">
                {lang === 'hi' ? 'मोबाइल नंबर' : 'Phone Number'}
              </label>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFFCF8] border border-[#F0EAE1]">
                <Phone size={14} className="text-[#777777]" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765..."
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full text-xs text-[#242424] bg-transparent outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-[#555555] block mb-1">
                {lang === 'hi' ? 'स्नान / आगमन तिथि' : 'Check-in Date'}
              </label>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFFCF8] border border-[#F0EAE1]">
                <Calendar size={14} className="text-[#777777]" />
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full text-xs text-[#242424] bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#555555] block mb-1">
                {lang === 'hi' ? 'यात्रियों की संख्या' : 'Guests Count'}
              </label>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFFCF8] border border-[#F0EAE1]">
                <Users size={14} className="text-[#777777]" />
                <select
                  value={form.guestsCount}
                  onChange={(e) => setForm({ ...form, guestsCount: Number(e.target.value) })}
                  className="w-full text-xs text-[#242424] bg-transparent outline-none"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={4}>4 Guests (Family)</option>
                  <option value={8}>8+ Guests (Group)</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#555555] block mb-1">
              {lang === 'hi' ? 'विशेष आवश्यकता' : 'Special Requirements'}
            </label>
            <textarea
              rows={2}
              placeholder={
                lang === 'hi'
                  ? 'गंगा दर्शन कमरा, भूतल, वृद्धजनों हेतु व्हीलचेयर आदि...'
                  : 'Ganga view, ground floor, satvik food required...'
              }
              value={form.requirements}
              onChange={(e) => setForm({ ...form, requirements: e.target.value })}
              className="w-full p-2.5 text-xs text-[#242424] bg-[#FFFCF8] border border-[#F0EAE1] rounded-xl outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#F47A20] to-[#DE6313] text-white text-xs font-bold shadow-md shadow-[#F47A20]/25 active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            <Send size={14} />
            <span>{lang === 'hi' ? 'पूछताछ दर्ज करें' : 'Submit Enquiry to Provider'}</span>
          </button>
        </form>
      </div>

      {/* Real Active Enquiries & CRM Status */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-[#242424] px-1">
          {lang === 'hi' ? 'मेरी सक्रिय पूछताछ एवं बुकिंग' : 'Your Enquiries & Bookings'} (
          {activeEnquiries.length})
        </h3>

        {activeEnquiries.map((enq) => (
          <div
            key={enq.id}
            className="bg-white rounded-3xl border border-[#F0EAE1] p-4 shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9px] font-mono font-bold bg-[#FFF1E5] text-[#C65312] px-2 py-0.5 rounded-full">
                  #{enq.id}
                </span>
                <h4 className="text-xs font-bold text-[#242424] mt-1">{enq.listingName}</h4>
                <div className="text-[10px] text-[#777777]">
                  For: {enq.date} • {enq.guestsCount} Guests
                </div>
              </div>

              {/* Status Badge */}
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  enq.status === 'QUOTED'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : enq.status === 'AVAILABILITY_CONFIRMED'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}
              >
                {enq.status.replace('_', ' ')}
              </span>
            </div>

            {/* Provider Quotation Box */}
            {enq.quotedPrice && (
              <div className="bg-[#FFF1E5]/50 border border-[#F47A20]/20 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#777777]">Hotel Quotation Price</div>
                  <div className="text-sm font-bold text-[#C65312]">₹{enq.quotedPrice}/night</div>
                </div>

                {enq.status === 'QUOTED' && (
                  <button
                    onClick={() => handleAcceptQuotation(enq.id)}
                    className="px-3 py-1.5 rounded-xl bg-[#218653] text-white text-[11px] font-bold hover:bg-emerald-700 active:scale-95 transition-all shadow-sm flex items-center gap-1"
                  >
                    <CheckCircle2 size={13} />
                    <span>{lang === 'hi' ? 'कोटेशन स्वीकारें' : 'Accept Quote'}</span>
                  </button>
                )}
              </div>
            )}

            {/* Activity Timeline */}
            <div className="pt-2 border-t border-[#F0EAE1]">
              <span className="text-[10px] font-bold text-[#777777] uppercase tracking-wider block mb-1">
                Audit Timeline
              </span>
              <div className="space-y-1">
                {enq.timeline.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[10px] text-[#555555]">
                    <Clock size={10} className="text-[#F47A20] flex-shrink-0" />
                    <span className="font-semibold text-[#242424]">{step.time}:</span>
                    <span className="truncate">{step.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

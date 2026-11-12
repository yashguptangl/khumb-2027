'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Building,
  Utensils,
  Car,
  QrCode,
  DollarSign,
  Users,
  Settings,
  CheckCircle,
  Plus,
  RefreshCw,
  Sliders,
  TrendingUp,
  FileText
} from 'lucide-react';
import { UserRole } from '@/types';

interface RoleDashboardsProps {
  lang: 'en' | 'hi';
}

export default function RoleDashboards({ lang }: RoleDashboardsProps) {
  const [activeRole, setActiveRole] = useState<UserRole>('SUPER_ADMIN');

  // Super Admin state
  const [platformCommission, setPlatformCommission] = useState(6); // 6%
  const [taxiLeadPrice, setTaxiLeadPrice] = useState(30); // ₹30/lead
  const [qrPrice, setQrPrice] = useState(299); // ₹299
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 'v-1', name: 'Shri Ram Kuti Ashram', type: 'Dharamshala', status: 'PENDING' },
    { id: 'v-2', name: 'Alaknanda Taxi Sewa', type: 'Transport', status: 'PENDING' }
  ]);

  // Hotel Owner state
  const [roomsInventory, setRoomsInventory] = useState([
    { id: 'r-1', type: 'Deluxe AC Ganga View', price: 3850, total: 10, booked: 4 },
    { id: 'r-2', type: 'Standard Non-AC Double', price: 1800, total: 15, booked: 11 }
  ]);

  const handleApprove = (id: string) => {
    setPendingApprovals(pendingApprovals.filter((v) => v.id !== id));
  };

  return (
    <div className="w-full pb-20 space-y-4">
      {/* Role Switcher Pills */}
      <div className="bg-white rounded-3xl border border-[#F0EAE1] p-3 shadow-sm">
        <label className="text-[10px] font-bold text-[#777777] uppercase tracking-wider block mb-1.5">
          {lang === 'hi' ? 'भूमिका चयन (Role Switcher)' : 'Select Dashboard Role'}
        </label>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'SUPER_ADMIN', label: 'Super Admin', icon: ShieldCheck },
            { id: 'HOTEL_OWNER', label: 'Hotel Owner', icon: Building },
            { id: 'RESTAURANT_OWNER', label: 'Restaurant Owner', icon: Utensils },
            { id: 'TAXI_OPERATOR', label: 'Taxi Operator', icon: Car }
          ].map((r) => {
            const Icon = r.icon;
            const isSel = activeRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSel
                    ? 'bg-[#F47A20] text-white shadow-sm'
                    : 'bg-[#FFFCF8] border border-[#F0EAE1] text-[#777777] hover:text-[#242424]'
                }`}
              >
                <Icon size={13} />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DASHBOARD 1: SUPER ADMIN */}
      {activeRole === 'SUPER_ADMIN' && (
        <div className="space-y-4">
          {/* Revenue Analytics Cards */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-3 rounded-2xl border border-[#F0EAE1] shadow-sm">
              <span className="text-[10px] text-[#777777] block">Total Bookings</span>
              <span className="text-base font-bold text-[#242424]">1,428</span>
              <span className="text-[9px] text-[#218653] font-semibold block mt-0.5">+14% this week</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-[#F0EAE1] shadow-sm">
              <span className="text-[10px] text-[#777777] block">Commissions</span>
              <span className="text-base font-bold text-[#C65312]">₹86,400</span>
              <span className="text-[9px] text-[#218653] font-semibold block mt-0.5">Verified</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-[#F0EAE1] shadow-sm">
              <span className="text-[10px] text-[#777777] block">Businesses</span>
              <span className="text-base font-bold text-[#242424]">146</span>
              <span className="text-[9px] text-amber-600 font-semibold block mt-0.5">2 pending</span>
            </div>
          </div>

          {/* Dynamic Platform Pricing Configuration */}
          <div className="bg-white rounded-3xl border border-[#F0EAE1] p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#242424] flex items-center gap-1.5">
                <Sliders size={14} className="text-[#F47A20]" />
                <span>Platform Commission & Rates Settings</span>
              </h3>
              <span className="text-[10px] text-[#218653] font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Live Sync
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-[#FFFCF8] border border-[#F0EAE1]">
                <span className="text-[10px] text-[#777777] block">Hotel Comm.</span>
                <input
                  type="number"
                  value={platformCommission}
                  onChange={(e) => setPlatformCommission(Number(e.target.value))}
                  className="w-full font-bold text-[#C65312] bg-transparent outline-none mt-0.5 text-sm"
                />
                <span className="text-[9px] text-[#777777]">% per booking</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FFFCF8] border border-[#F0EAE1]">
                <span className="text-[10px] text-[#777777] block">Taxi Lead Rate</span>
                <input
                  type="number"
                  value={taxiLeadPrice}
                  onChange={(e) => setTaxiLeadPrice(Number(e.target.value))}
                  className="w-full font-bold text-[#C65312] bg-transparent outline-none mt-0.5 text-sm"
                />
                <span className="text-[9px] text-[#777777]">₹ per customer</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#FFFCF8] border border-[#F0EAE1]">
                <span className="text-[10px] text-[#777777] block">QR Code Setup</span>
                <input
                  type="number"
                  value={qrPrice}
                  onChange={(e) => setQrPrice(Number(e.target.value))}
                  className="w-full font-bold text-[#C65312] bg-transparent outline-none mt-0.5 text-sm"
                />
                <span className="text-[9px] text-[#777777]">₹ one-time</span>
              </div>
            </div>
          </div>

          {/* Pending Business Verification Approvals */}
          <div className="bg-white rounded-3xl border border-[#F0EAE1] p-4 shadow-sm space-y-2.5">
            <h3 className="text-xs font-bold text-[#242424] flex items-center justify-between">
              <span>Pending Business Verification Approvals</span>
              <span className="text-[10px] text-[#C65312] bg-[#FFF1E5] px-2 py-0.5 rounded-full font-bold">
                {pendingApprovals.length} Requests
              </span>
            </h3>

            {pendingApprovals.length === 0 ? (
              <div className="p-3 text-center text-xs text-[#777777]">
                All pending businesses have been verified and approved.
              </div>
            ) : (
              pendingApprovals.map((v) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFCF8] border border-[#F0EAE1]"
                >
                  <div>
                    <h4 className="text-xs font-bold text-[#242424]">{v.name}</h4>
                    <span className="text-[10px] text-[#777777]">{v.type} • Docs uploaded</span>
                  </div>
                  <button
                    onClick={() => handleApprove(v.id)}
                    className="px-2.5 py-1 bg-[#218653] text-white rounded-lg text-[11px] font-bold hover:bg-emerald-700 transition-colors"
                  >
                    Grant Verified Badge
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* DASHBOARD 2: HOTEL OWNER */}
      {activeRole === 'HOTEL_OWNER' && (
        <div className="space-y-4">
          {/* Property Summary */}
          <div className="bg-white rounded-3xl border border-[#F0EAE1] p-4 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#218653] font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Verified Hotel Partner
              </span>
              <h3 className="text-sm font-bold text-[#242424] mt-1">Ganga Lahari Heritage Hotel</h3>
              <p className="text-[10px] text-[#777777]">Har Ki Pauri, Haridwar • 25 Rooms</p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-[#FFF1E5] flex items-center justify-center text-[#C65312]">
              <QrCode size={24} />
            </div>
          </div>

          {/* Room Inventory & Dynamic Pricing */}
          <div className="bg-white rounded-3xl border border-[#F0EAE1] p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#242424]">Room Inventory & Snan Pricing</h4>
              <button className="text-[11px] font-bold text-[#F47A20] flex items-center gap-0.5">
                <Plus size={12} />
                <span>Add Room</span>
              </button>
            </div>

            <div className="space-y-2">
              {roomsInventory.map((room) => (
                <div
                  key={room.id}
                  className="p-3 rounded-2xl bg-[#FFFCF8] border border-[#F0EAE1] flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-xs font-bold text-[#242424]">{room.type}</h5>
                    <div className="text-[10px] text-[#777777] mt-0.5">
                      Available: {room.total - room.booked} / {room.total} rooms
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-[#F47A20]">₹{room.price}/night</span>
                    <div className="text-[9px] text-[#218653] font-semibold">Active Booking</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD 3: RESTAURANT OWNER */}
      {activeRole === 'RESTAURANT_OWNER' && (
        <div className="bg-white rounded-3xl border border-[#F0EAE1] p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#242424]">Chotiwala Satvik Bhojanalaya</h3>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                Pure Satvik Certified
              </span>
            </div>
            <button className="px-2.5 py-1 bg-[#F47A20] text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm">
              <QrCode size={13} />
              <span>Table QR Menu</span>
            </button>
          </div>

          <div className="p-3 bg-[#FFFCF8] rounded-2xl border border-[#F0EAE1] text-xs space-y-1">
            <div className="flex items-center justify-between text-[#242424]">
              <span>Special Satvik Thali</span>
              <span className="font-bold text-[#F47A20]">₹180</span>
            </div>
            <div className="flex items-center justify-between text-[#242424]">
              <span>Puri Sabji with Halwa</span>
              <span className="font-bold text-[#F47A20]">₹90</span>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD 4: TAXI OPERATOR */}
      {activeRole === 'TAXI_OPERATOR' && (
        <div className="bg-white rounded-3xl border border-[#F0EAE1] p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#242424]">Haridwar Green E-Rickshaw Sewa</h3>
              <p className="text-[10px] text-[#777777]">Fleet: 8 Electric Rickshaws</p>
            </div>
            <span className="text-[10px] font-bold text-[#218653] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Online Available
            </span>
          </div>

          <div className="p-3 bg-[#FFF1E5]/40 rounded-2xl border border-[#F47A20]/20 text-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#777777] block">Base Fare</span>
              <span className="font-bold text-[#C65312]">₹40 fixed</span>
            </div>
            <div>
              <span className="text-[10px] text-[#777777] block">Running Rate</span>
              <span className="font-bold text-[#C65312]">₹15/km</span>
            </div>
            <button className="px-2.5 py-1 bg-[#F47A20] text-white rounded-xl text-[11px] font-bold">
              Update Rates
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

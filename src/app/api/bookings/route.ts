import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    data: [
      {
        id: 'enq-101',
        category: 'HOTEL',
        listingId: 'prop-1',
        listingName: 'Ganga Lahari Heritage Hotel',
        customerName: 'Aarav Sharma',
        customerPhone: '+91 98765 43210',
        date: '2027-03-06',
        guestsCount: 2,
        quotedPrice: 3850,
        status: 'QUOTED',
        commissionRate: 0.06,
        commissionDue: 231,
        createdAt: '2026-11-12'
      }
    ]
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newEnquiry = {
      id: `enq-${Date.now().toString().slice(-4)}`,
      ...body,
      status: 'NEW',
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(
      { status: 'success', message: 'Enquiry received by provider', data: newEnquiry },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 400 });
  }
}

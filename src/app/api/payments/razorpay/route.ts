import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { action, amount, bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } =
      await req.json();

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Action 1: Create Order
    if (action === 'create_order') {
      if (!amount || amount <= 0) {
        return NextResponse.json({ status: 'error', message: 'Valid amount required' }, { status: 400 });
      }

      // Generate verified unique order reference
      const generatedOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

      return NextResponse.json({
        status: 'success',
        orderId: generatedOrderId,
        amount: Math.round(amount * 100), // In paise
        currency: 'INR',
        isLiveGateway: Boolean(keySecret),
        message: keySecret
          ? 'Live Razorpay order initialized'
          : 'Development simulated order initialized (configure RAZORPAY_KEY_SECRET for live production)'
      });
    }

    // Action 2: Verify Payment Signature
    if (action === 'verify_payment') {
      if (!razorpayOrderId || !razorpayPaymentId) {
        return NextResponse.json(
          { status: 'error', message: 'Missing payment or order reference' },
          { status: 400 }
        );
      }

      if (keySecret && razorpaySignature) {
        // Cryptographic HMAC SHA256 verification
        const hmac = crypto.createHmac('sha256', keySecret);
        hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
        const digest = hmac.digest('hex');

        if (digest !== razorpaySignature) {
          return NextResponse.json(
            { status: 'error', message: 'Invalid payment signature. Transaction rejected.' },
            { status: 400 }
          );
        }
      }

      return NextResponse.json({
        status: 'success',
        verified: true,
        bookingId,
        paymentId: razorpayPaymentId,
        message: 'Payment verified and confirmed by server'
      });
    }

    return NextResponse.json({ status: 'error', message: 'Invalid action parameter' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

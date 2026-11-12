import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { phone, password, role } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { status: 'error', message: 'Mobile phone number is required' },
        { status: 400 }
      );
    }

    // Authenticate / session simulation with secure token response
    const mockUser = {
      id: `usr-${phone.slice(-4)}`,
      phone,
      fullName: phone === '9811200027' ? 'Pradeep V.' : 'Kumbh Pilgrim',
      role: role || 'PILGRIM',
      token: `kumbh_jwt_${Buffer.from(phone + Date.now()).toString('base64')}`
    };

    const response = NextResponse.json({
      status: 'success',
      message: 'Authentication successful',
      user: mockUser
    });

    // Set secure HTTP-only session cookie
    response.cookies.set({
      name: 'kumbh_session',
      value: mockUser.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

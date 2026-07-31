import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const envUsername = process.env.ADMIN_USERNAME || 'admin';
    const envPassword = process.env.ADMIN_PASSWORD || 'vault2026';

    if (username === envUsername && password === envPassword) {
      return NextResponse.json({
        success: true,
        token: 'vault_admin_authenticated_session_token_2026'
      });
    }

    return NextResponse.json(
      { error: 'Invalid admin username or password' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

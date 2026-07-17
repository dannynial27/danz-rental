import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { token, email } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    if (!adminDb) {
      return NextResponse.json({ error: 'Admin DB not initialized' }, { status: 500 });
    }

    await adminDb.collection('admin_tokens').doc(token).set({
      token: token,
      userEmail: email || 'unknown',
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving token:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

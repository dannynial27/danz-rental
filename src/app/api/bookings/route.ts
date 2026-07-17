import { NextResponse } from 'next/server';
import { adminMessaging, adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Save to Firestore securely via Admin SDK
    if (!adminDb) throw new Error("Firebase Admin not initialized");
    
    const docRef = await adminDb.collection('bookings').add({
      ...data,
      status: 'Pending',
      createdAt: FieldValue.serverTimestamp(),
    });

    // Send Push Notification
    try {
      if (adminMessaging && adminDb) {
        // Get all admin tokens using Admin SDK (bypasses security rules)
        const tokensSnapshot = await adminDb.collection('admin_tokens').get();
        const tokens: string[] = [];
        tokensSnapshot.forEach(doc => {
          tokens.push(doc.data().token);
        });

        if (tokens.length > 0) {
          await adminMessaging.sendEachForMulticast({
            tokens: tokens,
            notification: {
              title: 'New Car Booking! 🚗',
              body: `${data.name} just requested a ${data.carName} for ${data.pickupDate}.`,
            },
            data: {
              click_action: 'https://danzrental.com/admin',
              bookingId: docRef.id
            }
          });
          console.log(`Sent push notification to ${tokens.length} devices.`);
        }
      }
    } catch (pushError) {
      console.error('Failed to send push notification', pushError);
      // We don't fail the booking if the push fails
    }

    return NextResponse.json({ success: true, id: docRef.id });

  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Failed to submit booking' }, { status: 500 });
  }
}

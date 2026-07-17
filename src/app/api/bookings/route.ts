import { NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { adminMessaging } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...data,
      status: 'Pending',
      createdAt: serverTimestamp(),
    });

    // Send Push Notification
    try {
      if (adminMessaging) {
        // Get all admin tokens
        const tokensSnapshot = await getDocs(collection(db, 'admin_tokens'));
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

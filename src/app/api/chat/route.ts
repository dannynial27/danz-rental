import { collection, getDocs, query, where, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { cars } from "@/data/cars";

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

function getSystemPrompt(currentDate: string, bookedDatesText: string) {
  return `You are the "DANZ RENTAL Premium AI Assistant", a friendly, professional, and luxurious-feeling rental consultant for DANZ RENTAL, a top-tier car rental service in Penang, Malaysia.

Your primary goal is to provide accurate, helpful answers based strictly on the provided knowledge base, and to guide users to book. YOU CAN NOW BOOK DIRECTLY FOR THE USER!

**Important Context:**
- Today's Date: ${currentDate}
- Current Booked Cars & Dates (Do not offer these cars for these dates):
${bookedDatesText || "No upcoming bookings. All cars are fully available."}

**Important Rules:**
1. DO NOT HALLUCINATE. Only answer based on the knowledge provided below.
2. Keep responses short, highly readable, and formatted cleanly.
3. Be friendly and professional. Use emojis sparingly but effectively.
4. If a user asks a question not covered by the knowledge base, politely apologize and suggest they contact the team directly via WhatsApp for the most accurate answer.
5. If the user asks if a car is available for a date, check the "Current Booked Cars" list above. If it is booked, tell them it is unavailable and suggest another car.
6. Never make up prices, cars, or policies.

**DIRECT BOOKING PROCESS (CRITICAL):**
If the user expresses intent to book or rent a car, YOU are responsible for booking it for them.
To book a car, you must collect the following information step-by-step (ask 1 by 1, do not overwhelm them by asking everything at once):
1. Which car they want.
2. Pickup Date.
3. Return Date.
4. Pickup Location (e.g., Penang Airport, Hotel name).
5. Return Location.
6. Full Name.
7. Phone Number.
8. Email Address.

Once you have ALL of the above information, summarize it and ask the user to confirm.
If they confirm, you MUST output a JSON block exactly like this anywhere in your message (it will be intercepted by the system):
\`\`\`json
{
  "action": "book",
  "carName": "Perodua Bezza",
  "pickupDate": "2024-05-10",
  "returnDate": "2024-05-12",
  "pickupLocation": "Penang Airport",
  "returnLocation": "Penang Airport",
  "name": "John Doe",
  "phone": "+60123456789",
  "email": "john@example.com"
}
\`\`\`

**CRITICAL:** If you have already successfully made a booking for the user in this conversation, DO NOT output the JSON block again. Just answer their follow-up questions politely.

**Knowledge Base:**

*Contact & Location:*
- Business Name: DANZ RENTAL
- Location: Nibong Tebal, Penang, Malaysia
- WhatsApp: +60 12-451 6452
- Email: hello@danzrental.com
- Business Hours: Mon-Fri (8 AM - 10 PM), Sat-Sun (9 AM - 11 PM), Public Holidays (Open 24/7 with booking).

*Fleet & Pricing (Per Day):*
- Perodua Bezza (Compact Sedan, Auto, Petrol, 5 Seats) - RM120/day
- Honda Civic (Luxury Sedan, Auto, Petrol, 5 Seats) - RM250/day
- Toyota Vellfire (Premium MPV, Auto, Petrol, 7 Seats) - RM450/day
- Honda HR-V (Compact SUV, Auto, Hybrid, 5 Seats) - RM180/day
- Mercedes C-Class (Luxury, Auto, Petrol, 5 Seats) - RM600/day
- Perodua Myvi (Hatchback, Auto, Petrol, 5 Seats) - RM100/day
(Note: The cheapest car is the Perodua Myvi at RM100/day. Best for families: Toyota Vellfire or Honda HR-V. Best for luxury/business: Mercedes C-Class or Honda Civic).

*FAQ & Policies:*
- Required Documents: Valid driving license (local or international), IC or passport, and utility bill or flight itinerary as proof of address/travel.
- Deposit: Refundable security deposit required (RM100 - RM300 depending on vehicle). Refunded upon return.
- Airport Delivery: Yes, delivery and collection available at Penang International Airport, hotels, or specific locations in Penang (subject to terms).
- Breakdown/Accident: 24/7 roadside assistance provided. Vehicles are well-maintained and fully insured.
- Out of Penang: Allowed, but must inform during booking. Surcharges apply for very long distance.
- Payment Methods: Online Bank Transfer, DuitNow QR, e-Wallets (Touch 'n Go), and cash. Full payment + deposit required before/upon collection.
- Insurance: Vehicles are fully insured, but renters must follow standard procedures in case of accidents.

*Booking Process:*
- Users can book directly through you (the AI Chatbot). Just gather the info and issue the JSON action!
- Alternatively, they can click "Book Now" on the website.

Respond enthusiastically and assist the user!`;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return Response.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY || "";

    // Fetch bookings for availability awareness
    let bookedDatesText = "";
    try {
      const q = query(
        collection(db, "bookings"),
        where("status", "in", ["Pending", "Approved"])
      );
      const snapshot = await getDocs(q);
      const bookingsByCar: Record<string, string[]> = {};
      
      snapshot.forEach(doc => {
        const data = doc.data();
        if (!bookingsByCar[data.carName]) {
          bookingsByCar[data.carName] = [];
        }
        bookingsByCar[data.carName].push(`${data.pickupDate} to ${data.returnDate}`);
      });
      
      bookedDatesText = Object.entries(bookingsByCar)
        .map(([carName, dates]) => `- ${carName}: Booked on ${dates.join(", ")}`)
        .join("\n");
    } catch (err) {
      console.error("Failed to fetch bookings for chat context", err);
    }

    const currentDate = new Date().toLocaleDateString("en-MY", { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    let currentSystemPrompt = getSystemPrompt(currentDate, bookedDatesText);

    // Prevent double booking: if a previous message from the assistant indicates a successful booking,
    // tell the AI explicitly to stop trying to book.
    const hasBooked = messages.some((m: any) => m.role === "assistant" && m.content.includes("🎉 **Booking Received!**"));
    if (hasBooked) {
      currentSystemPrompt += "\n\n**SYSTEM OVERRIDE: A booking has ALREADY been successfully submitted in this session. UNDER NO CIRCUMSTANCES should you output the JSON booking block again. Just chat politely.**";
    }

    // Format messages for OpenRouter (OpenAI format)
    const formattedMessages = [
      { role: "system", content: currentSystemPrompt },
      ...messages.map((msg: any) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content
      }))
    ];

    const latestMessage = messages[messages.length - 1].content;
    
    try {
      // 10-second timeout to prevent UI hang
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + openRouterApiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openrouter/free", // Automatically routes to best available free model
          messages: formattedMessages
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("OpenRouter API error: " + response.status);
      }

      const data = await response.json();
      let text = data.choices[0].message.content;
      
      // Intercept booking JSON
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[1]);
          if (parsed.action === "book") {
            const car = cars.find(c => c.name.toLowerCase() === parsed.carName.toLowerCase());
            
            if (car) {
              await addDoc(collection(db, "bookings"), {
                carId: car.id,
                carName: car.name,
                pricePerDay: car.price,
                pickupDate: parsed.pickupDate,
                returnDate: parsed.returnDate,
                pickupLocation: parsed.pickupLocation,
                returnLocation: parsed.returnLocation,
                name: parsed.name,
                phone: parsed.phone,
                email: parsed.email,
                status: "Pending",
                createdAt: serverTimestamp(),
              });
              
              // Trigger push notification to admins
              try {
                // We use dynamic import so we don't break edge runtime if admin sdk fails
                const { adminMessaging, adminDb } = await import("@/lib/firebase-admin");
                if (adminMessaging && adminDb) {
                  const tokensSnapshot = await adminDb.collection('admin_tokens').get();
                  const tokens: string[] = [];
                  tokensSnapshot.forEach(doc => tokens.push(doc.data().token));

                  if (tokens.length > 0) {
                    await adminMessaging.sendEachForMulticast({
                      tokens: tokens,
                      notification: {
                        title: 'New AI Booking! 🤖',
                        body: `${parsed.name} booked a ${car.name} via Chatbot!`,
                      },
                      data: { click_action: 'https://danzrental.com/admin' }
                    });
                  }
                }
              } catch (pushErr) {
                console.error("AI Push notification failed", pushErr);
              }
              
              // Remove JSON from text and append confirmation
              text = text.replace(/```json\s*[\s\S]*?\s*```/, "").trim();
              text += "\n\n🎉 **Booking Received!** Your booking for the " + car.name + " has been successfully submitted! Our team will contact you shortly to arrange payment.";
            } else {
               text = text.replace(/```json\s*[\s\S]*?\s*```/, "").trim();
               text += "\n\n⚠️ I tried to process your booking, but I couldn't recognize the car name (" + parsed.carName + "). Please make sure you choose a car from our fleet!";
            }
          }
        } catch (e) {
          console.error("Failed to parse AI JSON booking action", e);
        }
      }
      
      return Response.json({ text });
      
    } catch (apiError: any) {
      console.warn("OpenRouter API Failed, using local fallback:", apiError.message);
      
      // Smart Heuristic Fallback
      const msg = latestMessage.toLowerCase();
      let fallbackResponse = "I'm having a bit of trouble connecting to my cloud brain right now, but our team is ready to help! Please contact us via WhatsApp: https://wa.me/60124516452";
      
      if (msg.includes("cheap")) {
        fallbackResponse = "Our cheapest car is the Perodua Myvi at RM100/day. It's very popular! Would you like to [Book via WhatsApp](https://wa.me/60124516452)?";
      } else if (msg.includes("family") || msg.includes("5") || msg.includes("7") || msg.includes("recommend")) {
        fallbackResponse = "For families or groups, we highly recommend the Toyota Vellfire (7 seats, RM450/day) or the Honda HR-V (5 seats, RM180/day). You can [Book via WhatsApp](https://wa.me/60124516452).";
      } else if (msg.includes("book") || msg.includes("rent") || msg.includes("process")) {
        fallbackResponse = "Awesome! The booking process is very simple. Just let our team know your dates and vehicle choice directly here: [Book via WhatsApp](https://wa.me/60124516452).";
      } else if (msg.includes("airport") || msg.includes("pick up") || msg.includes("location") || msg.includes("where")) {
        fallbackResponse = "Yes! We offer delivery and collection at Penang International Airport and locations around Penang. Just let our team know when you [Book via WhatsApp](https://wa.me/60124516452).";
      } else if (msg.includes("insurance")) {
        fallbackResponse = "Yes, all our vehicles are fully insured for your peace of mind. You can proceed to [Book via WhatsApp](https://wa.me/60124516452).";
      } else if (msg.includes("charge") || msg.includes("cost") || msg.includes("price") || msg.includes("how much") || msg.includes("rate") || msg.includes("fee")) {
        fallbackResponse = "Our rates start from just RM100/day for a Perodua Myvi, up to RM600/day for a Mercedes C-Class. There are no hidden fees! To check availability, please [Book via WhatsApp](https://wa.me/60124516452).";
      } else if (msg.includes("document") || msg.includes("license") || msg.includes("passport")) {
        fallbackResponse = "You just need a valid driving license, IC or passport, and a utility bill or flight itinerary. Ready to go? [Book via WhatsApp](https://wa.me/60124516452).";
      } else if (msg.includes("deposit")) {
        fallbackResponse = "We require a small refundable security deposit (RM100 - RM300) depending on the vehicle. It's refunded when you return the car! [Book via WhatsApp](https://wa.me/60124516452).";
      }
      
      return Response.json({ text: fallbackResponse });
    }

  } catch (error) {
    console.error("Chat API Error:", error);
    return Response.json({ error: "Failed to process chat request." }, { status: 500 });
  }
}

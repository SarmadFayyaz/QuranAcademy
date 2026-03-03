import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, phone, country, course, time, message, source } =
    await request.json();

  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const adminNumber = process.env.WHATSAPP_ADMIN_NUMBER;

  if (!token || !phoneNumberId || !adminNumber) {
    return NextResponse.json(
      { error: "WhatsApp not configured" },
      { status: 500 }
    );
  }

  const lines = [
    `📚 *New ${source === "register" ? "Registration" : "Inquiry"} — Hasnain Online Quran Academy*`,
    "",
    `👤 *Name:* ${name}`,
    `📧 *Email:* ${email}`,
    `📱 *Phone:* ${phone}`,
    `🌍 *Country:* ${country}`,
    course ? `📖 *Course:* ${course}` : "",
    time ? `🕐 *Preferred Time:* ${time}` : "",
    message ? `💬 *Message:* ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: adminNumber,
          type: "text",
          text: { body: lines },
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      console.error("WhatsApp API error:", err);
      return NextResponse.json(
        { error: "Failed to send WhatsApp message" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("WhatsApp send error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

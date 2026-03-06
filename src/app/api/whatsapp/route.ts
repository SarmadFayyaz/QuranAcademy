import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  const { name, email, phone, country, course, time, message, source } =
    await request.json();

  try {
    // Send email notification
    const notifyEmail = process.env.NOTIFY_EMAIL;
    if (notifyEmail) {
      const type = source === "register" ? "Registration" : "Free Trial Inquiry";
      const emailHtml = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
          <h2 style="color:#065f46;border-bottom:2px solid #065f46;padding-bottom:10px">
            New ${type} - Hasnain Online Quran Academy
          </h2>
          <table style="width:100%;border-collapse:collapse;margin-top:16px">
            <tr><td style="padding:8px 12px;font-weight:bold;color:#374151">Name</td><td style="padding:8px 12px">${name}</td></tr>
            <tr style="background:#f9fafb"><td style="padding:8px 12px;font-weight:bold;color:#374151">Email</td><td style="padding:8px 12px">${email}</td></tr>
            <tr><td style="padding:8px 12px;font-weight:bold;color:#374151">Phone</td><td style="padding:8px 12px">${phone || "N/A"}</td></tr>
            <tr style="background:#f9fafb"><td style="padding:8px 12px;font-weight:bold;color:#374151">Country</td><td style="padding:8px 12px">${country || "N/A"}</td></tr>
            ${course ? `<tr><td style="padding:8px 12px;font-weight:bold;color:#374151">Course</td><td style="padding:8px 12px">${course}</td></tr>` : ""}
            ${time ? `<tr style="background:#f9fafb"><td style="padding:8px 12px;font-weight:bold;color:#374151">Preferred Time</td><td style="padding:8px 12px">${time}</td></tr>` : ""}
            ${message ? `<tr><td style="padding:8px 12px;font-weight:bold;color:#374151">Message</td><td style="padding:8px 12px">${message}</td></tr>` : ""}
          </table>
          <p style="margin-top:20px;color:#6b7280;font-size:12px">This is an automated notification from the website.</p>
        </div>
      `;
      await sendEmail({
        to: notifyEmail,
        subject: `New ${type}: ${name}`,
        html: emailHtml,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}

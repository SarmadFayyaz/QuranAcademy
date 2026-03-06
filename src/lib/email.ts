import * as tls from "tls";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send email via SMTP using native Node.js TLS.
 * Requires env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
 */
export async function sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;

  if (!host || !user || !pass || !from) {
    console.warn("SMTP not configured — skipping email");
    return;
  }

  const socket = tls.connect(port, host, { rejectUnauthorized: true });

  const readLine = (): Promise<string> =>
    new Promise((resolve, reject) => {
      const onData = (buf: Buffer) => {
        socket.removeListener("data", onData);
        resolve(buf.toString());
      };
      socket.on("data", onData);
      socket.on("error", reject);
    });

  const send = async (cmd: string, expectCode: string) => {
    socket.write(cmd + "\r\n");
    const resp = await readLine();
    if (!resp.startsWith(expectCode)) {
      throw new Error(`SMTP error on "${cmd.substring(0, 30)}": ${resp.trim()}`);
    }
    return resp;
  };

  try {
    // Greeting
    await readLine();
    await send(`EHLO ${host}`, "250");

    // Auth
    await send("AUTH LOGIN", "334");
    await send(Buffer.from(user).toString("base64"), "334");
    await send(Buffer.from(pass).toString("base64"), "235");

    // Envelope
    await send(`MAIL FROM:<${from}>`, "250");
    await send(`RCPT TO:<${to}>`, "250");
    await send("DATA", "354");

    // Message
    const boundary = `----=_Part_${Date.now()}`;
    const message = [
      `From: Hasnain Online Quran Academy <${from}>`,
      `To: ${to}`,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      "",
      `--${boundary}`,
      `Content-Type: text/html; charset=UTF-8`,
      `Content-Transfer-Encoding: 7bit`,
      "",
      html,
      "",
      `--${boundary}--`,
      ".",
    ].join("\r\n");

    await send(message, "250");
    await send("QUIT", "221");
  } finally {
    socket.destroy();
  }
}

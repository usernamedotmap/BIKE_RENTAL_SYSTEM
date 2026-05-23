import nodemailer from "nodemailer";
import { ENV } from "./env";
import dns from "dns";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: ENV.GMAIL_USER,
    pass: ENV.GMAIL_APP_PASSWORD,
  },
  dnsLookup: (
    hostname: string,
    options: dns.LookupOptions,
    callback: (
      err: NodeJS.ErrnoException | null,
      address: string,
      family: number,
    ) => void,
  ) => {
    // ← fixed typo (was dnsLoookup)
    dns.lookup(hostname, { family: 4 }, callback);
  },
} as nodemailer.TransportOptions);

export const verifyMailer = async (): Promise<void> => {
  try {
    await transporter.verify();
    console.log("Nodemailer connected to gmail");
  } catch (err) {
    console.log("Nodemailer connection failed:", err);
  }
};

export const sendEmail = async (params: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<void> => {
  const { to, subject, html, text } = params;

  try {
    const info = await transporter.sendMail({
      from: `"${ENV.GMAIL_FROM_NAME}" <${ENV.GMAIL_USER}>`,
      to,
      subject,
      html,
      text: text ?? html.replace(/<[^>]*>/g, ""),
    });

    console.log(`[MAILER] Email sen to ${to} - ID: ${info.messageId}`);
  } catch (err: any) {
    console.log("[MAILER] Failed to send email:", err.message);
    throw err;
  }
};

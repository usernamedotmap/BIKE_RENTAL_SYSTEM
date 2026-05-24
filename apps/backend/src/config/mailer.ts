import nodemailer from "nodemailer";
import { ENV } from "./env";

// Let Nodemailer handle the pool and DNS natively
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.GMAIL_USER,
    pass: ENV.GMAIL_APP_PASSWORD,
  },
  // Optional: Ensures robust TLS handshake on cloud environments
  tls: {
    rejectUnauthorized: true 
  }
});

export const verifyMailer = async (): Promise<void> => {
  try {
    await transporter.verify();
    console.log("[MAILER] Nodemailer connected to Gmail successfully");
  } catch (err) {
    console.error("[MAILER] Nodemailer connection failed:", err);
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

    console.log(`[MAILER] Email sent to ${to} - ID: ${info.messageId}`);
  } catch (err: any) {
    console.error("[MAILER] Failed to send email:", err.message);
    throw err;
  }
};
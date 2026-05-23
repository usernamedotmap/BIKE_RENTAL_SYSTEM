import nodemailer from "nodemailer";
import dns from "node:dns/promises";
import { ENV } from "./env";

let transporterPromise: Promise<nodemailer.Transporter> | null = null;

const getTransporter = async () => {
  if (transporterPromise) return transporterPromise;

  transporterPromise = dns.lookup("smtp.gmail.com", { family: 4 }).then(({ address }) => {
    console.log("[MAILER] smtp.gmail.com IPv4:", address);

    return nodemailer.createTransport({
      host: address,
      port: 465,
      secure: true,
      auth: {
        user: ENV.GMAIL_USER,
        pass: ENV.GMAIL_APP_PASSWORD,
      },
      tls: {
        servername: "smtp.gmail.com",
      },
      connectionTimeout: 30_000,
      greetingTimeout: 30_000,
      socketTimeout: 60_000,
    } as nodemailer.TransportOptions);
  });

  return transporterPromise;
};

export const verifyMailer = async (): Promise<void> => {
  try {
    const transporter = await getTransporter();
    await transporter.verify();
    console.log("Nodemailer connected to Gmail");
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
    const transporter = await getTransporter();

    const info = await transporter.sendMail({
      from: `"${ENV.GMAIL_FROM_NAME}" <${ENV.GMAIL_USER}>`,
      to,
      subject,
      html,
      text: text ?? html.replace(/<[^>]*>/g, ""),
    });

    console.log(`[MAILER] Email sent to ${to} - ID: ${info.messageId}`);
  } catch (err: any) {
    console.log("[MAILER] Failed to send email:", err.message);
    throw err;
  }
};
import { ENV } from "../config/env";
<<<<<<< HEAD
import { resendClient } from "../config/resend";

=======
>>>>>>> development
import { sendSms } from "../config/Iprogsms";
import { Notification } from "../models";

<<<<<<< HEAD
// process single notfication
const processSMS = async (notification: any): Promise<void> => {
  const result = await sendSms(notification.recipient, notification.message);

  notification.status = "sent";

  notification.providerRef = String(result.message_id);

  notification.sentAt = new Date();
  await notification.save();
};

const processEmail = async (notification: any): Promise<void> => {
  let subject: string;
  let html: string;

  const populated = await notification.populate([
    { path: "reservationId", populate: { path: "items.bikeId" } },
    { path: "userId", select: "firstName lastName email phone" },
  ]);

  const reservation = populated.reservationId;
  const user = populated.userId;

  if (notification.event === "booking_confirmed") {
    const template = bookingConfirmedTemplate({
      firstName: user.firstName,
      lastName: user.lastName,
      reservationId: String(reservation._id),
      slotHours: reservation.slotHours,
      bikeCount: reservation.items.length,
      scheduledStart: reservation.scheduledStart,
      totalCost: reservation.totalCost,
    });

    subject = template.subject;
    html = template.html;
  } else if (notification.event === "ride_completed") {
    const totalOverdue = reservation.items.reduce(
      (sum: number, item: any) => sum + item.overdueCost,
      0,
    );

    // calculate actual duration from first to last end
    const starts = reservation.items
      .filter((i: any) => i.actualStart)
      .map((i: any) => new Date(i.actualStart).getTime());
    const ends = reservation.items
      .filter((i: any) => i.actualEnd)
      .map((i: any) => new Date(i.actualEnd).getTime());

    const durationMs = Math.max(...ends) - Math.min(...starts);
    const durationMins = Math.ceil(durationMs / 60000);
    const hours = Math.floor(durationMins / 60);
    const mins = durationMins % 60;
    const actualDuration = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

    const template = rideCompletedTemplate({
      firstName: user.firstName,
      reservationId: String(reservation._id),
      totalCost: reservation.totalCost,
      overdueCost: totalOverdue,
      baseCost: reservation.baseCost,
      actualDuration,
    });

    subject = template.subject;
    html = template.html;
  } else {
    // fallback
    subject = `VeloRent - ${notification.event.replace(/_/g, " ")}`;
    html = `<p>${notification.message}</p>`;
  }

  const recipient = !ENV.IS_PROD && ENV.DEV_EMAIL_OVERRIDE ? ENV.DEV_EMAIL_OVERRIDE : notification.recipient;

  const result = await resendClient.emails.send({
    from: `${ENV.RESEND_FROM_NAME} <${ENV.RESEND_FROM_EMAIL}>`,
    to: [recipient],
    subject,
    html,
  });

  notification.status = "sent";
  notification.providerRef = result.data?.id  ;
  notification.sentAt = new Date();
  await notification.save();
};

// ------ process all pending notifcations ------
// called by cron job every minute
=======
>>>>>>> development
export const processPendingNotifications = async (): Promise<void> => {
  const pending = await Notification.find({ status: "pending", channel: "sms" })
    .limit(20)
    .sort({ createdAt: 1 });

  if (pending.length === 0) return;

  console.log(`[SMS] Processing ${pending.length} pending SMS`);

  for (const notification of pending) {
    try {
      if (notification.recipient === "operator") {
        notification.status = "sent";
        await notification.save();
        continue;
      }

      const result = await sendSms(
        notification.recipient,
        notification.message,
      );

      notification.status = "sent";
      notification.providerRef = String(result.message_id);
      notification.sentAt = new Date();
      await notification.save();

      console.log(
        `[SMS] Sent — event: ${notification.event} → ${notification.recipient}`,
      );
    } catch (err: any) {
      notification.status = "failed";
      notification.error = err.message;
      await notification.save();
      console.log(`[SMS] Failed → ${notification.recipient}:`, err.message);
    }
  }
};

// retry failed sms ha
export const retryFailedNotifications = async (): Promise<void> => {
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

  const failed = await Notification.find({
    status: "failed",
    channel: "sms",
    updatedAt: { $gte: twoHoursAgo },
  }).limit(20);

  if (failed.length === 0) return;

  console.log(`[SMS] Retrying ${failed.length} failed SMS notifications`);

  await Notification.updateMany(
    { _id: { $in: failed.map((n) => n._id) } },
    { $set: { status: "pending", error: null } },
  );
};



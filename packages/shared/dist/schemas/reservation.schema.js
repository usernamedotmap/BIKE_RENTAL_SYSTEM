"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationFilterSchema = exports.CompleteItemSchema = exports.StartItemSchema = exports.CancelReservationSchema = exports.WalkInReservationSchema = exports.CreateReservationSchema = exports.BookingChannels = exports.SlotHours = void 0;
const zod_1 = require("zod");
exports.SlotHours = [1, 2, 3];
exports.BookingChannels = ["online", "walk_in"];
exports.CreateReservationSchema = zod_1.z.object({
    bikeIds: zod_1.z
        .array(zod_1.z.string().min(1))
        .min(1, "At least one bike is required")
        .max(5, "Maximum 5 bikes per reservation"),
    slotHours: zod_1.z.union([zod_1.z.literal(1), zod_1.z.literal(2), zod_1.z.literal(3)], {
        errorMap: () => ({ message: "Slout must be 1, 2, or 3 hours" }),
    }),
    scheduledStart: zod_1.z.string().datetime("Invalid date format"),
    notes: zod_1.z.string().max(500).optional(),
});
exports.WalkInReservationSchema = zod_1.z.object({
    bikeIds: zod_1.z
        .array(zod_1.z.string().min(1))
        .min(1, "At least one bike is required")
        .max(5, "Maximum 5 bikes per reservation"),
    slotHours: zod_1.z.union([zod_1.z.literal(1), zod_1.z.literal(2), zod_1.z.literal(3)], {
        errorMap: () => ({ message: "Slot must be 1, 2, or 3hours" }),
    }),
    userId: zod_1.z.string().optional(),
    notes: zod_1.z.string().max(500).optional(),
});
exports.CancelReservationSchema = zod_1.z.object({
    cancellationReason: zod_1.z
        .string()
        .min(3, "Plase provide a reason")
        .max(500, "Reason too big"),
});
exports.StartItemSchema = zod_1.z.object({
    itemId: zod_1.z.string().min(1, "Item ID is required"),
});
exports.CompleteItemSchema = zod_1.z.object({
    itemId: zod_1.z.string().min(1, "Item ID is required"),
});
exports.ReservationFilterSchema = zod_1.z.object({
    status: zod_1.z
        .enum([
        "pending",
        "confirmed",
        "active",
        "completed",
        "cancelled",
        "overdue",
    ])
        .optional(),
    channel: zod_1.z.enum(["online", "walk_in"]).optional(),
    userId: zod_1.z.string().optional(),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().max(50).default(10),
});

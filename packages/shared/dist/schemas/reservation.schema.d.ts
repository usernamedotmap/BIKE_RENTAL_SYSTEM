import { z } from "zod";
export declare const SlotHours: readonly [1, 2, 3];
export declare const BookingChannels: readonly ["online", "walk_in"];
export declare const CreateReservationSchema: z.ZodObject<{
    bikeIds: z.ZodArray<z.ZodString, "many">;
    slotHours: z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>]>;
    scheduledStart: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    bikeIds: string[];
    slotHours: 2 | 1 | 3;
    scheduledStart: string;
    notes?: string | undefined;
}, {
    bikeIds: string[];
    slotHours: 2 | 1 | 3;
    scheduledStart: string;
    notes?: string | undefined;
}>;
export type CreateReservationInput = z.infer<typeof CreateReservationSchema>;
export declare const WalkInReservationSchema: z.ZodObject<{
    bikeIds: z.ZodArray<z.ZodString, "many">;
    slotHours: z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<2>, z.ZodLiteral<3>]>;
    userId: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    bikeIds: string[];
    slotHours: 2 | 1 | 3;
    notes?: string | undefined;
    userId?: string | undefined;
}, {
    bikeIds: string[];
    slotHours: 2 | 1 | 3;
    notes?: string | undefined;
    userId?: string | undefined;
}>;
export type WalkInReservationInput = z.infer<typeof WalkInReservationSchema>;
export declare const CancelReservationSchema: z.ZodObject<{
    cancellationReason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    cancellationReason: string;
}, {
    cancellationReason: string;
}>;
export type CancelReservationInput = z.infer<typeof CancelReservationSchema>;
export declare const StartItemSchema: z.ZodObject<{
    itemId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    itemId: string;
}, {
    itemId: string;
}>;
export type StartItemInput = z.infer<typeof StartItemSchema>;
export declare const CompleteItemSchema: z.ZodObject<{
    itemId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    itemId: string;
}, {
    itemId: string;
}>;
export type CompleteItemInput = z.infer<typeof CompleteItemSchema>;
export declare const ReservationFilterSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["pending", "confirmed", "active", "completed", "cancelled", "overdue"]>>;
    channel: z.ZodOptional<z.ZodEnum<["online", "walk_in"]>>;
    userId: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    status?: "pending" | "confirmed" | "active" | "completed" | "cancelled" | "overdue" | undefined;
    userId?: string | undefined;
    channel?: "online" | "walk_in" | undefined;
}, {
    status?: "pending" | "confirmed" | "active" | "completed" | "cancelled" | "overdue" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    userId?: string | undefined;
    channel?: "online" | "walk_in" | undefined;
}>;
export type ReservationFilterInput = z.infer<typeof ReservationFilterSchema>;
//# sourceMappingURL=reservation.schema.d.ts.map
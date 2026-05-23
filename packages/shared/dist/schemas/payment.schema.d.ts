import z from "zod";
export declare const InitializePaymentSchema: z.ZodObject<{
    reservationId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reservationId: string;
}, {
    reservationId: string;
}>;
export type InitializePaymentInput = z.infer<typeof InitializePaymentSchema>;
//# sourceMappingURL=payment.schema.d.ts.map
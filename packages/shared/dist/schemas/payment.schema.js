"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializePaymentSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// export const PaymentMethods = ["gcash", "paymaya", "card"] as const;
// ---- initialize payment
exports.InitializePaymentSchema = zod_1.default.object({
    reservationId: zod_1.default.string().min(1, "Reservation ID is required"),
    // paymentMethod: z.enum(PaymentMethods, {
    //   errorMap: () => ({
    //     message: "Payment method must be gcash, paymaya, or card",
    //   }),
    // }),
});

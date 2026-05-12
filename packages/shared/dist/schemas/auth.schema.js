"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.LoginSchema = exports.RegisterSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const passwordRule = zod_1.default
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(64, "Password must be under 64 characters");
const phoneRule = zod_1.default
    .string()
    .regex(/^(09|\+639)\d{9}$/, "Phone must be a valid PH number (e.g., 09171234567 or +639171234567)");
const nameRule = (field) => zod_1.default
    .string()
    .min(2, `${field} must be at least 2 characters`)
    .max(50, `${field} must be under 50 characters`)
    .trim();
// ------ Register here ----------
exports.RegisterSchema = zod_1.default.object({
    firstName: nameRule("First name"),
    lastName: nameRule("Last name"),
    email: zod_1.default.string().email("Invalid email address").toLowerCase().trim(),
    phone: phoneRule,
    password: passwordRule,
});
// ------- Login naman dito --------
exports.LoginSchema = zod_1.default.object({
    email: zod_1.default.string().email("Invalid email address").toLowerCase().trim(),
    password: passwordRule,
});
// ------- Changed password ---------
exports.changePasswordSchema = zod_1.default
    .object({
    currentPassword: zod_1.default.string().min(1, "Current password is required"),
    newPassword: passwordRule,
    confirmPassword: zod_1.default.string(),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ["confirmPassword"],
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeStatusSchema = exports.BikeFilterSchema = exports.UpdateBikeSchema = exports.CreateBikeSchema = exports.ManualStatuses = exports.AutoStatuses = exports.BikeStyles = exports.BikeCategories = void 0;
const zod_1 = require("zod");
exports.BikeCategories = ["solo", "kid", "family"];
exports.BikeStyles = ["standard", "mountain", "bmx"];
exports.AutoStatuses = ["reserved", "in_use"];
exports.ManualStatuses = ["available", "maintenance", "retired"];
exports.CreateBikeSchema = zod_1.z.object({
    serialNumber: zod_1.z
        .string()
        .min(3, "Serial number too short")
        .max(50, "Serial number too long")
        .trim(),
    name: zod_1.z.string().min(2).max(100).trim(),
    category: zod_1.z.enum(exports.BikeCategories, {
        errorMap: () => ({ message: "Invalid bike category" }),
    }),
    style: zod_1.z.enum(exports.BikeStyles, {
        errorMap: () => ({ message: "Invalid bike style" }),
    }),
    imageUrls: zod_1.z.array(zod_1.z.string().url()).default([]),
});
exports.UpdateBikeSchema = exports.CreateBikeSchema.partial().extend({
    status: zod_1.z.enum(exports.ManualStatuses).optional(),
});
exports.BikeFilterSchema = zod_1.z.object({
    category: zod_1.z.enum(exports.BikeCategories).optional(),
    style: zod_1.z.enum(exports.BikeStyles).optional(),
    status: zod_1.z.enum(exports.ManualStatuses).optional(),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(50).default(10),
});
exports.BikeStatusSchema = zod_1.z
    .object({
    status: zod_1.z.enum(exports.ManualStatuses, {
        errorMap: () => ({
            message: "You can only manually set: available, maintenance, or retired. " +
                "reserved and in_use are set automatically by the system.",
        }),
    }),
    note: zod_1.z.string().max(500).optional(),
})
    .refine((data) => {
    if (data.status === "maintenance" && !data.note?.trim()) {
        return false;
    }
    return true;
}, {
    message: "A note is required when setting a bike to maintenance",
    path: ["note"],
});

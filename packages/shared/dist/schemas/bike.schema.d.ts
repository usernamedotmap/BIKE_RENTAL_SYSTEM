import { z } from "zod";
export declare const BikeCategories: readonly ["solo", "kid", "family"];
export declare const BikeStyles: readonly ["standard", "mountain", "bmx"];
export declare const AutoStatuses: readonly ["reserved", "in_use"];
export declare const ManualStatuses: readonly ["available", "maintenance", "retired"];
export declare const CreateBikeSchema: z.ZodObject<{
    serialNumber: z.ZodString;
    name: z.ZodString;
    category: z.ZodEnum<["solo", "kid", "family"]>;
    style: z.ZodEnum<["standard", "mountain", "bmx"]>;
    imageUrls: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    serialNumber: string;
    name: string;
    category: "solo" | "kid" | "family";
    style: "standard" | "mountain" | "bmx";
    imageUrls: string[];
}, {
    serialNumber: string;
    name: string;
    category: "solo" | "kid" | "family";
    style: "standard" | "mountain" | "bmx";
    imageUrls?: string[] | undefined;
}>;
export type CreateBikeInput = z.infer<typeof CreateBikeSchema>;
export declare const UpdateBikeSchema: z.ZodObject<{
    serialNumber: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEnum<["solo", "kid", "family"]>>;
    style: z.ZodOptional<z.ZodEnum<["standard", "mountain", "bmx"]>>;
    imageUrls: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
} & {
    status: z.ZodOptional<z.ZodEnum<["available", "maintenance", "retired"]>>;
}, "strip", z.ZodTypeAny, {
    status?: "available" | "maintenance" | "retired" | undefined;
    serialNumber?: string | undefined;
    name?: string | undefined;
    category?: "solo" | "kid" | "family" | undefined;
    style?: "standard" | "mountain" | "bmx" | undefined;
    imageUrls?: string[] | undefined;
}, {
    status?: "available" | "maintenance" | "retired" | undefined;
    serialNumber?: string | undefined;
    name?: string | undefined;
    category?: "solo" | "kid" | "family" | undefined;
    style?: "standard" | "mountain" | "bmx" | undefined;
    imageUrls?: string[] | undefined;
}>;
export type UpdateBikeInput = z.infer<typeof UpdateBikeSchema>;
export declare const BikeFilterSchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodEnum<["solo", "kid", "family"]>>;
    style: z.ZodOptional<z.ZodEnum<["standard", "mountain", "bmx"]>>;
    status: z.ZodOptional<z.ZodEnum<["available", "maintenance", "retired"]>>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    status?: "available" | "maintenance" | "retired" | undefined;
    category?: "solo" | "kid" | "family" | undefined;
    style?: "standard" | "mountain" | "bmx" | undefined;
}, {
    status?: "available" | "maintenance" | "retired" | undefined;
    category?: "solo" | "kid" | "family" | undefined;
    style?: "standard" | "mountain" | "bmx" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type BikeFilterInput = z.infer<typeof BikeFilterSchema>;
export declare const BikeStatusSchema: z.ZodEffects<z.ZodObject<{
    status: z.ZodEnum<["available", "maintenance", "retired"]>;
    note: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "available" | "maintenance" | "retired";
    note?: string | undefined;
}, {
    status: "available" | "maintenance" | "retired";
    note?: string | undefined;
}>, {
    status: "available" | "maintenance" | "retired";
    note?: string | undefined;
}, {
    status: "available" | "maintenance" | "retired";
    note?: string | undefined;
}>;
export type BikeStatusInput = z.infer<typeof BikeStatusSchema>;
//# sourceMappingURL=bike.schema.d.ts.map
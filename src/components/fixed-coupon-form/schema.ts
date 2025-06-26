import * as z from "zod";

export const fixedCouponSchema = z.object({
	code: z.string(),
});

export type FixedCouponSchema = z.infer<typeof fixedCouponSchema>;

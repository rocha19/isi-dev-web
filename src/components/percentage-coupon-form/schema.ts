import * as z from "zod";

export const percentageCouponSchema = z.object({
	percent: z.string().optional(),
});

export type PercentageCouponSchema = z.infer<typeof percentageCouponSchema>;

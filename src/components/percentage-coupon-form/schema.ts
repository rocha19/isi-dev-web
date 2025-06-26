import * as z from "zod";

export const percentageCouponSchema = z.object({
	code: z.string(),
});

export type PercentageCouponSchema = z.infer<typeof percentageCouponSchema>;

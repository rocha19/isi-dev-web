import { api } from "@/utils/axios-instance";
import type { ApplyCoupon } from "./types";

export const applyCouponPercentage = async ({ code, id }: ApplyCoupon) => {
	const { data } = await api.post(`products/${id}/discount/percent`, {
		code,
	});

	return data;
};

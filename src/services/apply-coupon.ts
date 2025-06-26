import { api } from "@/utils/axios-instance";
import type { ApplyCoupon } from "./types";

export const applyCoupon = async ({ code, id }: ApplyCoupon) => {
	const { data } = await api.post(`products/${id}/discount/coupon`, {
		code,
	});

	return data;
};

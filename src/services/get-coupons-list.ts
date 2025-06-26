import { api } from "@/utils/axios-instance";
import type { Coupon } from "./types";

export const getCouponsList = async () => {
  const { data } = await api.get<{ data: { data: Coupon[]; meta: any } }>(
    "/coupons",
  );
  return data;
};

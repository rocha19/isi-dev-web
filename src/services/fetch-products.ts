import { api } from "@/utils/axios-instance";
import type { Paginate, Product } from "./types";

export const fetchProducts = async () => {
	const { data } = await api.get<Paginate<Product>>("/products");

	return data;
};

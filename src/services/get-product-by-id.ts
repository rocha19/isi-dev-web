import { api } from "@/utils/axios-instance";
import type { Product, UpdateProduct } from "./types";

export const getProductById = async (id: string) => {
	const { data } = await api.get<Product>(`/products/${id}`);

	return data;
};

export const updateProduct = async ({
	id,
	name,
	price,
	stock,
	description,
}: UpdateProduct) => {
	const { data } = await api.patch(`/products/${id}`, {
		name,
		price,
		stock,
		description,
	});

	return data;
};

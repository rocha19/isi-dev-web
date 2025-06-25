import * as z from "zod";

export const createProductSchema = z.object({
	name: z
		.string({
			required_error: "Campo obrigatório",
		})
		.min(3, "Nome deve ter pelo menos 3 caracteres")
		.max(100, "Nome não deve ter mais de 100 caracteres"),
	description: z.string().optional(),
	price: z
		.number({
			required_error: "Campo obrigatório",
		})
		.min(0.01, "Valor minimo: R$0,01")
		.max(1000000, "Valor Máximo R$1.000.000,00")
		.transform((val) => val * 100)
		.refine((val) => !Number.isNaN(val), { message: "Valor inválido" }),
	stock: z.coerce
		.number({
			required_error: "Campo obrigatório",
		})
		.min(0, "Proibido valor negativo")
		.max(999999, "Limite de estoque: 999999"),
});

export type ProductSchema = z.infer<typeof createProductSchema>;

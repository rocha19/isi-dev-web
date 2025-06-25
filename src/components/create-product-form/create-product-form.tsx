import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { createProductSchema, type ProductSchema } from "./schema";

export const CreateProductForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ProductSchema>({
		resolver: zodResolver(createProductSchema),
	});

	const onSubmit = (data: ProductSchema) => {
		console.log(data);
	};

	return (
		<div className="bg-white rounded-xl">
			<div className="w-full border-b-2 py-4 px-12">
				<h3>Dados do produto</h3>
			</div>

			<form
				className="py-6 px-12 flex flex-col gap-8"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="grid gap-1">
					<Label>
						Nome do produto <span className="text-red-500">*</span>
					</Label>
					<Controller
						control={control}
						name="name"
						render={({ field }) => (
							<Input {...field} placeholder="Informe o nome do produto" />
						)}
					/>
				</div>
				<div className="grid gap-1">
					<Label>Descrição do produto</Label>
					<Controller
						control={control}
						name="description"
						render={({ field }) => (
							<Textarea
								{...field}
								value={field.value ?? ""}
								placeholder="Descrição detalhada do produto"
								className="h-28"
							/>
						)}
					/>
				</div>
				<div className="flex w-full gap-4">
					<div className="grid gap-1 w-full">
						<Label>
							Preço <span className="text-red-500">*</span>
						</Label>
						<Controller
							control={control}
							name="price"
							render={({ field }) => (
								<Input
									{...field}
									placeholder="R$ 0,00"
									value={field.value}
									onChange={(e) => {
										field.onChange(Number(e.target.value));
									}}
								/>
							)}
						/>
					</div>
					<div className="grid gap-1 w-full">
						<Label>
							Estoque <span className="text-red-500">*</span>
						</Label>
						<Controller
							control={control}
							name="stock"
							render={({ field }) => (
								<Input
									placeholder="0"
									onChange={(e) => {
										field.onChange(Number(e.target.value));
									}}
								/>
							)}
						/>{" "}
					</div>
				</div>
				<div className="flex gap-4 w-full justify-end">
					<Button variant={"outline"} type="button">
						Cancelar
					</Button>
					<Button type="submit">Atualizar</Button>
				</div>
			</form>
		</div>
	);
};

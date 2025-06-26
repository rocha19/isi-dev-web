import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "@/services";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { type UpdateProductSchema, updateProductSchema } from "./schema";

type Props = {
	id: string;
};

export const UpdateProductForm = ({ id }: Props) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { data: productData } = useQuery({
		queryKey: ["get-product"],
		queryFn: () => getProductById(id),
	});

	const { control, handleSubmit, setValue } = useForm<UpdateProductSchema>({
		resolver: zodResolver(updateProductSchema),
		defaultValues: {
			name: productData?.name,
			price: productData?.price,
			stock: productData?.stock,
			description: productData?.description ?? "",
		},
	});

	const { mutate } = useMutation({
		mutationKey: ["create-products"],
		mutationFn: updateProduct,
		onSuccess: () => {
			alert("Produto atualizado!");
			queryClient.invalidateQueries({ queryKey: ["products"] });
			navigate("/");
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const onSubmit = (data: UpdateProductSchema) => {
		if (productData) {
			mutate({
				id: productData.id,
				...data,
			});
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (productData) {
			setValue("name", productData.name);
			setValue("description", productData.description ?? "");
			setValue("stock", productData.stock);
		}
	}, [id, productData, setValue]);

	return (
		<Suspense fallback={<div>Loading....</div>}>
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
										value={field.value}
										onChange={(e) => {
											field.onChange(Number(e.target.value));
										}}
									/>
								)}
							/>{" "}
						</div>
					</div>
					<div className="flex gap-4 w-full justify-end">
						<Button
							variant={"outline"}
							type="button"
							onClick={() => navigate(-1)}
						>
							Cancelar
						</Button>
						<Button type="submit">Atualizar</Button>
					</div>
				</form>
			</div>
		</Suspense>
	);
};

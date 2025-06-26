import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { applyCouponPercentage } from "@/services/apply-coupon-percentage";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { type PercentageCouponSchema, percentageCouponSchema } from "./schema";

type Props = {
	productId: string;
};

export const PercentageCouponForm = ({ productId }: Props) => {
	const { control, handleSubmit } = useForm<PercentageCouponSchema>({
		resolver: zodResolver(percentageCouponSchema),
	});

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationKey: ["apply-product-discount"],
		mutationFn: applyCouponPercentage,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const onSubmit = (data: PercentageCouponSchema) => {
		mutate({
			id: productId,
			code: data.code,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mt-6">
			<div className="grid gap-1">
				<Label>Percentual de desconto</Label>
				<Controller
					control={control}
					name="code"
					render={({ field }) => (
						<Input className="py-5" placeholder="Ex.: 10%" {...field} />
					)}
				/>
				<span className="text-xs text-secondary-foreground">
					Digite um valor entre 1% e 80%
				</span>
			</div>
		</form>
	);
};

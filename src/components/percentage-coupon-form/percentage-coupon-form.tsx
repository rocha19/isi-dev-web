import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { type PercentageCouponSchema, percentageCouponSchema } from "./schema";

export const PercentageCouponForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<PercentageCouponSchema>({
		resolver: zodResolver(percentageCouponSchema),
	});

	const onSubmit = (data: PercentageCouponSchema) => {
		console.log(data);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mt-6">
			<div className="grid gap-1">
				<Label>Percentual de desconto</Label>
				<Controller
					control={control}
					name="percent"
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

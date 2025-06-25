import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { fakeCoupons } from "@/utils/coupons";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { type FixedCouponSchema, fixedCouponSchema } from "./schema";

export const FixedCouponForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<FixedCouponSchema>({
		resolver: zodResolver(fixedCouponSchema),
	});

	const onSubmit = (data: FixedCouponSchema) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mt-6">
			<div className="grid gap-1">
				<Label>Código do Cupom</Label>
				<Controller
					control={control}
					name="code"
					render={({ field }) => (
						<Input className="py-5" placeholder="R$ 0,00" {...field} />
					)}
				/>
			</div>
			<div className="grid gap-4 mt-4">
				<span className="text-xs text-secondary-foreground">
					Cupons para teste:
				</span>
				<div className="grid grid-cols-3 gap-2">
					{fakeCoupons.map((coupon) => (
						<div
							className="border px-3 rounded py-2 text-center text-sm"
							key={coupon.id}
						>
							{coupon.code}
						</div>
					))}
				</div>
			</div>
		</form>
	);
};

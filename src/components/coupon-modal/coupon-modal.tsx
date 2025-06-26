import { DollarSignIcon, TagIcon } from "lucide-react";
import { useState } from "react";
import { FixedCouponForm } from "../fixed-coupon-form";
import { PercentageCouponForm } from "../percentage-coupon-form";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

export type CouponType = "fixed" | "percent";

type Props = {
	productId: string;
};

export const CouponModal = ({ productId }: Props) => {
	const [couponType, setCouponType] = useState<CouponType>("fixed");

	return (
		<Dialog>
			<DialogTrigger asChild>
				<DollarSignIcon size={16} />
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<TagIcon /> Aplicar desconto
					</DialogTitle>

					<DialogDescription>
						Escolha como aplicar o desconto ao produto
					</DialogDescription>

					<div className="flex justify-between mt-4">
						<Button
							onClick={() => setCouponType("fixed")}
							size={"lg"}
							variant={couponType === "fixed" ? "default" : "outline"}
						>
							<TagIcon />
							Código de cupom
						</Button>
						<Button
							onClick={() => setCouponType("percent")}
							size={"lg"}
							variant={couponType === "percent" ? "default" : "outline"}
						>
							<TagIcon />
							Percentual Direto
						</Button>
					</div>
				</DialogHeader>

				{couponType === "fixed" && <FixedCouponForm productId={productId} />}
				{couponType === "percent" && (
					<PercentageCouponForm productId={productId} />
				)}
			</DialogContent>
		</Dialog>
	);
};

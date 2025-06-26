import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { applyCoupon } from "@/services/apply-coupon";
import { getCouponsList } from "@/services/get-coupons-list";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { type FixedCouponSchema, fixedCouponSchema } from "./schema";

type Props = {
  productId: string;
};

export const FixedCouponForm = ({ productId }: Props) => {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FixedCouponSchema>({
    resolver: zodResolver(fixedCouponSchema),
    mode: "onChange",
  });

  const { data } = useQuery({
    queryKey: ["coupons-list"],
    queryFn: getCouponsList,
  });
  const coupons = data?.data?.data ?? [];

  console.log(coupons);

  const { mutate } = useMutation({
    mutationKey: ["apply-product-discount"],
    mutationFn: applyCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data: FixedCouponSchema) => {
    mutate({
      id: productId,
      code: data.code,
    });
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
        <span className="text-red-500 text-xs">{errors.code?.message}</span>
      </div>
      <div className="grid gap-4 mt-4">
        <span className="text-xs text-secondary-foreground">
          Cupons para teste:
        </span>
        <div className="grid grid-cols-3 gap-2">
          {coupons?.map((coupon) => (
            <Button
              className="border px-3 rounded py-2 text-center text-sm"
              key={coupon.id}
              onClick={() => setValue("code", coupon.code)}
            >
              {coupon.code}
            </Button>
          ))}
        </div>
      </div>
    </form>
  );
};

export type CouponType = "FIXED" | "PERCENT";

export type Coupon = {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  one_shot: boolean;
  valid_from: string;
  valid_until: string;
  uses_count: number;
  max_uses: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type CreateProduct = {
  name: string;
  description?: string;
  stock: number;
  price: number;
};

export type UpdateProduct = {
  id: string;
} & CreateProduct;

export type ListProductsProps = {
  page?: number;
  search?: string;
  limit?: number;
  minPrice?: string;
  maxPrice?: string;
  has_discount?: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  stock: number;
  price: number;
  is_out_of_stock: boolean;
  has_coupon_applied: boolean;
  final_price: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  discount?: Discount;
};

export type Paginate<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total_items: number;
    total_pages: number;
  };
};

export type Discount = {
  type: CouponType;
  value: number;
  applied_at: string;
};

export type ApplyCoupon = {
  id: string;
  code: string;
};
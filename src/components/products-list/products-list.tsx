import { useQuery } from "@tanstack/react-query";
import { EditIcon, TrashIcon } from "lucide-react";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/utils/axios-instance";
import { formatCurrency } from "@/utils/formatCurrency";
import { tableHeaders } from "@/utils/table";
import { CouponModal } from "../coupon-modal";
import { Label } from "../ui/label";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../ui/pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

type Product = {
	id: string;
	name: string;
	descritpion: string;
	price: number;
	stock: number;
};

const fetchProducts = async () => {
	const { data } = await api.get<{ data: { data: Product[]; meta: any } }>(
		"/products",
	);
	return data;
};

export const ProductsList = () => {
	const { data } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
	const meta = data?.data?.meta ?? {};
	const products = data?.data?.data ?? [];

	const navigate = useNavigate();

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Table className="min-w-[768px] bg-white rounded-xl mt-4">
				<TableHeader>
					<TableRow className="h-16">
						{tableHeaders.map((item) => (
							<TableHead key={item.label}>{item.label}</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{products?.map((item) => (
						<TableRow key={item.id} className="h-12">
							<TableCell>{item.name}</TableCell>
							<TableCell className="max-w-[120px] truncate text-gray-500">
								{item.descritpion}
							</TableCell>
							<TableCell>{formatCurrency(item.price / 100)}</TableCell>
							<TableCell>
								{item.stock === 0 ? (
									<Label className="bg-red-500 text-white text-xs w-fit px-2 py-1 rounded-lg">
										Esgotado
									</Label>
								) : (
									item.stock
								)}
							</TableCell>
							<TableCell align="right" className="flex gap-2">
								<EditIcon
									size={16}
									onClick={() => navigate(`/editar-produto/${item.id}`)}
								/>
								<CouponModal productId={item.id} />
								<TrashIcon size={16} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Pagination className="mt-4">
				<PaginationContent>
					<PaginationItem className="rounded-lg" onClick={() => {}}>
						<PaginationPrevious />
					</PaginationItem>
					{Array.from({ length: meta.toal_pages }).map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<PaginationLink key={index + 2} onClick={() => {}}>
							{index + 1}
						</PaginationLink>
					))}
					<PaginationItem onClick={() => {}}>
						<PaginationNext />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</Suspense>
	);
};

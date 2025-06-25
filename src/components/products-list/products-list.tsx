import { EditIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/utils/formatCurrency";
import { fakeTableData, tableHeaders } from "@/utils/table";
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

export const ProductsList = () => {
	const pages = 5;
	const navigate = useNavigate();

	return (
		<>
			<Table className="min-w-[768px] bg-white rounded-xl mt-4">
				<TableHeader>
					<TableRow className="h-16">
						{tableHeaders.map((item) => (
							<TableHead key={item.label}>{item.label}</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{fakeTableData.map((item) => (
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
									onClick={() => navigate("/editar-produto")}
								/>
								<CouponModal />
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
					{Array.from({ length: pages }).map((_, index) => (
						<PaginationLink
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index + 2}
							onClick={() => {}}
						>
							{index + 1}
						</PaginationLink>
					))}
					<PaginationItem onClick={() => {}}>
						<PaginationNext />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</>
	);
};

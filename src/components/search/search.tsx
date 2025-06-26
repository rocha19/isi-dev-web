import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

let debounceTimer: ReturnType<typeof setTimeout>;

export const Search = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
	const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
	const [search, setSearch] = useState(searchParams.get("search") || "");

	useEffect(() => {
		clearTimeout(debounceTimer);

		debounceTimer = setTimeout(() => {
			const params: Record<string, string> = {};

			if (minPrice) params.minPrice = minPrice;
			if (maxPrice) params.maxPrice = maxPrice;
			if (search) params.search = search;

			setSearchParams(params);
		}, 300);
	}, [search, maxPrice, minPrice, setSearchParams]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const params: Record<string, string> = {};

		if (minPrice) params.min = minPrice;
		if (maxPrice) params.maxPrice = maxPrice;
		if (search) params.search = search;

		setSearchParams(params);
	};

	return (
		<div className="w-full flex flex-col lg:flex-row lg:items-end lg:justify-between">
			<form
				className="grid grid-cols-1 lg:flex items-end gap-4 lg:gap-6"
				onSubmit={handleSubmit}
			>
				<div className="grid gap-1">
					<Label>Preço mínimo</Label>
					<Input
						className="py-5"
						placeholder="R$ 0,00"
						value={minPrice}
						onChange={(e) => setMinPrice(e.target.value)}
					/>
				</div>
				<div className="grid gap-1">
					<Label>Preço máximo</Label>
					<Input
						className="py-5"
						placeholder="R$ 0,00"
						value={maxPrice}
						onChange={(e) => setMaxPrice(e.target.value)}
					/>
				</div>
				<Button className="py-5" type="submit">
					Filtrar
				</Button>
			</form>

			<div className="flex items-end gap-4 mt-4 lg:mt-0">
				<Input
					placeholder="Buscar produto..."
					className="py-5 lg:w-fit"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Button className="py-5" onClick={() => navigate("/criar-produto")}>
					<PlusIcon />
					Criar produto
				</Button>
			</div>
		</div>
	);
};

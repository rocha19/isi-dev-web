import { ShoppingBagIcon } from "lucide-react";
import { ProductsList, Search } from "@/components";

function App() {
	return (
		<div className="grid gap-6 w-full">
			<h1 className="text-2xl font-semibold flex gap-1">
				<ShoppingBagIcon size={28} />
				Produtos
			</h1>
			<Search />
			<ProductsList />
		</div>
	);
}

export default App;

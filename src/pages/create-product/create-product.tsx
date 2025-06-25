import { FilePlus2 } from "lucide-react";
import { CreateProductForm } from "@/components";

export const CreateProduct = () => {
	return (
		<>
			<h1 className="text-2xl font-semibold flex gap-1 mb-12">
				<FilePlus2 size={28} />
				Cadastro de Produtos
			</h1>
			<CreateProductForm />
		</>
	);
};

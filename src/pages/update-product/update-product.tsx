import { EditIcon } from "lucide-react";
import { UpdateProductForm } from "@/components";

export const UpdateProduct = () => {
	return (
		<>
			<h1 className="text-2xl font-semibold flex gap-1 mb-12">
				<EditIcon size={28} />
				Editar Produto
			</h1>
			<UpdateProductForm />
		</>
	);
};

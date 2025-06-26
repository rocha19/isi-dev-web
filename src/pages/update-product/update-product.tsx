import { EditIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { UpdateProductForm } from "@/components";

export const UpdateProduct = () => {
	const params = useParams();

	return (
		<>
			<h1 className="text-2xl font-semibold flex gap-1 mb-12">
				<EditIcon size={28} />
				Editar Produto
			</h1>
			<UpdateProductForm id={params.id!} />
		</>
	);
};

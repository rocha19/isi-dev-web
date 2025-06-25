import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { MainLayout } from "@/components";
import { CreateProduct, UpdateProduct } from "@/pages";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ index: true, element: <App /> },
			{ path: "/editar-produto", element: <UpdateProduct /> },
			{ path: "/criar-produto", element: <CreateProduct /> },
		],
	},
]);

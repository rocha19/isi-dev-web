import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { Sidebar } from "../sidebar";

export const MainLayout = () => {
	return (
		<div className="grid grid-cols-[60px_1fr] lg:grid-cols-[240px_1fr] grid-rows-[64px_1fr] h-screen">
			<Sidebar />
			<Header />
			<main className="px-12 lg:px-24 py-6 bg-[#f8fafc] overflow-auto">
				<Outlet />
			</main>
		</div>
	);
};

import { Label } from "@radix-ui/react-label";
import {
	FileTextIcon,
	HouseIcon,
	SettingsIcon,
	ShoppingBagIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "@/assets/image/logo-image.png";
import smallLogo from "@/assets/image/small-logo.png";

export const Sidebar = () => {
	return (
		<aside className="row-span-2 bg-white border-r p-4 w-fit lg:w-auto">
			<div className="font-bold text-xl mb-6">
				<img src={logo} alt="logo" className="hidden lg:block" />
				<img src={smallLogo} alt="logo" className="lg:hidden" />
			</div>
			<div className="grid gap-4">
				<NavLink to={"/"} className="flex gap-2 items-end">
					<ShoppingBagIcon /> <span className="hidden lg:block">Produtos</span>
				</NavLink>
				<Label className="flex gap-2 items-end cursor-not-allowed">
					<HouseIcon /> <span className="hidden lg:block">Dashboard</span>
				</Label>
				<Label className="flex gap-2 items-end cursor-not-allowed">
					<FileTextIcon /> <span className="hidden lg:block">Relatórios</span>
				</Label>
				<Label className="flex gap-2 items-end cursor-not-allowed">
					<SettingsIcon />{" "}
					<span className="hidden lg:block">Administração</span>
				</Label>
			</div>
		</aside>
	);
};

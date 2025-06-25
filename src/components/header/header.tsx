import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";

export const Header = () => {
	return (
		<header className="w-full flex justify-end items-center border-b px-12">
			<div className="flex items-center gap-2">
				<Avatar className="grid place-items-center">
					<AvatarImage src="/image.png" />
					<AvatarFallback>AM</AvatarFallback>
				</Avatar>
				<Label>Arthur Morgan</Label>
			</div>
		</header>
	);
};

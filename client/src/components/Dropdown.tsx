import { ProfileAvatar } from "./ProfileAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Dropdown() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ProfileAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem> Profile</DropdownMenuItem>
          <DropdownMenuItem> Library</DropdownMenuItem>
          <DropdownMenuItem> Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem> Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

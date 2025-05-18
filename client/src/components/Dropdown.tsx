import { useNavigate } from "react-router-dom";
import { ProfileAvatar } from "./ProfileAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useUser } from "@/Context";

export function Dropdown() {
  const { user, setUser } = useUser();
  const navigate = useNavigate(); // need this to actually navigate somewhere

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/logIn");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ProfileAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate(`/profile/${user?.id}`)}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(`/library/${user?.id}`)}>
            Library
          </DropdownMenuItem>
          <DropdownMenuItem> Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}> Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

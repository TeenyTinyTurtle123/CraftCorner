import { Link } from "react-router-dom";
import logo from "../assets/Logotransparant.png";
import { Dropdown } from "./Dropdown";
import { Label } from "@radix-ui/react-label";
import { useUser } from "@/Context";

export function Header() {
  const { user } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b-2 border-t-2 border-teal-300 p-4 z-50 flex items-center justify-between ">
      <div className="z-10">
        <img className="h-12 w-auto" src={logo} alt="Logo" />
      </div>
      <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6">
        <Link className="hover:text-teal-300 font-semibold text-lg" to="/">
          Home
        </Link>
        <Link
          className="hover:text-teal-300 font-semibold text-lg"
          to="/library"
        >
          Library
        </Link>
        <Link
          className="hover:text-teal-300 font-semibold text-lg"
          to="/addProject"
        >
          Add Project
        </Link>
        <Link
          className="hover:text-teal-300 font-semibold text-lg"
          to={`/profile/${user?.id}`}
        >
          Profile
        </Link>
      </nav>
      {/* Dropdown (right) */}
      <div className="z-10 flex items-center gap-2">
        <Label>Welcome {user?.username}</Label>
        <Dropdown />
      </div>
    </header>
  );
}

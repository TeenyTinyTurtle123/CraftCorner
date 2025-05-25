import { useUser } from "@/Context";
import { Label } from "@radix-ui/react-label";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logotransparant.png";
import { Dropdown } from "./Dropdown";

export function Header() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 h-24 bg-white border-b-2 border-t-2 border-teal-500 p-4 z-50 flex items-center justify-between ">
      <div className="z-10">
        <img
          className="h-12 w-auto cursor-pointer"
          src={logo}
          alt="Logo"
          onClick={() => navigate(`/`)}
        />
      </div>
      <nav className="hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:flex gap-6">
        <Link className="hover:text-teal-500 font-semibold text-lg">
          Stitch Count
        </Link>
        <Link
          className="hover:text-teal-500 font-semibold text-lg"
          to={`/profile/${user?.id}`}
        >
          CrossStitch
        </Link>
        {/* TODO: Link to the test page  */}
        {/* <Link
          className="hover:text-teal-500 font-semibold text-lg"
          to="/testPage"
        >
          TestPage
        </Link> */}
      </nav>

      {/* Right side: Dropdown or login link */}
      <div className="z-10 flex items-center gap-2">
        {user ? (
          <>
            <Label className="text-lg hidden sm:block">
              Welcome {user.username}!
            </Label>
            <Dropdown />
          </>
        ) : (
          <Link
            className="hover:text-teal-300 font-semibold text-lg"
            to="/login"
          >
            Sign in / Log in
          </Link>
        )}
      </div>
    </header>
  );
}

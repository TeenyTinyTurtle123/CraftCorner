import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 bg-green-500 text-white p-4 z-50">
      <nav className="flex align-middle justify-center gap-3 ">
        <Link className="hover:text-lime-300" to="/">
          Home
        </Link>
        <Link className="hover:text-lime-300" to="/library">
          Library
        </Link>
        <Link className="hover:text-lime-300" to="/addProject">
          Add Project
        </Link>
        <Link className="hover:text-lime-300" to="/profile">
          Profile
        </Link>
      </nav>
    </header>
  );
}

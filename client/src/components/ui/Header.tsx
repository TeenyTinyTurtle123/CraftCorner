import { Link } from "react-router-dom";

export function Header() {
  return (
    <header
      style={{ backgroundColor: "#22c55e", color: "#f0fdfa", padding: "1rem" }}
    >
      <nav>
        <Link to="/">Home</Link>
        <Link to="/library">Library</Link>
        <Link to="/addProject">Add Project</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </header>
  );
}

import { Outlet } from "react-router-dom";
import { Header } from "./ui/Header";

export function Layout() {
  return (
    <>
      <Header />
      <main style={{ padding: "1rem" }}>
        <Outlet /> {/* this is where the pages will load */}
      </main>
    </>
  );
}

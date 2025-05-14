import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
  return (
    <>
      <Header />
      {/* pt-16 - padding at the top, to match with header */}
      {/* px-4 - padding on the sides */}
      <main className="pt-28 px-4">
        <Outlet /> {/* this is where the pages will load */}
      </main>
    </>
  );
}

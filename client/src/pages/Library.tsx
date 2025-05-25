import { LibraryCard } from "@/components/LibraryCard";
import { Input } from "@/components/ui/input";
import { useUser } from "@/Context";
import { Project } from "@/types/project";
import { useEffect, useState } from "react";

export function Library() {
  const [allProject, setAllProject] = useState<Project[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "WIP" | "Finished">(
    "All"
  );
  const [sortOrder, setSortOrder] = useState<"date" | "highest" | "lowest">(
    "date"
  );

  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) return;

    fetch(
      `https://localhost:44373/Project/GetProjectsByUserId?userId=${user.id}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((json: Project[]) => setAllProject(json))
      .catch((err) => console.error("Fetch error:", err));
  }, [user?.id]);

  const wipCount = allProject.filter((p) => p.status === "WIP").length;
  const finishedCount = allProject.filter(
    (p) => p.status === "Finished"
  ).length;

  const filteredProjects = allProject
    .filter((p) => p.title.toLowerCase().includes(searchInput.toLowerCase()))
    .filter((p) => p.status !== "Deleted")
    .filter((p) => {
      if (statusFilter === "All") return true;
      return p.status === statusFilter;
    })
    .sort((a, b) => {
      if (sortOrder === "highest") return b.rating - a.rating;
      if (sortOrder === "lowest") return a.rating - b.rating;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // default date sort
    });

  function refreshProjectById(id: number) {
    fetch(`https://localhost:44373/Project/GetById?id=${id}`)
      .then((res) => res.json())
      .then((updated) => {
        setAllProject((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
      })
      .catch((err) => console.error("Failed to refresh project:", err));
  }

  function reset() {
    setStatusFilter("All");
    setSortOrder("date");
  }

  return (
    <>
      <div className="max-w-screen-lg mx-auto p-3">
        {/* Title and search function */}
        <div className="flex items-center flex-row mb-6 md:border-b md:border-teal-800">
          <h1 className="hidden md:block w-54 text-teal-300 text-3xl font-bold pr-3 pb-4 pt-4">
            My Projects
          </h1>

          <Input
            placeholder="Search title"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          ></Input>
        </div>

        {/* options and projects wrapper */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-row md:flex-col gap-3 w-46 flex-shrink-0 p-4 bg-teal-50 rounded-md shadow-sm text-sm space-y-4">
            <div className="flex flex-row md:flex-col gap-3">
              <p
                className={`font-semibold text-lg cursor-pointer ${
                  statusFilter === "All"
                    ? "text-teal-600 underline"
                    : "hover:text-teal-600"
                }`}
                onClick={() => setStatusFilter("All")}
              >
                All ({allProject.length})
              </p>
              <p
                className={`font-semibold text-lg cursor-pointer ${
                  statusFilter === "WIP"
                    ? "text-teal-600 underline"
                    : "hover:text-teal-600"
                }`}
                onClick={() => setStatusFilter("WIP")}
              >
                WIP ({wipCount})
              </p>
              <p
                className={`font-semibold text-lg cursor-pointer ${
                  statusFilter === "Finished"
                    ? "text-teal-600 underline"
                    : "hover:text-teal-600"
                }`}
                onClick={() => setStatusFilter("Finished")}
              >
                Finished ({finishedCount})
              </p>
            </div>
            <hr></hr>
            <div className="pb-3 pt-3">
              {/* Add a dropdown with the options like crochet, knit ... */}
              <p className="hover:text-teal-600 font-semibold text-lg cursor-pointer">
                Type
              </p>
            </div>
            <hr></hr>
            <div className="flex flex-row md:flex-col md:pb-3 md:pt-3 gap-3">
              <p
                className={`font-semibold text-lg cursor-pointer ${
                  sortOrder === "highest"
                    ? "text-teal-600 underline"
                    : "hover:text-teal-600"
                }`}
                onClick={() => setSortOrder("highest")}
              >
                Highest rated first
              </p>
              <p
                className={`font-semibold text-lg cursor-pointer mb-3 ${
                  sortOrder === "lowest"
                    ? "text-teal-600 underline"
                    : "hover:text-teal-600"
                }`}
                onClick={() => setSortOrder("lowest")}
              >
                Lowest rated first
              </p>
              <hr></hr>
              <p
                className="hover:text-teal-600 font-semibold text-lg cursor-pointer"
                onClick={reset}
              >
                Reset
              </p>
            </div>
          </div>

          {/* card */}
          <div className="grid gap-3">
            {filteredProjects.map((p) => (
              <LibraryCard
                key={p.id}
                project={p}
                refreshProject={() => refreshProjectById(p.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

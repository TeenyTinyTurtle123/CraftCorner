import { LibraryCard } from "@/components/LibraryCard";
import { Input } from "@/components/ui/input";
import { useUser } from "@/Context";
import { Project } from "@/types/project";
import { useEffect, useState } from "react";

export function Library() {
  const [allProject, setAllProject] = useState<Project[]>([]);
  const [searchInput, setSearchInput] = useState("");
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

  const filteredProjects = allProject.filter((p) =>
    p.title.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
  );

  return (
    <>
      <div className="max-w-screen-lg mx-auto p-4 border-2 border-teal-950">
        {/* Title and search function */}
        <div className="flex flex-row mb-3">
          <h1 className="w-30 text-teal-300 text-lg font-semibold">
            My Projects
          </h1>
          <Input
            placeholder="Search title"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          ></Input>
        </div>
        {/* options and projects wrapper */}
        <div className="flex flex-row gap-2">
          <div className="border-2 border-teal-400 text-left ">
            <p>All ({allProject.length})</p>
            <p>WIP ({wipCount})</p>
            <p>Finished ({finishedCount})</p>
            <hr></hr>
            <p>Highest rated first</p>
            <p>lowest rated first</p>
          </div>
          <div className="border-2 border-teal-950 grow">
            {/* card */}
            <div>
              {filteredProjects.map((p) => (
                <LibraryCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

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
      <div className="max-w-screen-lg mx-auto p-3">
        {/* Title and search function */}
        <div className="flex items-center flex-row mb-6 border-b border-teal-800">
          <h1 className="w-54 text-teal-300 text-3xl font-bold pr-3 pb-4 pt-4 ">
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
          <div className="w-46 flex-shrink-0 p-4 bg-teal-50 rounded-md shadow-sm text-sm space-y-4">
            <div className="">
              <p className="hover:text-teal-600 font-semibold text-lg cursor-pointer">
                All ({allProject.length})
              </p>
              <p className="hover:text-teal-600 font-semibold text-lg cursor-pointer">
                WIP ({wipCount})
              </p>
              <p className="hover:text-teal-600 font-semibold text-lg cursor-pointer">
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
            <div className="pb-3 pt-3">
              <p className="hover:text-teal-600 font-semibold text-lg cursor-pointer">
                Highest rated first
              </p>
              <p className="hover:text-teal-600 font-semibold text-lg cursor-pointer">
                lowest rated first
              </p>
            </div>
          </div>

          {/* card */}
          <div className="grid gap-3">
            {filteredProjects.map((p) => (
              <LibraryCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

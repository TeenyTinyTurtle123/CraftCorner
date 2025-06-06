import { ColorBadge } from "@/components/ColorBadge";
import { CreateProjectModal } from "@/components/CreateProjectModal";
import { ProfileWIPCard } from "@/components/ProfileWIPCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/Context";
import { Project, ProjectType } from "@/types/project";
import { BadgePlus } from "lucide-react";
import { useEffect, useState } from "react";
import DefaultProfile from "../assets/DefaultProfile.png";

export function Profile() {
  const { user } = useUser();
  const [project, setProject] = useState<Project[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);

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
      .then((json: Project[]) => setProject(json))
      .catch((err) => console.error("Fetch error:", err));
  }, [user?.id]);

  const wipCount = project.filter((p) => p.status === "WIP").length;
  const finishedCount = project.filter((p) => p.status === "Finished").length;
  const wipProjects = project.filter((p) => p.status === "WIP");

  function getMostUsedProjectType(projects: { projectType: ProjectType }[]) {
    const typeCount: Record<ProjectType, number> = {
      Other: 0,
      Crochet: 0,
      Knit: 0,
      CrossStitch: 0,
      Embroidery: 0,
    };

    projects.forEach((p) => {
      typeCount[p.projectType]++;
    });

    let mostUsed: ProjectType = "Other";
    let maxCount = 0;

    for (const type in typeCount) {
      if (typeCount[type as ProjectType] > maxCount) {
        maxCount = typeCount[type as ProjectType];
        mostUsed = type as ProjectType;
      }
    }

    return mostUsed;
  }

  function refreshProjectById(id: number) {
    fetch(`https://localhost:44373/Project/GetById?id=${id}`)
      .then((res) => res.json())
      .then((updated) => {
        setProject((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
      })
      .catch((err) => console.error("Failed to refresh project:", err));
  }

  function handleCreateSuccess() {
    setCreateModalOpen(false);
    window.location.reload();
    //TODO:Add an alert
  }

  const mostUsedType = getMostUsedProjectType(project);

  return (
    <>
      {/* profile picture and information */}
      <div className="max-w-screen-lg mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center bg-teal-50 rounded-md mb-3 p-4 gap-4">
          <img
            className="w-50 h-50 rounded-full border-2 object-cover"
            src={DefaultProfile}
          />

          <div className="flex-1 ml-4 md:self-start">
            <p className="border-b text-left font-semibold text-xl max-w-80">
              {user?.username}
            </p>
            <p className="text-left pt-2">
              Most used tag: <ColorBadge children={mostUsedType} />
            </p>
          </div>

          <div className="md:mr-10">
            <Button
              className="bg-teal-600 text-lg font-semibold hover:bg-teal-400"
              onClick={() => setCreateModalOpen(true)}
            >
              Create new <BadgePlus className="!size-5" />
            </Button>
            <CreateProjectModal
              open={createModalOpen}
              onClose={() => setCreateModalOpen(false)}
              onSuccess={handleCreateSuccess}
            />
          </div>
        </div>

        {/* Display WIP and Finished projects */}
        <div className="mb-3 border-b text-left pb-4">
          <p className="font-semibold pb-2">
            {user?.username.toLocaleUpperCase()}'S LIBRARY
          </p>
          <Badge className="bg-indigo-400 text-white text-base rounded-full mr-2">
            WIP ({wipCount})
          </Badge>
          <Badge className="bg-teal-600 text-white text-base rounded-full mr-2">
            FINISHED ({finishedCount})
          </Badge>
          {/* Add this to user table */}
          <Badge className="bg-sky-600 text-white text-base rounded-full">
            FLOSS (56)
          </Badge>
        </div>

        {/* Display inprogress work */}
        <div>
          <div className="mb-3 border-b text-left">
            <p className="font-semibold pb-2">
              {user?.username.toLocaleUpperCase()} IS CURRENTLY WORKING ON
            </p>
          </div>
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2">
            {wipProjects.map((p) => (
              <ProfileWIPCard
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

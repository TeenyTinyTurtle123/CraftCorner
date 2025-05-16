import { ProfileWIPCard } from "@/components/ProfileWIPCard";
import DefaultProfile from "../assets/DefaultProfile.png";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/Context";

type Status = "WIP" | "Finished" | "Deleted";

type Project = {
  id: number;
  title: string;
  type: string;
  rating: number;
  status: Status;
  imageURL: string;
};

export function Profile() {
  const [project, setProject] = useState<Project[]>([]);
  const { user } = useUser();

  useEffect(() => {
    // Get all projects in the database
    fetch("https://localhost:44373/Project/GetAll")
      .then((res) => res.json())
      .then((json: Project[]) => setProject(json));
  }, []);

  const wipCount = project.filter((p) => p.status === "WIP").length;
  const finishedCount = project.filter((p) => p.status === "Finished").length;

  return (
    <>
      <h1>Profile page</h1>
      {/* profile picture and information */}
      <div className="max-w-screen-lg mx-auto p-4">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1rem",
            border: "1px red solid",
          }}
        >
          <img
            style={{
              width: "8rem",
              height: "8rem",
              borderRadius: "50%",
              objectFit: "cover",
              margin: "1rem",
              border: "1px blue solid",
            }}
            src={DefaultProfile}
          />
          <div>
            <p>
              <strong>Name: {user?.username}</strong>
            </p>
            <p>
              <strong>Country:</strong> Norway
            </p>
          </div>
        </div>
        <div>
          <Button>WIP ({wipCount})</Button>
          <Button>Finished ({finishedCount})</Button>
          {/* Add this to user table */}
          <Button>FLoss (56)</Button>
        </div>
        {/* Display inprogress work */}
        <div className="grid grid-cols-2 gap-2">
          {project.map((p) => (
            <ProfileWIPCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </>
  );
}

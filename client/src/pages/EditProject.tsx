import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Status = "WIP" | "Finished" | "Deleted";

type Project = {
  id: number;
  title: string;
  type: string;
  rating: number;
  status: Status;
};

export function EditProject() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    // Get the project based on id
    fetch(`https://localhost:44373/Test/GetProjectById?projectId=${id}`)
      .then((res) => res.json())
      .then((json: Project) => setProject(json))
      .catch((err) => console.error("fetch error:", err));
  }, [id]);

  return (
    <>
      <h1>Edit Project</h1>
      {id}
      {project ? (
        <div>
          <p>Title: {project.title}</p>
          <p>Type: {project.type}</p>
          <p>Status: {project.status}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

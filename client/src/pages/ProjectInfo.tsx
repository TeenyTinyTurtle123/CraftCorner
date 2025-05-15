import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Project = {
  id: number;
  title: string;
  type: string;
  rating: number;
};

export function ProjectInfo() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  // https://localhost:44373 = the 's' in https is important!!
  useEffect(() => {
    if (!id) return;

    fetch(`https://localhost:44373/Project/GetById?id=${id}`)
      .then((res) => res.json())
      .then((json: Project) => setProject(json))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);
  //[] this is a dependency array, it will run when the component first mounts and again whenever the value inside it changes
  // this ensures the fetch only runs once per new project id
  return (
    <>
      <h1>Project Page</h1>
      {project && (
        <div>
          <p>
            Id: {project.id} || Title: {project.title} || Type: {project.type}{" "}
            || Rating: {project.rating}
          </p>
        </div>
      )}
    </>
  );
}

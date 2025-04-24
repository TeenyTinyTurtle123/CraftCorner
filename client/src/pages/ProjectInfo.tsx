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

  useEffect(() => {
    fetch(`http://localhost:5277/Test/GetById?id=${id}`)
      .then((res) => res.json())
      .then((json: Project) => setProject(json));
    // .then((json) => console.log(json));
  });

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

import { useEffect, useState } from "react";

type Project = {
  id: number;
  title: string;
  type: string;
  rating: number;
};

export function Library() {
  const [project, setProject] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:5277/Test/GetProjects");
        const json = await res.json();
        setProject(json);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <h1>Library page</h1>
      {project.map((p) => (
        <div key={p.id}>
          <p>
            Id: {p.id} || Title: {p.title} || Type: {p.type} || Rating:{" "}
            {p.rating}
          </p>
        </div>
      ))}
    </>
  );
}

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
        const res = await fetch("https://localhost:44373/Test/GetAll");
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
      <h1>Library: Connection to database</h1>
      {project.map((p) => (
        <div key={p.id}>
          <p>
            Id: {p.id} || Title: {p.title} || Type: {p.type} || {p.rating}
          </p>
        </div>
      ))}
    </>
  );
}

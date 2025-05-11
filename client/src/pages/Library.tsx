import { useEffect, useState } from "react";

type Status = "WIP" | "Finished" | "Deleted";

type Project = {
  id: number;
  title: string;
  type: string;
  rating: number;
  status: Status;
};

export function Library() {
  const [project, setProject] = useState<Project[]>([]);
  const [projectStatus, setProjectStatus] = useState<Project[]>([]);

  useEffect(() => {
    fetch("https://localhost:44373/Test/GetAll")
      .then((res) => res.json())
      .then((json: Project[]) => setProject(json));

    fetch("https://localhost:44373/Test/GetAllWIP")
      .then((res) => res.json())
      .then((json: Project[]) => setProjectStatus(json));
  }, []);

  function fetchProjectByStatus(status: number) {
    fetch(`https://localhost:44373/Test/GetProjectsByStatus?status=${status}`)
      .then((res) => res.json())
      .then((json: Project[]) => setProjectStatus(json))
      .catch((err) => console.error("fetch error:", err));
  }

  return (
    <>
      <h1>Library: Connection to database</h1>
      {project.map((p) => (
        <div key={p.id}>
          <p>
            Id: {p.id} || Title: {p.title} || Type: {p.type} || Rating:
            {p.rating} || Status: {p.status}
          </p>
        </div>
      ))}
      <button
        style={{ padding: "1rem" }}
        onClick={() => fetchProjectByStatus(0)}
      >
        WIP
      </button>
      <button
        style={{ padding: "1rem" }}
        onClick={() => fetchProjectByStatus(1)}
      >
        Finished
      </button>
      <div>
        <p>WIP:</p>
        {projectStatus.map((p) => (
          <div>
            <p>{p.title}</p>
          </div>
        ))}
        <p>Finished: </p>
      </div>
    </>
  );
}

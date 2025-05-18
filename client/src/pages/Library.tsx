import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Library() {
  const [project, setProject] = useState<Project[]>([]);
  const [projectStatus, setProjectStatus] = useState<Project[]>([]);
  const [statusLabel, setStatusLabel] = useState("WIP");
  const [projectType, setProjectType] = useState<Project[]>([]);

  useEffect(() => {
    // Get all projects in the database
    fetch("https://localhost:44373/Project/GetAll")
      .then((res) => res.json())
      .then((json: Project[]) => setProject(json));
  }, []);

  // Get all projects based on their status
  function fetchProjectByStatus(status: number) {
    fetch(
      `https://localhost:44373/Project/GetProjectsByStatus?status=${status}`
    )
      .then((res) => res.json())
      .then((json: Project[]) => setProjectStatus(json))
      .catch((err) => console.error("fetch error:", err));
  }

  // Get all projects based on their type
  function fetchProjectByType(type: string) {
    fetch(`https://localhost:44373/Project/GetProjectsByType?type=${type}`)
      .then((res) => res.json())
      .then((json: Project[]) => setProjectType(json))
      .catch((err) => console.error("fetch error:", err));
  }

  return (
    <>
      <h1>Library: Connection to database</h1>
      <div style={{ border: "1px green solid", padding: "0.5rem" }}>
        {project.map((p) => (
          <div key={p.id}>
            <p>
              Id: {p.id} || Title: {p.title} || Type: {p.type} || Rating:
              {p.rating} || Status: {p.status} || {p.createdAt.slice(0, 10)}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          border: "1px purple solid",
          padding: "0.5rem",
          marginTop: "0.5rem",
        }}
      >
        <button
          style={{ padding: "1rem" }}
          onClick={() => {
            setStatusLabel("WIP");
            fetchProjectByStatus(0);
          }}
        >
          WIP
        </button>
        <button
          style={{ padding: "1rem" }}
          onClick={() => {
            setStatusLabel("Finished");
            fetchProjectByStatus(1);
          }}
        >
          Finished
        </button>
        <div>
          {statusLabel}
          {projectStatus.map((p) => (
            <div>
              <p>{p.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ border: "1px yellow solid", padding: "0.5rem" }}>
        <h4>Sort by:</h4>
        <button
          style={{ padding: "1rem" }}
          onClick={() => {
            fetchProjectByType("Crochet");
          }}
        >
          Crochet
        </button>
        <button
          style={{ padding: "1rem" }}
          onClick={() => {
            fetchProjectByType("Knit");
          }}
        >
          Knit
        </button>
        <button
          style={{ padding: "1rem" }}
          onClick={() => {
            fetchProjectByType("CrossStitch");
          }}
        >
          Cross Stitch
        </button>
        {projectType.map((p) => (
          <div>
            <p>
              {p.title} -- {p.type}
            </p>
          </div>
        ))}
      </div>
      <div style={{ border: "1px pink solid", padding: "0.5rem" }}>
        <h4>Edit project</h4>
        {project.map((p) => (
          <div
            key={p.id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <p> {p.id}</p>
            <Link
              to={`/editProject/${p.id}`}
              style={{ color: "red", textDecoration: "none" }}
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
      <Button>Click me</Button>
    </>
  );
}

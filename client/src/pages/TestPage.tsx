import { ColorBadge } from "@/components/ColorBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@/Context";
import { Project } from "@/types/project";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Users = {
  id: number;
  username: string;
  password: string;
};

export function TestPage() {
  const [users, setUsers] = useState<Users[]>([]);

  const [project, setProject] = useState<Project[]>([]);
  const [projectStatus, setProjectStatus] = useState<Project[]>([]);
  const [statusLabel, setStatusLabel] = useState("WIP");
  const [projectType, setProjectType] = useState<Project[]>([]);
  const [position, setPosition] = useState("bottom");

  // just for testing
  const { user } = useUser();

  useEffect(() => {
    fetch("https://localhost:44373/User/GetAll")
      .then((res) => res.json())
      .then((json: Users[]) => setUsers(json));
  }, []);

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
      <h1>Test Page</h1>
      <ColorBadge children="Other" />
      <ColorBadge children="Crochet" />
      <ColorBadge children="Knit" />
      <ColorBadge children="CrossStitch" />
      <ColorBadge children="Embroidery" />
      <ColorBadge children="WIP" />
      <ColorBadge children="Finished" />
      <ColorBadge children="Deleted" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div>
        <h3>
          The logged in user Id: {user?.id} Username: {user?.username}
        </h3>
      </div>

      {/* All users in the system */}
      {users.map((p) => (
        <div key={p.id}>
          <p>{p.id}</p>
          <p>{p.username}</p>
        </div>
      ))}

      <h1>Library: Connection to database</h1>
      <div style={{ border: "1px green solid", padding: "0.5rem" }}>
        {project.map((p) => (
          <div key={p.id}>
            <p>
              Id: {p.id} || Title: {p.title} || Type: {p.projectType} || Rating:
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
              {p.title} -- {p.projectType}
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
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  defaultValue="100%"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxWidth">Max. width</Label>
                <Input
                  id="maxWidth"
                  defaultValue="300px"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  defaultValue="25px"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxHeight">Max. height</Label>
                <Input
                  id="maxHeight"
                  defaultValue="none"
                  className="col-span-2 h-8"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

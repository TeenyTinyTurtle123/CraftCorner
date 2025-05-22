import { Project } from "@/types/project";
import { useState } from "react";
import { ColorBadge } from "./ColorBadge";
import { EditProjectModal } from "./EditProjectModal";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type ProfileWIPCardProps = {
  project: Project;
  refreshProject: () => void;
};

export function ProfileWIPCard({
  project,
  refreshProject,
}: ProfileWIPCardProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);

  function handleEditSuccess() {
    setEditModalOpen(false);
    refreshProject();
  }
  return (
    <>
      <Card
        key={project.id}
        className="flex flex-col bg-teal-50 hover:bg-teal-50"
      >
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row flex-wrap">
          <img
            //TODO: must be a cleaner way to get the picture
            src={`https://localhost:44373/images/${project.imageURL}`}
            className="w-30 h-44 object-cover rounded border-2 border-teal-600"
          />
          <div className="ml-5 content-end">
            <ColorBadge>{project.status}</ColorBadge>
            <ColorBadge>{project.projectType}</ColorBadge>
          </div>
          <div className="ml-auto content-end">
            <Button variant="outline" onClick={() => setEditModalOpen(true)}>
              Edit
            </Button>
            <EditProjectModal
              open={editModalOpen}
              project={project}
              onClose={() => setEditModalOpen(false)}
              onSuccess={handleEditSuccess}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

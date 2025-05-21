import { Project } from "@/types/project";
import { ArrowBigDownDash, Star } from "lucide-react";
import { useState } from "react";
import { ColorBadge } from "./ColorBadge";
import { EditProjectModal } from "./EditProjectModal";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type LibraryCardProps = {
  project: Project;
};

export function LibraryCard({ project }: LibraryCardProps) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        key={project.id}
        className="flex flex-col p-4 hover:bg-teal-50 shadow-md rounded-xl transition duration-300"
      >
        <CardHeader className="p-0">
          <CardTitle className="text-left text-xl font-semibold">
            {project.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-row gap-4">
          {/* Image */}
          <div className="relative flex-shrink-0 min-w-[7rem]">
            <img
              src={`https://localhost:44373/images/${project.imageURL}`}
              className="w-28 h-40 object-cover rounded-lg border-2 border-teal-600 cursor-pointer"
              onClick={() => setShowImageModal(true)}
              alt={project.title}
            />
            {/* Optional modal for image */}
            {showImageModal && (
              <div
                className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
                onClick={() => setShowImageModal(false)}
              >
                <img
                  src={`https://localhost:44373/images/${project.imageURL}`}
                  className="max-w-sm max-h-[90vh] rounded-lg shadow-xl"
                  alt="Enlarged"
                />
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-between flex-1 max-w-60">
            <div className="flex justify-between">
              {project.patternURL ? (
                <a
                  href={`https://localhost:44373/patterns/${project.patternURL}`}
                  download
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="mb-2 border-2S hover:border-teal-600"
                  >
                    <ArrowBigDownDash /> Show Pattern
                  </Button>
                </a>
              ) : (
                <div className="text-gray-400 italic mb-2">
                  No pattern uploaded
                </div>
              )}
            </div>
            <div>
              {/* Type && Status */}
              <div className="flex flex-wrap gap-2 mb-2">
                <ColorBadge children={project.projectType} />
                <ColorBadge children={project.status} />
              </div>

              <div className="flex text-yellow-400 mb-1">
                <p>Rating: </p>
                {Array.from({ length: project.rating }, (_, i) => (
                  <span key={i}>
                    <Star />
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-2 text-xs text-gray-600">
                <Badge variant="outline">
                  Start: {project.createdAt.slice(0, 10)}
                </Badge>
                <Badge variant="outline">
                  End:{" "}
                  {project.finishedAt ? (
                    project.finishedAt.slice(0, 10)
                  ) : (
                    <span className="text-gray-400 italic">TBD</span>
                  )}
                </Badge>
              </div>
            </div>
          </div>
          <div>
            {project.notes && (
              <p className="text-sm text-gray-700 italic">"{project.notes}"</p>
            )}
          </div>

          {/* Edit/Delete Actions */}
          <div className="flex flex-col justify-end gap-2 ml-auto">
            <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
              Edit
            </Button>
            <EditProjectModal
              project={project}
              open={isOpen}
              onClose={() => setIsOpen(false)}
            />
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

import { Project } from "@/types/project";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

type LibraryCardProps = {
  project: Project;
};

export function LibraryCard({ project }: LibraryCardProps) {
  return (
    <>
      <Card key={project.id} className="flex flex-col  hover:bg-teal-50">
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row flex-wrap">
          <img
            //TODO: must be a cleaner way to get the picture
            src={`https://localhost:44373/images/${project.imageURL}`}
            className="w-30 h-44 object-cover rounded border-2 border-teal-600"
          />
          <Badge>{project.type}</Badge>
          <div>pattern</div>
          <div>Notes:</div>
          <div>
            <p>edit</p>
            <p>delete</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

// click card to get bigger picture
// if more than one picture, button to show more pictures
// warning if delete - popup

// carousel,

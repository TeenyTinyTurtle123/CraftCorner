import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Status = "WIP" | "Finished" | "Deleted";

type Project = {
  id: number;
  title: string;
  type: string;
  rating: number;
  status: Status;
  imageURL: string;
};

type ProfileWIPCardProps = {
  project: Project;
};

export function ProfileWIPCard({ project }: ProfileWIPCardProps) {
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
          <div className=" ml-5 content-end">
            <Badge>{project.status}</Badge>
            <Badge>{project.type}</Badge>
            <Button>Edit</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

{
  /* <div className="flex flex-col justify-end ml-2 flex-grow">
  <div className="flex flex-col gap-2">
    <Badge>{project.status}</Badge>
    <Badge>{project.type}</Badge>
    <Button>Edit</Button>
  </div>
</div>; */
}

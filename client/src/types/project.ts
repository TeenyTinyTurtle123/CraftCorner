export type Status = "WIP" | "Finished" | "Deleted";
export type ProjectType =
  | "Other"
  | "Crochet"
  | "Knit"
  | "CrossStitch"
  | "Embroidery";

export type Project = {
  id: number;
  userId: number;
  title: string;
  projectType: ProjectType;
  rating: number;
  status: Status;
  notes: string;
  createdAt: string;
  finishedAt: string;
  patternURL: string;
  imageURL: string;
};

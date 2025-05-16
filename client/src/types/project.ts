export type Status = "WIP" | "Finished" | "Deleted";

export type Project = {
  id: number;
  userId: number;
  title: string;
  type: string;
  rating: number;
  status: Status;
  createdAt: string;
  imageURL: string;
};

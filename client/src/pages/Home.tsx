import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

type MockProject = {
  id: number;
  title: string;
  type: string;
  rating: number;
};

type Users = {
  id: number;
  username: string;
  password: string;
};

export function Home() {
  const [count, setCount] = useState(0);
  const [proj, setProj] = useState<MockProject[]>([]);
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    fetch("https://localhost:44373/Project/GetProjects")
      .then((res) => res.json())
      .then((json: MockProject[]) => setProj(json));
  }, []);

  useEffect(() => {
    fetch("https://localhost:44373/User/GetAll")
      .then((res) => res.json())
      .then((json: Users[]) => setUsers(json));
  }, []);

  return (
    <>
      <h1>Home Page 🐛</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {proj.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <CardTitle>{p.title}</CardTitle>
              <CardDescription>Id: {p.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is just some text to show that you can ad a p-tag, div or
                even a button between the card components
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <button>Button</button>
                {p.type}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {users.map((p) => (
        <div>
          <p>{p.id}</p>
          <p>{p.username}</p>
          <p>{p.password}</p>
        </div>
      ))}
      {/* {proj.map((p) => (
        <div>
          <p>Id: {p.id}</p>
          <p>Title: {p.title}</p>
          <p>Type: {p.type}</p>
          <p>Rating: {p.rating}</p>
          <br />
        </div>
      ))} */}
    </>
  );
}

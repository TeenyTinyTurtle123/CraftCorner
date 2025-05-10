import { useEffect, useState } from "react";

type MockProject = {
  id: number;
  title: string;
  type: string;
  rating: number;
};

export function Home() {
  const [count, setCount] = useState(0);
  const [proj, setProj] = useState<MockProject[]>([]);

  useEffect(() => {
    fetch("https://localhost:44373/Test/GetProjects")
      .then((res) => res.json())
      .then((json: MockProject[]) => setProj(json));
  }, []);

  return (
    <>
      <h1>Home Page 🐛</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {proj.map((p) => (
        <div>
          <p>Id: {p.id}</p>
          <p>Title: {p.title}</p>
          <p>Type: {p.type}</p>
          <p>Rating: {p.rating}</p>
          <br />
        </div>
      ))}
    </>
  );
}

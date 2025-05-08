import { useState } from "react";

type Project = {
  title: string;
  type: string;
  rating: number;
};

export function AddProject() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState(0);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const project: Project = { title, type, rating };

    fetch("https://localhost:44373/Test/AddProject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add project");
        return res.json();
      })
      .then((data) => console.log("Project added:", data))
      .catch((err) => console.error("POST error:", err));

    setTitle("");
    setType("");
    setRating(0);
  }

  return (
    <>
      <h1>Add Project</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <label>Project Name:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Crochet">Crochet</option>
              <option value="Knit">Knit</option>
              <option value="CrossStitch">Cross stitch</option>
            </select>
          </div>
          <div>
            <label>Rating:</label>
            <input
              type="number"
              min={1}
              max={5}
              required
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            ></input>
          </div>
          <button>Add Project</button>
        </div>
      </form>
    </>
  );
}

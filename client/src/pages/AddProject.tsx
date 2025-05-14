import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

// type Project = {
//   title: string;
//   type: string;
//   rating: number;
//   image: File | null;
// };

export function AddProject() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("type", type);
    formdata.append("rating", rating.toString());

    if (image) {
      formdata.append("image", image);
    } else {
      // backend must resolve this
      formdata.append("imageName", "DefaultProjectImage.jpg");
    }

    // const project: Project = { title, type, rating, image };

    fetch("https://localhost:44373/Test/AddProject", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: formdata,
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
    setImage(null);
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
          <div>
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*" // this is for restricting it to images. Could be good to know
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const file = e.target.files[0];
                  setImage(file);
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
            />
          </div>
          {imagePreview && (
            <div className="mt-3">
              <p>Image Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-80 h-auto border-2 border-indigo-600"
              />
            </div>
          )}
          <Button type="submit">Add Project</Button>
        </div>
      </form>
    </>
  );
}

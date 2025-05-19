import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useUser } from "@/Context";

export function AddProject() {
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [userId] = useState(user?.id);
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [pattern, setPattern] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!userId) {
      console.error("User not logged in.");
      return;
    }

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("type", type);
    formdata.append("status", status);
    formdata.append("notes", notes);
    formdata.append("rating", rating.toString());
    formdata.append("userId", userId.toString());

    if (image) {
      formdata.append("image", image);
    } else {
      // backend must resolve this
      formdata.append("imageName", "DefaultProjectImage.jpg");
    }
    if (pattern) {
      formdata.append("pattern", pattern);
    } else {
      // backend must resolve this
      formdata.append("pattern", "");
    }

    // const project: Project = { title, type, rating, image };

    console.log(formdata);

    fetch("https://localhost:44373/Project/AddProject", {
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
    setStatus("");
    setNotes("===Done===");
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
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="" disabled></option>
              <option value="Other">Other</option>
              <option value="Crochet">Crochet</option>
              <option value="Knit">Knit</option>
              <option value="CrossStitch">CrossStitch</option>
              <option value="Embroidery">Embroidery</option>
            </select>
          </div>
          <div>
            <label>Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="" disabled></option>
              <option value="WIP">WIP</option>
              <option value="Finished">Finished</option>
            </select>
          </div>
          <div>
            <label>Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></input>
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
          <div>
            <Label htmlFor="image">Pattern</Label>
            <Input
              id="pattern"
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const file = e.target.files[0];
                  setPattern(file);
                  // setImagePreview(URL.createObjectURL(file));
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

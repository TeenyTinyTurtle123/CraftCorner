import { Project, ProjectType, Status } from "@/types/project";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type EditProjectModalProps = {
  project: Project;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function EditProjectModal({
  open,
  project,
  onClose,
  onSuccess,
}: EditProjectModalProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(
    project.createdAt ? new Date(project.createdAt) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    project.finishedAt ? new Date(project.finishedAt) : undefined
  );

  const [id] = useState(project.id);
  const [title, setTitle] = useState(project.title);
  const [type, setType] = useState<ProjectType>(project.projectType);
  const [status, setStatus] = useState(project.status);
  const [notes, setNotes] = useState(project.notes);
  const [rating, setRating] = useState(project.rating);

  const [pattern, setPattern] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function getLocalDateString(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`; // "2025-05-21"
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fixedEndDate = endDate ? getLocalDateString(endDate) : null;
    const fixedStartDate = getLocalDateString(startDate!);

    const formdata = new FormData();
    formdata.append("id", id.toString());
    formdata.append("title", title);
    formdata.append("type", type);
    formdata.append("status", status);
    formdata.append("notes", notes);
    formdata.append("rating", rating.toString());

    if (fixedStartDate) {
      formdata.append("createdAt", fixedStartDate);
    }
    if (fixedEndDate) {
      formdata.append("finishedAt", fixedEndDate);
    }
    if (image) {
      formdata.append("image", image);
    } else {
      formdata.append("image", "");
    }
    if (pattern) {
      formdata.append("pattern", pattern);
    } else {
      formdata.append("pattern", "");
    }

    console.log(formdata);

    fetch("https://localhost:44373/Project/EditProject", {
      method: "POST",
      body: formdata,
    })
      .then(async (res) => {
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Failed to Update project: ${res.status} ${errText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Project Updated:", data);
        onSuccess(); // Notify parent
      })

      .catch((err) => console.error("POST error:", err));
  }

  if (!open) return null;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="fixed inset-0 bg-stone-700/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-5xl">
            <div className="flex">
              <div className="flex flex-col border-2 border-sky-400">
                <div className="mt-3">
                  <img
                    src={
                      imagePreview
                        ? imagePreview
                        : `https://localhost:44373/images/${project.imageURL}`
                    }
                    alt="Project"
                    className="w-28 h-40 object-cover rounded-lg border-2 border-teal-600 cursor-pointer"
                  />
                </div>
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
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                >
                  Reset Image
                </Button>
                {project.patternURL ? (
                  <div>
                    <a
                      href={`https://localhost:44373/patterns/${project.patternURL}`}
                      download
                    >
                      <Button type="button" size="sm" className="mb-2">
                        ⬇️ Download Pattern
                      </Button>
                    </a>
                    <div>
                      <Label htmlFor="image">Change pattern</Label>
                      <Input
                        id="pattern"
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const file = e.target.files[0];
                            setPattern(file);
                          }
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="image">Pattern</Label>
                    <Input
                      id="pattern"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const file = e.target.files[0];
                          setPattern(file);
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="border-2 border-sky-800">
                <div className="flex flex-row">
                  <Label>Title</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Input>
                </div>
                <div>
                  <Label>Title</Label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as ProjectType)}
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
                  <Label>Status:</Label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Status)}
                    required
                  >
                    <option value="" disabled></option>
                    <option value="WIP">WIP</option>
                    <option value="Finished">Finished</option>
                  </select>
                </div>
                <div>
                  <Label>Rating</Label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    required
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  ></Input>
                </div>
              </div>
              <div className="border-2 border-sky-300">
                <label>Notes</label>
                <Input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></Input>
              </div>
            </div>
            {/* TODO: create a popover component?*/}
            {/* TODO: Remove the old picture*/}
            <div className="flex flex-row border-2 border-green-400">
              <div className="">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      {startDate
                        ? startDate.toLocaleDateString("sv-SE")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
                <Button type="button" onClick={() => setStartDate(new Date())}>
                  Set to today
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      {endDate
                        ? endDate.toLocaleDateString("sv-SE")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
                <Button type="button" onClick={() => setEndDate(new Date())}>
                  Set to today
                </Button>
              </div>
              <div className="mt-4 text-right ml-auto">
                <Button type="button" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </>
  );
}

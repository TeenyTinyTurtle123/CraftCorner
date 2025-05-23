import { Project, ProjectType, Status } from "@/types/project";
import { Label } from "@radix-ui/react-label";
import { ArrowBigDownDash, Star } from "lucide-react";
import React, { useState } from "react";
import { ColorBadge } from "./ColorBadge";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";

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
            <div className="flex flex-row mb-3">
              <div className="flex flex-col mr-3">
                <div className="mt-3 flex flex-col items-center justify-center pb-3">
                  <Label className="font-semibold text-lg">Add Picture</Label>
                  <img
                    src={
                      imagePreview
                        ? imagePreview
                        : `https://localhost:44373/images/${project.imageURL}`
                    }
                    alt="Project"
                    className="w-42 h-54 object-cover rounded-lg border-3 border-teal-600"
                  />
                </div>
                <Input
                  id="image"
                  type="file"
                  accept="image/*" // this is for restricting it to images. Could be good to know
                  className="hover:bg-teal-100 cursor-pointer"
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
                  className="mt-2 mb-2 hover:bg-teal-100 cursor-pointer "
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="mb-2 border-2S hover:border-teal-600"
                      >
                        <ArrowBigDownDash /> Show Pattern
                      </Button>
                    </a>
                    <div>
                      <Label className="font-semibold text-lg">
                        Add/Change pattern
                      </Label>
                      <Input
                        id="pattern"
                        type="file"
                        className=" hover:bg-teal-100 cursor-pointer"
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
                {/* TODO: see if this works */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2 mb-2 hover:bg-teal-100 cursor-pointer "
                  onClick={() => {
                    setPattern(null);
                  }}
                >
                  Remove Pattern
                </Button>
              </div>

              <div className="mr-3">
                <div className="flex items-center space-x-2 my-2">
                  <Label>Title</Label>
                  <Input
                    value={title}
                    className="w-64"
                    onChange={(e) => setTitle(e.target.value)}
                  ></Input>
                </div>
                {/* TODO: create a Dropdown component?*/}
                <div className="flex items-center space-x-2 my-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        variant="outline"
                        className="border-2S hover:border-teal-600"
                      >
                        Choose type
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuRadioGroup
                        value={type}
                        onValueChange={(e) => setType(e as ProjectType)}
                      >
                        <DropdownMenuRadioItem value="Other">
                          Other
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Crochet">
                          Crochet
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Knit">
                          Knit
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="CrossStitch">
                          CrossStitch
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Embroidery">
                          Embroidery
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <ColorBadge children={type} />
                </div>
                <div className="flex items-center space-x-2 my-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        variant="outline"
                        className="border-2S hover:border-teal-600"
                      >
                        Choose state
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuRadioGroup
                        value={status}
                        onValueChange={(e) => setStatus(e as Status)}
                      >
                        <DropdownMenuRadioItem value="WIP">
                          WIP
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Finished">
                          Finished
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Deleted">
                          Deleted
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <ColorBadge children={status} />
                </div>
                <div className="flex items-center space-x-2 my-2">
                  <Label>Rating</Label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    required
                    className="w-15"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  ></Input>
                  {Array.from({ length: rating }, (_, i) => (
                    <span key={i} className="text-yellow-400">
                      <Star />
                    </span>
                  ))}
                </div>
              </div>
              <div className=" flex-grow">
                <label>Notes</label>
                <Textarea
                  value={notes}
                  rows={7}
                  onChange={(e) => setNotes(e.target.value)}
                ></Textarea>
              </div>
            </div>
            {/* TODO: create a popover component?*/}
            {/* TODO: Remove the old picture*/}
            <div className="flex flex-row items-center p-1">
              <div className="flex gap-4 items-center justify-around flex-grow">
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="hover:border-teal-400 cursor-pointer w-35"
                      >
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
                  <Button
                    className="bg-teal-400 font-semibold hover:bg-teal-800"
                    type="button"
                    onClick={() => setStartDate(new Date())}
                  >
                    Set to today
                  </Button>
                </div>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="hover:border-teal-400 cursor-pointer w-35"
                      >
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
                  <Button
                    className="bg-teal-400 font-semibold hover:bg-teal-800"
                    type="button"
                    onClick={() => setEndDate(new Date())}
                  >
                    Set to today
                  </Button>
                </div>
              </div>
              <div className="ml-auto">
                <Button
                  type="button"
                  variant="outline"
                  className="font-semibold hover:border-teal-400"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              className="bg-teal-400 font-semibold w-50 hover:bg-teal-800"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

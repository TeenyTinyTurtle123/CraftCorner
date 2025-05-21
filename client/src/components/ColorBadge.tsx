import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";

type ColorBadgeProp = {
  children: string;
};

export function ColorBadge({ children }: ColorBadgeProp) {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    if (children === "Other") {
      setBgColor("bg-orange-400");
    } else if (children === "Crochet") {
      setBgColor("bg-yellow-400");
    } else if (children === "Knit") {
      setBgColor("bg-green-700");
    } else if (children === "CrossStitch") {
      setBgColor("bg-purple-600");
    } else if (children === "Embroidery") {
      setBgColor("bg-pink-400");
    } else if (children === "WIP") {
      setBgColor("bg-indigo-400");
    } else if (children === "Finished") {
      setBgColor("bg-teal-600");
    } else if (children === "Deleted") {
      setBgColor("bg-red-600");
    } else {
      setBgColor("bg-gray-600");
    }
  }, [children]);

  return (
    <Badge className={`${bgColor} text-white text-sm rounded-full`}>
      {children}
    </Badge>
  );
}

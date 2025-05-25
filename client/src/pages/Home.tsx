import { SmallHomeCard } from "@/components/SmallHomeCard";
import { Label } from "@/components/ui/label";
import { useUser } from "@/Context";
import banner from "../assets/banner.jpg";
import Store from "../assets/store.jpg";
import Wip from "../assets/Wip.jpg";
import Work from "../assets/Work.jpg";

export function Home() {
  // just for testing
  const { user } = useUser();

  console.log("Is logged in: " + user?.username);

  return (
    <>
      <div className="max-w-screen-lg mx-auto pt-2">
        <div className="flex flex-col items-center ">
          <div className="relative w-full max-w-5xl">
            <img
              src={banner}
              className="w-full h-95 object-cover rounded-lg border-4 border-teal-600"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 px-8 py-2 rounded shadow ">
              <Label className="text-2xl font-bold text-teal-800">
                Welcome to CraftCorner!
              </Label>
            </div>
          </div>
          {/* TODO: REMEMBER THIS GRID LAYOUT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            <SmallHomeCard image={Work} text="Work your projects" />
            <SmallHomeCard image={Wip} text="Keep track of your WIP" />
            <SmallHomeCard image={Store} text="Store your results" />
          </div>
        </div>
      </div>
    </>
  );
}

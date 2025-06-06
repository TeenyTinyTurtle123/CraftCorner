import { useUser } from "@/Context";
import DefaultProfile from "../assets/DefaultProfile.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function ProfileAvatar() {
  const { user } = useUser();
  return (
    <>
      <Avatar className="w-16 h-16 rounded-full object-cover border-2 hover:border-teal-500 cursor-pointer">
        <AvatarImage src={DefaultProfile} alt="profile" />
        {/* project.title.slice(0, 2) gives us the first two characters in*/}
        <AvatarFallback>{user?.username.slice(0, 2)}</AvatarFallback>
      </Avatar>
    </>
  );
}

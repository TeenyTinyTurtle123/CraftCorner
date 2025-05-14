import DefaultProfile from "../assets/DefaultProfile.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function ProfileAvatar() {
  return (
    <>
      <Avatar className=" w-16 h-16 rounded-full ">
        <AvatarImage src={DefaultProfile} alt="profile" />
        {/* project.title.slice(0, 2) gives us the first two characters in*/}
        <AvatarFallback>SG</AvatarFallback>
      </Avatar>
    </>
  );
}

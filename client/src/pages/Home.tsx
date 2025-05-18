import { useUser } from "@/Context";

export function Home() {
  // just for testing
  const { user } = useUser();

  console.log("Is logged in: " + user?.username);

  return (
    <>
      <h1>Home Page 🐛 {user?.username}</h1>
    </>
  );
}

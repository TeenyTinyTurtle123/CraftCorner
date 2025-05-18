import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/Context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("https://localhost:44373/User/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/");
    } else {
      alert("Invalid login");
    }
  };

  return (
    <>
      <div className="max-w-screen-lg mx-auto p-4">
        <h1>Log in page</h1>
        <div>
          <Label>Username</Label>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
        </div>
        <div>
          <Label>Password</Label>
          <Input
            placeholder="Username"
            type="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </div>
        <div>
          <Button onClick={handleLogin}>Log in</Button>
        </div>
      </div>
    </>
  );
}

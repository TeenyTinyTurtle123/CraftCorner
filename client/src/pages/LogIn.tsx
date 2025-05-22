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

  const navigateToRegister = async () => {
    navigate("/register");
  };

  return (
    <div className="pt-35 flex items-center justify-center bg-teal-50">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-teal-700 mb-6">
          Log in
        </h1>

        <div className="mb-4">
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </Label>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div className="mb-6">
          <Label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </Label>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <Button
          onClick={handleLogin}
          className="w-full bg-teal-600 text-white py-2 rounded font-semibold hover:bg-teal-500 transition duration-200"
        >
          Log in
        </Button>
        <div className="pt-2">
          <Label className="text-base font-medium text-gray-700">
            Don't have an account?
          </Label>
          <p
            className="font-medium text-gray-700 text-left underline underline-offset-2 cursor-pointer hover:text-teal-500"
            onClick={navigateToRegister}
          >
            Click here to sign up
          </p>
        </div>
      </div>
    </div>
  );
}

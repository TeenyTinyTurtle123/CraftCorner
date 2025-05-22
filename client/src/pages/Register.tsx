import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/Context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepetPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      return setError("Both Password input must be the same");
    }
    setError("");

    try {
      const res = await fetch("https://localhost:44373/User/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        setError(errorMessage);
      } else {
        const user = await res.json();
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        // TODO: Maybe add an alert
        navigate("/");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <form>
      <div className="pt-35 flex items-center justify-center bg-teal-50">
        <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-center text-teal-700 mb-6">
            Register account
          </h1>
          {error}

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

          <div className="mb-4">
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
          <div className="mb-6">
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </Label>
            <Input
              placeholder="Password"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepetPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <Button
            // onClick={handleLogin}
            className="w-full bg-teal-600 text-white py-2 rounded font-semibold hover:bg-teal-500 transition duration-200"
            onClick={() => handleRegister}
          >
            Create account
          </Button>
        </div>
      </div>
    </form>
  );
}

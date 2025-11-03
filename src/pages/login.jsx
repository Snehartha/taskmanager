import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users as defaultUsers } from "../data/users";

export default function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const storedUsers = JSON.parse(localStorage.getItem("users")) || defaultUsers;

  const handleLogin = () => {
    const user = storedUsers.find((u) => u.name === name);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      alert("User not found! Please sign up first.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="border p-2 rounded w-64"
      />
      <button
        onClick={handleLogin}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
      <p className="mt-3 text-sm">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

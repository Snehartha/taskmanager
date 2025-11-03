import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users as defaultUsers } from "../data/users";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const storedUsers = JSON.parse(localStorage.getItem("users")) || defaultUsers;

  const handleSignup = () => {
    if (!name || !role) {
      alert("Please enter name and select role");
      return;
    }

    const existing = storedUsers.find((u) => u.name === name);
    if (existing) {
      alert("User already exists! Try a different name.");
      return;
    }

    const newUser = { name, role: role === "pm" ? "pm" : "user" };
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert(`Account created successfully as ${role === "pm" ? "Project Manager" : "Employee"}!`);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="border p-2 rounded w-64 mb-3"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 rounded w-64 mb-3"
      >
        <option value="">Select Role</option>
        <option value="pm">Project Manager</option>
        <option value="user">Employee</option>
      </select>
      <button
        onClick={handleSignup}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Sign Up
      </button>
      <p className="mt-3 text-sm">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  );
}

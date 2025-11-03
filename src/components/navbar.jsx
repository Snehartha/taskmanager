import { useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };
  return (
    <nav className="bg-blue-600 text-white flex justify-between p-4">
      <h2 className="font-bold">Welcome, {user.name}</h2>
      <button onClick={handleLogout} className="bg-white text-blue-600 px-3 py-1 rounded">
        Logout
      </button>
    </nav>
  );
}

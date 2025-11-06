// import { useState } from "react";
// import { users } from "../data/users";

// export default function TaskForm({ onAdd }) {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     deadline: "",
//     assignedTo: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!form.title || !form.assignedTo) return alert("Missing fields!");
//     onAdd({ ...form, id: Date.now(), status: "Pending" });
//     setForm({ title: "", description: "", deadline: "", assignedTo: "" });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
//       <h3 className="text-lg font-semibold mb-2">Add Task</h3>
//       <input
//         type="text"
//         placeholder="Title"
//         className="border p-2 w-full mb-2"
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//       />
//       <textarea
//         placeholder="Description"
//         className="border p-2 w-full mb-2"
//         value={form.description}
//         onChange={(e) => setForm({ ...form, description: e.target.value })}
//       />
//       <input
//         type="date"
//         className="border p-2 w-full mb-2"
//         value={form.deadline}
//         onChange={(e) => setForm({ ...form, deadline: e.target.value })}
//       />
//       <select
//         className="border p-2 w-full mb-2"
//         value={form.assignedTo}
//         onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
//       >
//         <option value="">Assign to</option>
//         {users
//           .filter((u) => u.role === "user")
//           .map((u) => (
//             <option key={u.name}>{u.name}</option>
//           ))}
//       </select>
//       <button className="bg-blue-600 text-white px-4 py-2 rounded">
//         Add Task
//       </button>
//     </form>
//   );
// }

import { useState } from "react";

export default function TaskForm({ onAdd, users }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
    assignedTo: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.assignedTo) return alert("Missing fields!");

    const newTask = {
      ...form,
      id: Date.now(),
      status: "Pending",
      assignedBy: currentUser.name, 
    };

    onAdd(newTask);
    setForm({ title: "", description: "", deadline: "", assignedTo: "" });
  };

  const employeeUsers = users?.filter((u) => u.role === "user") || [];

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-lg font-semibold mb-2">Add Task</h3>
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mb-2"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        className="border p-2 w-full mb-2"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="date"
        className="border p-2 w-full mb-2"
        value={form.deadline}
        onChange={(e) => setForm({ ...form, deadline: e.target.value })}
      />
      <select
        className="border p-2 w-full mb-2"
        value={form.assignedTo}
        onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
      >
        <option value="">Assign to</option>
        {employeeUsers.length === 0 ? (
          <option disabled>No employees registered</option>
        ) : (
          employeeUsers.map((u) => (
            <option key={u.name} value={u.name}>
              {u.name}
            </option>
          ))
        )}
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}

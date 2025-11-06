import { useState, useEffect } from "react";

export default function EditTaskModal({ task, onClose, onSave, users }) {
  const [form, setForm] = useState(task || {});

  // Update form whenever a new task is passed in
  useEffect(() => {
    setForm(task);
  }, [task]);

 
  if (!task) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.assignedTo) {
      alert("Please fill in required fields.");
      return;
    }
    onSave(form);
  };

  const employeeUsers = users?.filter((u) => u.role === "user") || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">✏️ Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full mb-2 rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="border p-2 w-full mb-2 rounded"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="date"
            className="border p-2 w-full mb-2 rounded"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
          <select
            className="border p-2 w-full mb-2 rounded"
            value={form.assignedTo}
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
          >
            <option value="">Assign to</option>
            {employeeUsers.map((u) => (
              <option key={u.name} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

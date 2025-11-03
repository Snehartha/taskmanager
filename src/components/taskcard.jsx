export default function TaskCard({ task, user, onUpdate, onDelete, onEdit }) {
  const statuses = ["Pending", "In Progress", "Done"];

  const handleStatusChange = (e) => {
    onUpdate({ ...task, status: e.target.value });
  };

  return (
    <div className="bg-white shadow p-4 rounded">
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p>{task.description}</p>
      <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
      <p className="text-sm text-gray-600">Assigned by: {task.assignedBy}</p>
      <p className="text-sm text-gray-600">Assigned to: {task.assignedTo}</p>

      {user.role === "user" ? (
        <select
          className="border mt-2 p-1 rounded"
          value={task.status}
          onChange={handleStatusChange}
        >
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      ) : (
        <div className="flex justify-between items-center mt-3 text-sm">
          <span>Status: {task.status}</span>
          <div className="space-x-3">
            <button
              onClick={() => onEdit(task)}
              className="text-blue-500 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


export default function UserList({ users, tasks, onDeleteUser, currentUser }) {
  if (!users || users.length === 0) return null;

  // count assigned tasks per user
  const getTaskCount = (name) =>
    tasks.filter((t) => t.assignedTo === name).length;

  return (
    <div className="bg-white shadow p-4 rounded mb-6">
      <h3 className="font-semibold text-lg mb-3">👥 Registered Users</h3>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Assigned Tasks</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.name} className="text-center">
              <td className="border p-2">{u.name}</td>
              <td className="border p-2 capitalize">
                {u.role === "pm" ? "Project Manager" : "Employee"}
              </td>
              <td className="border p-2">{getTaskCount(u.name)}</td>
              <td className="border p-2">
                {u.name !== currentUser.name && (
                  <button
                    onClick={() => onDeleteUser(u.name)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

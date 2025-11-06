import TaskCard from "./taskcard";

export default function TaskList({
  user,
  tasks,
  onUpdate,
  onDelete,
  onEdit,
  statusFilter = "all", // optional prop for PM filter
}) {
  let visibleTasks = [];

  if (user.role === "pm") {
   
    visibleTasks = tasks.filter((t) => t.assignedBy === user.name);

    if (statusFilter !== "all") {
      visibleTasks = visibleTasks.filter((t) => t.status === statusFilter);
    }
  } else {
    visibleTasks = tasks.filter((t) => t.assignedTo === user.name);
  }

  if (visibleTasks.length === 0) {
    return (
      <div className="text-center text-xl text-gray-500 mt-10">
        {user.role === "pm"
          ? "📝 You haven’t assigned any tasks yet."
          : "🎉 Yahoo! No work assigned right now!"}
      </div>
    );
  }

  // 🗂️ Task Grid
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {visibleTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          user={user}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

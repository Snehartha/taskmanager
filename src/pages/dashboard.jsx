

// import { useEffect, useState } from "react";
// import Navbar from "../components/navbar";
// import TaskList from "../components/tasklist";
// import TaskForm from "../components/taskform";
// import NotificationPanel from "../components/notificationpanel";
// // import UserList from "../components/userlist";
// import { getTasks, saveTasks } from "../utils/storage";
// import {
//   checkOverdueTasks,
//   getNotifications,
//   saveNotifications,
// } from "../utils/notification";

// import {
//   getEmployeeNotifs,
//   saveEmployeeNotifs,
//   checkEmployeeTaskUpdates,
// } from "../utils/employeenotification";

// import { users as defaultUsers } from "../data/users";

// export default function Dashboard() {
//   const [tasks, setTasks] = useState(getTasks());
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("currentUser"))
//   );
//   const [notifications, setNotifications] = useState(getNotifications());
//   const [users, setUsers] = useState(
//     JSON.parse(localStorage.getItem("users")) || defaultUsers
//   );
//   const [filterUser, setFilterUser] = useState("all");


//   const [employeeNotifs, setEmployeeNotifs] = useState(getEmployeeNotifs());

// // Check for employee notifications
// useEffect(() => {
//   if (currentUser.role === "user") {
//     const newN = checkEmployeeTaskUpdates(tasks, currentUser);
//     if (newN.length > 0) {
//       const all = [...employeeNotifs, ...newN];
//       setEmployeeNotifs(all);
//       saveEmployeeNotifs(all);
//       alert(newN.map((n) => n.msg).join("\n\n"));
//     }
//   }
// }, [tasks, currentUser]);




//   // ---- CRUD for Tasks ----
//   const handleAddTask = (task) => {
//     const updated = [...tasks, task];
//     setTasks(updated);
//     saveTasks(updated);
//   };

//   const handleUpdateTask = (updatedTask) => {
//     const updated = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
//     setTasks(updated);
//     saveTasks(updated);
//   };

//   const handleDeleteTask = (id) => {
//     const updated = tasks.filter((t) => t.id !== id);
//     setTasks(updated);
//     saveTasks(updated);
//   };

//   // ---- User Management ----
//   const handleDeleteUser = (name) => {
//     if (confirm(`Are you sure you want to remove ${name}?`)) {
//       const updatedUsers = users.filter((u) => u.name !== name);
//       const updatedTasks = tasks.filter((t) => t.assignedTo !== name);
//       setUsers(updatedUsers);
//       setTasks(updatedTasks);
//       localStorage.setItem("users", JSON.stringify(updatedUsers));
//       saveTasks(updatedTasks);
//       alert(`${name} removed successfully!`);
//     }
//   };

//   // ---- Notifications ----
//   const handleClearNotifications = () => {
//     setNotifications([]);
//     saveNotifications([]);
//   };

//   // ---- Overdue Task Check ----
//   useEffect(() => {
//     if (currentUser.role === "pm") {
//       const newNotifs = checkOverdueTasks(tasks);
//       if (newNotifs.length > 0) {
//         const allNotifs = [...notifications, ...newNotifs];
//         setNotifications(allNotifs);
//         saveNotifications(allNotifs);
//       }
//     }
//   }, [tasks, currentUser]);

//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   // ---- Render ----
//   return (
//     <div>
//       <Navbar user={currentUser} />
//       <div className="p-6">
//         {/* Notifications for PM */}
//         {currentUser.role === "pm" && notifications.length > 0 && (
//           <NotificationPanel
//             notifications={notifications}
//             onClear={handleClearNotifications}
//           />
//         )}

//         {/* User Management (PM Only)
//         {currentUser.role === "pm" && (
//           <UserList
//             users={users}
//             tasks={tasks}
//             onDeleteUser={handleDeleteUser}
//             currentUser={currentUser}
//           />
//         )} */}

//         {/* Add Task (PM Only) */}
//         {currentUser.role === "pm" && (
//           <TaskForm onAdd={handleAddTask} users={users} />
//         )}

//         {/* PM Task Filter */}
//         {currentUser.role === "pm" && (
//           <div className="bg-white shadow p-4 rounded mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
//             <label className="font-semibold mb-2 sm:mb-0">
//               Filter Tasks by Employee:
//             </label>
//             <select
//               value={filterUser}
//               onChange={(e) => setFilterUser(e.target.value)}
//               className="border p-2 rounded"
//             >
//               <option value="all">All</option>
//               {users
//                 .filter((u) => u.role === "user")
//                 .map((u) => (
//                   <option key={u.name} value={u.name}>
//                     {u.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         )}

//         {/* Task List */}
//         <TaskList
//           user={currentUser}
//           tasks={
//             currentUser.role === "pm" && filterUser !== "all"
//               ? tasks.filter((t) => t.assignedTo === filterUser)
//               : tasks
//           }
//           onUpdate={handleUpdateTask}
//           onDelete={handleDeleteTask}
//         />
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import TaskList from "../components/tasklist";
import TaskForm from "../components/taskform";
import NotificationPanel from "../components/notificationpanel";
import EditTaskModal from "../components/editmodel";
import { getTasks, saveTasks } from "../utils/storage";
import {
  checkOverdueTasks,
  getNotifications,
  saveNotifications,
} from "../utils/notification";
import {
  getEmployeeNotifs,
  saveEmployeeNotifs,
  checkEmployeeTaskUpdates,
} from "../utils/employeenotification";
import { users as defaultUsers } from "../data/users";

export default function Dashboard() {
  // ------------------ STATES ------------------
  const [tasks, setTasks] = useState(getTasks());
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const [notifications, setNotifications] = useState(getNotifications());
  const [employeeNotifs, setEmployeeNotifs] = useState(getEmployeeNotifs());
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || defaultUsers
  );
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  // ------------------ TASK CRUD ------------------
  const handleAddTask = (task) => {
    const updated = [...tasks, task];
    setTasks(updated);
    saveTasks(updated);
  };

  const handleUpdateTask = (updatedTask) => {
    const updated = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
    setTasks(updated);
    saveTasks(updated);
  };

  const handleDeleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleSaveEditedTask = (updatedTask) => {
    handleUpdateTask(updatedTask);
    setEditingTask(null);
  };

  // ------------------ NOTIFICATIONS ------------------
  const handleClearNotifications = () => {
    setNotifications([]);
    saveNotifications([]);
  };

  // ------------------ PM DEADLINE ALERTS ------------------
  useEffect(() => {
    if (currentUser.role === "pm") {
      const newNotifs = checkOverdueTasks(tasks, currentUser);
      if (newNotifs.length > 0) {
        const allNotifs = [...notifications, ...newNotifs];
        setNotifications(allNotifs);
        saveNotifications(allNotifs);
      }
    }
  }, [tasks, currentUser]);

  // ------------------ EMPLOYEE TASK ALERTS ------------------
  useEffect(() => {
    if (currentUser.role === "user") {
      const newN = checkEmployeeTaskUpdates(tasks, currentUser);
      if (newN.length > 0) {
        const all = [...employeeNotifs, ...newN];
        setEmployeeNotifs(all);
        saveEmployeeNotifs(all);
        alert(newN.map((n) => n.msg).join("\n\n"));
      }
    }
  }, [tasks, currentUser]);

  // ------------------ SAVE TASKS ------------------
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ------------------ RENDER ------------------
  return (
    <div>
      <Navbar user={currentUser} />
      <div className="p-6">
        {/* PM Notifications for Overdue Tasks */}
        {currentUser.role === "pm" && notifications.length > 0 && (
          <NotificationPanel
            notifications={notifications}
            onClear={handleClearNotifications}
          />
        )}

        {/* PM Task Creation */}
        {currentUser.role === "pm" && <TaskForm onAdd={handleAddTask} users={users} />}

        {/* PM Status Filter */}
        {currentUser.role === "pm" && (
          <div className="bg-white shadow p-4 rounded mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <label className="font-semibold mb-2 sm:mb-0">
              Filter Tasks by Status:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="all">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        )}

        {/* Task List for PMs or Employees */}
        <TaskList
          user={currentUser}
          tasks={tasks}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          statusFilter={statusFilter}
        />
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleSaveEditedTask}
          users={users}
        />
      )}
    </div>
  );
}

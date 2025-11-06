// Utility for employee notifications
export const getEmployeeNotifs = () =>
  JSON.parse(localStorage.getItem("employeeNotifs")) || [];

export const saveEmployeeNotifs = (notifs) =>
  localStorage.setItem("employeeNotifs", JSON.stringify(notifs));

// Compare previous task list with new one to detect new/updated tasks
export const checkEmployeeTaskUpdates = (tasks, user) => {
  const prevTasks = JSON.parse(localStorage.getItem("lastTasks")) || [];
  const myPrev = prevTasks.filter((t) => t.assignedTo === user.name);
  const myCurrent = tasks.filter((t) => t.assignedTo === user.name);

  let newNotifs = [];

  // New task added
  for (const t of myCurrent) {
    if (!myPrev.find((p) => p.id === t.id)) {
      newNotifs.push({
        id: Date.now() + Math.random(),
        msg: ` New task "${t.title}" assigned by ${t.assignedBy}`,
      });
    }
  }

  // Updated tasks
  for (const t of myCurrent) {
    const old = myPrev.find((p) => p.id === t.id);
    if (old && JSON.stringify(old) !== JSON.stringify(t)) {
      newNotifs.push({
        id: Date.now() + Math.random(),
        msg: `Task "${t.title}" was updated by ${t.assignedTo}`,
      });
    }
  }

  // Save current snapshot
  localStorage.setItem("lastTasks", JSON.stringify(tasks));
  return newNotifs;
};

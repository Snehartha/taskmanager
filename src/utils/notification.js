


export const getNotifications = () =>
  JSON.parse(localStorage.getItem("notifications")) || [];

export const saveNotifications = (notifications) =>
  localStorage.setItem("notifications", JSON.stringify(notifications));

export const clearNotifications = () => localStorage.removeItem("notifications");

export const checkOverdueTasks = (tasks) => {
  const today = new Date().toISOString().split("T")[0];
  const overdue = tasks.filter(
    (t) => t.deadline && t.deadline < today && t.status !== "Done"
  );

  if (overdue.length === 0) return [];

  return overdue.map((t) => ({
    id: t.id,
    message: `⚠️ Task "${t.title}" assigned to ${t.assignedTo} missed the deadline (${t.deadline})!`,
    date: today,
  }));
};


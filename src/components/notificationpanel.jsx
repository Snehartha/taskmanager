// export default function NotificationPanel({ notifications }) {
//   if (notifications.length === 0) return null;

//   return (
//     <div className="bg-yellow-100 border border-yellow-300 rounded p-3 mb-4">
//       <h4 className="font-semibold text-yellow-800 mb-2">Overdue Alerts</h4>
//       <ul className="list-disc ml-5 text-sm text-yellow-700">
//         {notifications.map((n) => (
//           <li key={n.id}>{n.message}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default function NotificationPanel({ notifications, onClear }) {
  if (notifications.length === 0) return null;

  return (
    <div className="bg-yellow-100 border border-yellow-300 rounded p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-yellow-800 text-lg">
          ⚠️ Overdue Alerts
        </h4>
        <button
          onClick={onClear}
          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
        >
          Mark all as Read
        </button>
      </div>
      <ul className="list-disc ml-5 text-yellow-700 text-sm">
        {notifications.map((n) => (
          <li key={n.id}>{n.message}</li>
        ))}
      </ul>
    </div>
  );
}


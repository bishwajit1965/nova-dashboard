const mockNotifications = [
  { id: 1, message: "New user registered", time: "2m ago" },
  { id: 2, message: "Revenue target met for April", time: "1h ago" },
  { id: 3, message: "Editor updated post #342", time: "3h ago" },
];

const Notifications = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4 w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Notifications
      </h2>
      <ul className="space-y-3">
        {mockNotifications.map((n) => (
          <li
            key={n.id}
            className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <span className="text-gray-700 dark:text-gray-300">
              {n.message}
            </span>
            <span className="text-sm text-gray-500">{n.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

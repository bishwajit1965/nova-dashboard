const mockNotifications = [
  { id: 1, message: "New user registered", time: "2m ago" },
  { id: 2, message: "Revenue target met for April", time: "1h ago" },
  { id: 3, message: "Editor updated post #342", time: "3h ago" },
];

import { Bell } from "lucide-react";

const Notifications = () => {
  return (
    <div className="bg-base-50 rounded-2xl shadow p-4 w-full">
      <h2 className="text-lg text-base-content font-semibold mb-4">
        Notifications
      </h2>
      <ul className="space-y-3">
        {mockNotifications.map((n) => (
          <li
            key={n.id}
            className="flex shadow justify-between items-center p-3 bg-base-100 dark:bg-gray-700 rounded-lg"
          >
            <span className="flex items-center text-base-content">
              <Bell size={20} className="mr-1" /> {n.message}
            </span>
            <span className="text-sm text-base-content">{n.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

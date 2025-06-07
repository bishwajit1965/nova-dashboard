const Badge = ({ color = "blue", children }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    gray: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  };

  return (
    <span
      className={`px-2 py-0.5 shadow-sm rounded-full text-xs font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
};

export default Badge;

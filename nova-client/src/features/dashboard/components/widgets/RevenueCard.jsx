const RevenueCard = ({ title, amount, percentage, positive = true }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4">
      <h4 className="text-sm text-gray-500 dark:text-gray-400">{title}</h4>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {amount}
      </p>
      <p
        className={`text-sm mt-1 ${
          positive ? "text-green-500" : "text-red-500"
        }`}
      >
        {positive ? "▲" : "▼"} {percentage}%
      </p>
    </div>
  );
};

export default RevenueCard;

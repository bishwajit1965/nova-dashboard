const RevenueCard = ({ title, amount, percentage, positive = true }) => {
  return (
    <div className="bg-base-100 rounded-2xl shadow-sm p-4">
      <h4 className="text-sm text-base-content">{title}</h4>
      <p className="text-2xl font-bold text-base-content">{amount}</p>
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

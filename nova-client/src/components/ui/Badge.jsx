const Badge = ({ text, color = "blue" }) => (
  <span
    className={`px-2 py-1 text-xs rounded-full bg-${color}-100 text-${color}-800`}
  >
    {text}
  </span>
);
export default Badge;

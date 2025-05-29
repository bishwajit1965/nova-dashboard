const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white shadow rounded-2xl p-4 ${className}`}>
    {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
    {children}
  </div>
);
export default Card;

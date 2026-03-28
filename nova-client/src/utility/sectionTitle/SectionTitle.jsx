const SectionTitle = ({
  title,
  userStatus,
  activeStatus,
  decoratedText,
  description,
  icon,
  dataLength,
}) => {
  return (
    <div className="lg:space-y-2 space-y-1 text-center w-full lg:pb-4 pb-2 rounded-md">
      <div className="flex items-center justify-center">
        <h1 className="lg:text-3xl text-xl font-extrabold flex items-center space-x-2">
          <span>{icon}</span>
          <span className="capitalize">{userStatus}</span>
          <span>
            {title}{" "}
            <span className="text-amber-600 text-shadow-amber-500 shadow-amber-300">
              {decoratedText}
            </span>
          </span>{" "}
          {dataLength && (
            <span className="h-6 w-6 rounded-full text-sm flex items-center justify-center border border-base-content">
              {dataLength}
            </span>
          )}
          <span>{activeStatus}</span>
        </h1>
      </div>
      <div className="flex justify-center">
        <p className="text-base max-w-3xl text-center">{description}</p>
      </div>
    </div>
  );
};

export default SectionTitle;

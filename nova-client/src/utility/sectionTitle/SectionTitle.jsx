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
    <div className="lg:space-y-1 space-y-1 text-center bg-base-100 shadow-sm w-full lg:py-2 py-2 rounded-md border-1 border-base-100">
      <div className="flex justify-center">
        <h1 className="lg:text-2xl font-extrabold flex items-center space-x-2">
          <span>{icon}</span>
          <span>{userStatus}</span>
          <span>
            {title}{" "}
            <span className="text-amber-600 text-shadow-amber-500 shadow-amber-300">
              {decoratedText}
            </span>
          </span>{" "}
          <span>{dataLength}</span>
          <span>{activeStatus}</span>
        </h1>
      </div>
      <div className="">
        <p className="">{description}</p>
      </div>
    </div>
  );
};

export default SectionTitle;

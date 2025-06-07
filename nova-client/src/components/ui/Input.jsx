const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input input-bordered w-full"
      {...props}
    />
  );
};

export { Input };

import { cn } from "../../lib/utils";

const Input = ({
  type = "text",
  name,
  icon: Icon,
  value,
  onChange,
  placeholder,
  className = "",
  ...props
}) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground pointer-events-none z-10 text-base-content/25">
          <Icon className="w-5 h-5" />
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "input input-bordered w-full",
          Icon && "pl-10", // add left padding when icon is shown
          className
        )}
        {...props}
      />
    </div>
  );
};

export { Input };

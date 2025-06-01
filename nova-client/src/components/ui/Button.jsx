import { cn } from "../../lib/utils";

const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  href,
  disabled = false,
  loading = false,
  icon: Icon,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded font-semibold transition duration-150";

  const variants = {
    primary: "bg-blue-600 text-white hover:text-base-200 hover:bg-blue-700",
    success:
      "bg-green-600 text-white hover:text-base-200 hover:bg-green-700 shadow-sm",
    secondary:
      "bg-gray-200 text-gray-800 hover:text-base-800 hover:bg-gray-300 shadow-sm",
    danger:
      "bg-red-600 text-white hover:text-gray-800 hover:bg-red-700 shadow-sm",
    green:
      "bg-green-600 text-white hover:text-base-200 hover:bg-green-700 shadow-sm",
    ghost:
      "text-gray-600 hover:text-gray-800 hover:text-black hover:bg-gray-100 border border-gray-200 shadow-sm",
    cyan: "bg-cyan-700 text-base-200 hover:text-white hover:bg-cyan-800 shadow-sm",
    outline:
      "border border-gray-300 text-gray-800 hover:text-gray-800 hover:bg-gray-100 shadow-sm ring-2 ring-offset-2 ring-slate-700 ring-2 outline-2",
    muted:
      "bg-gray-100 text-gray-500 hover:text-gray-800 hover:bg-gray-100 shadow-sm", // 👈 Add this
  };

  const disabledStyles =
    "opacity-50 cursor-not-allowed hover:!text-gray-400 hover:!bg-transparent";

  const loadingSpinner = (
    <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
  );

  const Component = href ? "a" : "button";
  const isDisabled = disabled || loading;

  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      onClick?.(e);
    }
  };

  return (
    <Component
      href={href && !isDisabled ? href : undefined}
      onClick={handleClick}
      className={cn(
        base,
        variants[variant],
        isDisabled && disabledStyles,
        className
      )}
      aria-disabled={isDisabled}
      {...(Component === "button" ? { disabled: isDisabled } : {})}
      {...props}
    >
      {loading ? loadingSpinner : null}
      {Icon && <Icon className="w-4 h-4" />}
      {!loading && children}
    </Component>
  );
};

export default Button;

// USAGE EXAMPLE
{
  /* <Button
  variant="green" // 👈 Variant: green (you can try "primary", "outline", etc.)
  icon={CheckCircle} // 👈 Icon: Lucide Icon component
  loading={isSaving} // 👈 Loader spinner enabled
  disabled={isSaving} // 👈 Disabled while loading
  href="/success" // 👈 Acts like a link (but disabled if loading)
  className="w-full" // 👈 Custom width (optional)
  onClick={() => console.log("Submitted")} // 👈 Click handler
>
  Save & Continue
</Button>; */
}

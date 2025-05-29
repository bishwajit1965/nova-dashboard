import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";

const baseStyles =
  "inline-flex items-center gap-2 px-4 py-2 rounded transition font-medium";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  ghost: "text-blue-600 hover:bg-blue-100",
  disabled: "opacity-50 pointer-events-none cursor-not-allowed",
};

const PluginLink = ({
  to,
  label,
  icon: Icon,
  variant = "primary",
  tooltip = "",
  disabled = false,
  iconOnly = false,
  className = "",
  end = false, // ✅ add this line
  ...props
}) => {
  return (
    <NavLink
      to={disabled ? "#" : to}
      title={tooltip}
      aria-disabled={disabled}
      end={end} // ✅ apply it here
      {...props}
      className={({ isActive }) =>
        cn(
          baseStyles,
          disabled ? variants.disabled : variants[variant],
          iconOnly && "p-2 justify-center",
          isActive &&
            "ring-1 ring-offset-2 ring-green-400 bg-green-700 shadow-lg shadow-green-500/50 outline-2 outline-green-500 animate-pulse", // consistent, elegant effect
          className
        )
      }
    >
      <>
        {Icon && <Icon className="w-4 h-4" />}
        {!iconOnly && <span>{label}</span>}
      </>
    </NavLink>
  );
};

export default PluginLink;

// cn("bg-blue-600", isActive && "bg-blue-800", isDisabled && "opacity-50")
// returns: "bg-blue-600 bg-blue-800" if isActive, etc.

// USAGE EXAMPLES
//=========================
//✅ Regular Button with Icon:
{
  /* <PluginLink to="/dashboard/settings" label="Settings" icon={Settings} />; */
}

//✅  Outline Variant:
{
  /* <PluginLink
  to="/dashboard/users"
  label="Manage Users"
  icon={UsersIcon}
  variant="outline"
/>; */
}

//✅  Icon-Only with Tooltip:
{
  /* <PluginLink
  to="/dashboard/notifications"
  icon={Bell}
  iconOnly
  tooltip="Notifications"
/>; */
}

//✅ Disabled:
{
  /* <PluginLink to="/dashboard/secret" label="Coming Soon" icon={Lock} disabled />; */
}

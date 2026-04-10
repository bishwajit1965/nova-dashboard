import { Eye, Loader2, Pencil, PlusCircleIcon, Trash2, X } from "lucide-react";
import Button from "./Button";
import { cn } from "../../lib/utils";

const icons = {
  edit: Pencil,
  delete: Trash2,
  view: Eye,
  loading: Loader2,
  add: PlusCircleIcon,
  close: X,
};

const iconLabels = {
  edit: "Edit",
  delete: "Delete",
  view: "View",
  add: "Add",
  close: "Close",
  loading: "Loading",
};

// Map local sizes → Button sizes
const sizeMap = {
  xs: "sm",
  sm: "sm",
  md: "md",
  lg: "lg",
};

export function MiniIconButton({
  icon = "edit",
  onClick,
  className = "",
  variant = "muted",
  tooltip,
  loading = false,
  disabled = false,
  label = false,
  size = "xs",
}) {
  const Icon = loading ? Loader2 : icons[icon] || Pencil;
  const text = tooltip || iconLabels[icon] || "Action";

  const baseSize = {
    xs: "h-6 text-xs",
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  };

  return (
    <Button
      icon={Icon}
      onClick={onClick}
      variant={variant}
      size={sizeMap[size] || "sm"}
      loading={loading}
      disabled={disabled}
      title={!label ? text : undefined}
      className={cn(
        "gap-1 shadow-md",
        baseSize[size] || baseSize.xs,
        className,
      )}
    >
      {label ? text : null}
    </Button>
  );
}

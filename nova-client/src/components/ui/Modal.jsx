import { X } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  showClose = true,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className={cn(
          "bg-base-100 p-6 rounded-xl shadow-xl w-[90%] max-w-lg relative",
          className
        )}
      >
        {showClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-black dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

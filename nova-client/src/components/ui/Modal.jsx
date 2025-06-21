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
            <X className="w-7 h-7 bg-base-200 hover:bg-base-300 rounded-full p-1 text-base-content shadow-sm" />
          </button>
        )}
        {title && (
          <h2 className="text-xl font-bold mb-4 border-b pb-2 border-base-content/20">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}

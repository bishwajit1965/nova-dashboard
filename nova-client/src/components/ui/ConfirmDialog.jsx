import { CircleCheckBig, X, XCircle } from "lucide-react";

import Modal from "./Modal";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  icon = <CircleCheckBig size={25} className="text-blue-500" />,
  title = "Confirm Delete ?",
  message = "Are you sure you want to delete this item?",
  confirmText = "Delete",
  cancelText = "Cancel",
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <p className="flex items-center space-x-2">
          <span>{icon}</span>
          <span>{message}</span>
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="btn btn-sm text-base-100 bg-amber-500 shadow-md hover:bg-amber-600"
          >
            <XCircle size={15} className="text-base-100" /> {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-sm text-base-100 bg-red-500 shadow-md hover:bg-red-600"
          >
            <CircleCheckBig size={15} className="text-base-100" /> {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

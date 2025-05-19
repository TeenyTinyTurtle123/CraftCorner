import { ReactNode } from "react";
import { Button } from "./ui/button";

type EditProjectModalProps = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
};

export function EditProjectModal({
  open,
  children,
  onClose,
}: EditProjectModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-stone-700/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl">
        {children}
        <div className="mt-4 text-right">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}

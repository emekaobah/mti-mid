"use client";

import React, { ReactNode, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TriangleAlert } from "lucide-react";
import useModalStore from "@/hooks/store/useModalStore";

interface modalProps {
  title?: string;
  description?: string;
  isModalOpen: boolean;
  onSubmit?: () => void;
  children?: ReactNode;
  showWarning?: boolean;
  cancelModal?: boolean;
}

const Modal: React.FC<modalProps> = ({
  title,
  description,
  isModalOpen,
  children,
  showWarning,
  cancelModal,
}) => {
  const { closeModal } = useModalStore();

  const [internalOpen, setInternalOpen] = useState(false);

  // Delay opening to ensure dropdown cleanup
  useEffect(() => {
    if (isModalOpen) {
      // Small delay to let any existing focus traps clean up
      const timer = setTimeout(() => {
        setInternalOpen(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setInternalOpen(false);
    }
  }, [isModalOpen]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setInternalOpen(false);
      // Additional delay to ensure proper cleanup
      setTimeout(() => {
        closeModal();
      }, 10);
    }
  };
  return (
    <div>
      <Dialog open={internalOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="w-[50%] flex flex-col gap-7 items-center justify-center">
          <DialogHeader className="flex flex-col gap-2 items-center">
            {showWarning && (
              <TriangleAlert
                color={`${cancelModal ? "#DE1E1E" : "#01300A"}`}
                height={48}
                width={48}
              />
            )}
            <DialogTitle className="text-center font-bold text-2xl text-[#01300A]">
              {title}
            </DialogTitle>
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          </DialogHeader>

          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;

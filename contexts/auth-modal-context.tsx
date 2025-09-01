"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthModalContextType {
  isOpen: boolean;
  openModal: (intent?: string) => void;
  closeModal: () => void;
  intent: string | null;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
);

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
};

interface AuthModalProviderProps {
  children: ReactNode;
}

export const AuthModalProvider: React.FC<AuthModalProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [intent, setIntent] = useState<string | null>(null);

  const openModal = (intent?: string) => {
    setIntent(intent || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIntent(null);
  };

  return (
    <AuthModalContext.Provider
      value={{ isOpen, openModal, closeModal, intent }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

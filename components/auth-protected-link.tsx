import React from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

interface AuthProtectedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onOpenAuthModal: () => void;
}

const AuthProtectedLink: React.FC<AuthProtectedLinkProps> = ({
  href,
  children,
  className = "",
  onOpenAuthModal,
}) => {
  const { isAuthenticated } = useAuth();

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      onOpenAuthModal();
    }
    // If authenticated, let the Link handle navigation naturally
  };

  if (isAuthenticated) {
    // Authenticated user: Navigate to the href
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  } else {
    // Unauthenticated user: Button that opens auth modal
    return (
      <button onClick={handleClick} className={className}>
        {children}
      </button>
    );
  }
};

export default AuthProtectedLink;

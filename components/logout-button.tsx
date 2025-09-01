import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function LogoutButton() {
  const { logout, user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Button
      onClick={logout}
      variant="outline"
      className="text-red-600 border-red-600 hover:bg-red-50"
    >
      Logout
    </Button>
  );
}

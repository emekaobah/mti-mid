import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";

export function UserStatus() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-2">
        <Badge variant="secondary">Not authenticated</Badge>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Badge variant="default" className="bg-green-600">
        Authenticated
      </Badge>
      <span className="text-sm text-gray-600">
        {user.email} ({user.country})
      </span>
    </div>
  );
}

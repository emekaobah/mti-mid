import { useApiMutation } from "@/lib/api-hooks";
import type {
  EmailVerificationRequest,
  EmailVerificationResponse,
} from "../shared/types";

export const useAuthenticate = () => {
  return useApiMutation<"/api/Auth/authenticate", EmailVerificationRequest>(
    "/api/Auth/authenticate",
    "post"
  );
};

export const useAuthenticateWithOptions = (
  options?: Parameters<
    typeof useApiMutation<"/api/Auth/authenticate", EmailVerificationRequest>
  >[2]
) => {
  return useApiMutation<"/api/Auth/authenticate", EmailVerificationRequest>(
    "/api/Auth/authenticate",
    "post",
    options
  );
};

// Keep the old name for backward compatibility
export const useRequestEmailLink = useAuthenticate;
export const useRequestEmailLinkWithOptions = useAuthenticateWithOptions;

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

// Hook for the actual request-email-link endpoint
export const useRequestEmailLink = () => {
  return useApiMutation<
    "/api/Auth/request-email-link",
    EmailVerificationRequest
  >("/api/Auth/request-email-link", "post");
};

export const useRequestEmailLinkWithOptions = (
  options?: Parameters<
    typeof useApiMutation<
      "/api/Auth/request-email-link",
      EmailVerificationRequest
    >
  >[2]
) => {
  return useApiMutation<
    "/api/Auth/request-email-link",
    EmailVerificationRequest
  >("/api/Auth/request-email-link", "post", options);
};

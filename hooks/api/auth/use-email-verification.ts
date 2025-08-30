import { useApiMutation } from "@/lib/api-hooks";
import type { EmailVerificationRequest } from "../shared/types";

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

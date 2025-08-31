import { useApiQuery } from "@/lib/api-hooks";

export interface VerifyTokenRequest {
  token: string;
}

export interface VerifyTokenResponse {
  success: boolean;
  code: string;
  message: string;
  email: string | null;
  userId: string | null;
  accessToken: string | null;
  tokenType: string | null;
  country: string | null;
}

export const useVerifyToken = (params?: VerifyTokenRequest) => {
  return useApiQuery<"/api/Auth/verify">("/api/Auth/verify", params, {
    enabled: !!params?.token,
  });
};

export const useVerifyTokenWithOptions = (
  params?: VerifyTokenRequest,
  options?: Parameters<typeof useApiQuery<"/api/Auth/verify">>[2]
) => {
  return useApiQuery<"/api/Auth/verify">("/api/Auth/verify", params, {
    enabled: !!params?.token,
    ...options,
  });
};

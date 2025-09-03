import { useApiQuery } from "@/lib/api-hooks";

export interface VerifyTokenRequest {
  token: string;
  email: string;
}

export interface VerifyTokenData {
  success: boolean;
  code: string | null;
  message: string;
  email: string;
  userId: string;
  country: string;
}

export interface VerifyTokenResponse {
  succeeded: boolean;
  code: number;
  message: string;
  data: VerifyTokenData;
  pageMeta: null;
  errors: null;
}

export const useVerifyToken = (params?: VerifyTokenRequest) => {
  return useApiQuery<"/api/Auth/verify">("/api/Auth/verify", params, {
    enabled: !!params?.token && !!params?.email,
  });
};

export const useVerifyTokenWithOptions = (
  params?: VerifyTokenRequest,
  options?: Parameters<typeof useApiQuery<"/api/Auth/verify">>[2]
) => {
  return useApiQuery<"/api/Auth/verify">("/api/Auth/verify", params, {
    enabled: !!params?.token && !!params?.email,
    ...options,
  });
};

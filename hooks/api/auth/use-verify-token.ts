import { useApiQuery } from "@/lib/api-hooks";

export interface UseVerifyTokenParams {
  token?: string;
}

export const useVerifyToken = (params?: UseVerifyTokenParams) => {
  return useApiQuery<"/api/Auth/verify">("/api/Auth/verify", params, {
    enabled: !!params?.token,
  });
};

export const useVerifyTokenWithOptions = (
  params?: UseVerifyTokenParams,
  options?: Parameters<typeof useApiQuery<"/api/Auth/verify">>[2]
) => {
  return useApiQuery<"/api/Auth/verify">("/api/Auth/verify", params, {
    enabled: !!params?.token,
    ...options,
  });
};

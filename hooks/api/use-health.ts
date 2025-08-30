import { useApiQuery } from "@/lib/api-hooks";

export const useHealthCheck = () => {
  return useApiQuery<"/health">("/health");
};

export const useHealthCheckWithOptions = (
  options?: Parameters<typeof useApiQuery<"/health">>[2]
) => {
  return useApiQuery<"/health">("/health", undefined, options);
};

import { useQuery } from "@tanstack/react-query";
import { service } from "@/lib/custom-apis/apis";

export const useFetchOrgCharts = (url: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [url],
    queryFn: () => {
      return service.genericstring(url);
    },

    staleTime: 60 * 1000,
  });

  return {
    data,
    isLoading,
  };
};

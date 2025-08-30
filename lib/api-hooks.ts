import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import axiosClient from "./axios";
import type { paths } from "./api-types";

// Utility type helpers to extract types from OpenAPI spec
type ApiPaths = paths;
type GetEndpoint<T extends keyof ApiPaths> = ApiPaths[T] extends {
  get: unknown;
}
  ? ApiPaths[T]["get"]
  : never;

// Extract response data type
type ResponseData<T> = T extends {
  responses: {
    200: {
      content: {
        "application/json": infer R;
      };
    };
  };
}
  ? R
  : unknown;

// Extract query parameters type
type QueryParams<T> = T extends {
  parameters: {
    query?: infer Q;
  };
}
  ? Q
  : Record<string, unknown>;

// Generic API query hook
export const useApiQuery = <T extends keyof ApiPaths>(
  endpoint: T,
  params?: QueryParams<GetEndpoint<T>>,
  options?: Omit<
    UseQueryOptions<ResponseData<GetEndpoint<T>>>,
    "queryKey" | "queryFn"
  >
) => {
  type Response = ResponseData<GetEndpoint<T>>;

  return useQuery<Response>({
    queryKey: [endpoint, params],
    queryFn: async () => {
      const response = await axiosClient.get(endpoint as string, { params });
      return response.data;
    },
    ...options,
  });
};

// Generic API mutation hook
export const useApiMutation = <T extends keyof ApiPaths, TData = unknown>(
  endpoint: T,
  method: "post" | "put" | "delete" | "patch" = "post",
  options?: Omit<UseMutationOptions<unknown, Error, TData>, "mutationFn">
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TData) => {
      let response;
      if (method === "delete") {
        response = await axiosClient.delete(endpoint as string, { data });
      } else if (method === "post") {
        response = await axiosClient.post(endpoint as string, data);
      } else if (method === "put") {
        response = await axiosClient.put(endpoint as string, data);
      } else if (method === "patch") {
        response = await axiosClient.patch(endpoint as string, data);
      } else {
        throw new Error(`Unsupported HTTP method: ${method}`);
      }
      return response.data;
    },
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: [endpoint] });
    },
    ...options,
  });
};

// Specific hooks - add only the ones you actually use
// Example usage patterns:

// export const useGetUsers = (params?: { page?: number; limit?: number }) =>
//   useApiQuery('/api/users', params)

// export const useCreateUser = () =>
//   useApiMutation('/api/users', 'post')

// export const useGetUser = (id: string, options?: UseQueryOptions) =>
//   useApiQuery(`/api/users/${id}` as keyof ApiPaths, undefined, { enabled: !!id, ...options })

// export const useUpdateUser = (id: string) =>
//   useApiMutation(`/api/users/${id}` as keyof ApiPaths, 'put')

// export const useDeleteUser = (id: string) =>
//   useApiMutation(`/api/users/${id}` as keyof ApiPaths, 'delete')

// Add your actual endpoints after checking the generated types file

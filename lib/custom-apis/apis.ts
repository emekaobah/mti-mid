import axiosClient from "../axios";
import {
  ApiResponse,
  verifyBvnResponse,
  TradeInterestQuery,
  TradeSubmissions,
} from "./types";

interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const service = {
  async verifyBvn(bvn: string): Promise<verifyBvnResponse> {
    const response = await axiosClient.post<verifyBvnResponse>(
      `api/Auth/validate-bvn`,
      {
        bvn: bvn,
      }
    );
    return response.data;
  },

  async organizationChart(
    payload: TradeInterestQuery
  ): Promise<verifyBvnResponse> {
    const response = await axiosClient.get<verifyBvnResponse>(
      `api/TradeInterest/organization-chart`,
      { params: payload }
    );
    return response.data;
  },

  // Update your API function
  async genericstring(
    url: string
  ): Promise<ApiResponse<PaginatedResponse<TradeSubmissions>>> {
    const response = await axiosClient.get<
      ApiResponse<PaginatedResponse<TradeSubmissions>>
    >(url);

    return response.data;
  },
};

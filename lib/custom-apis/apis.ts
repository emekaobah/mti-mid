import axiosClient from "../axios";
import {
  verifyBvnResponse,
  TradeInterestQuery,
  TradeSubmissions,
} from "./types";
import { ApiResponse } from "@/hooks/api/trade-interest/types";

interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const service = {
  async verifyBvn(bvn: string): Promise<ApiResponse<verifyBvnResponse>> {
    const response = await axiosClient.post<ApiResponse<verifyBvnResponse>>(
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

import axiosClient from "../axios";
import { ApiResponse, verifyBvnResponse } from "./types";

export const service = {
  async verifyBvn(bvn: string): Promise<verifyBvnResponse> {
    const response = await axiosClient.post<verifyBvnResponse>(
      `api/Auth/bvn/validate`,
      {
        bvn: bvn,
      }
    );
    return response.data;
  },
};

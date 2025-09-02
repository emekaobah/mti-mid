import { useApiMutation } from "@/lib/api-hooks";
import type { CreateTradeInterestRequest } from "../shared/types";

export const useCreateTradeInterest = () => {
  return useApiMutation<
    "/api/TradeInterest/create-trade-interest",
    CreateTradeInterestRequest
  >("/api/TradeInterest/create-trade-interest", "post");
};

export const useCreateTradeInterestWithOptions = (
  options?: Parameters<
    typeof useApiMutation<
      "/api/TradeInterest/create-trade-interest",
      CreateTradeInterestRequest
    >
  >[2]
) => {
  return useApiMutation<
    "/api/TradeInterest/create-trade-interest",
    CreateTradeInterestRequest
  >("/api/TradeInterest/create-trade-interest", "post", options);
};

interface CreateContactRequest {
  tradeInterestId: string;
}
export const useCreateContactRequest = () => {
  return useApiMutation<
    "/api/TradeInterest/create-contact-request",
    CreateContactRequest
  >("/api/TradeInterest/create-contact-request", "post");
};

import { Button } from "../ui/button";
import { useCreateContactRequest } from "@/hooks/api";
import useTradeSUbmissionStore from "@/hooks/store/useTradeSubmissionStore";
import { toast } from "sonner";
import useModalStore from "@/hooks/store/useModalStore";

export const RequestBuyerModal = () => {
  const { submission } = useTradeSUbmissionStore();
  const request = useCreateContactRequest();
  const { closeModal } = useModalStore();

  const handleRequest = () => {
    if (!submission?.tradeInterestId) {
      toast.error("Error", {
        description: "Invalid trade request",
      });
      return;
    }
    request.mutate(
      {
        tradeInterestId: submission?.tradeInterestId,
        productId: submission.productId ?? "",
        serviceId: submission.serviceId ?? "",
      },
      {
        onSuccess: () => {
          toast.success("Success", {
            description: "Request Sent",
          });
          closeModal();
        },
        onError: () => {
          toast.error("Error", {
            description: "Something went wrong",
          });
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-3 text-sm mb-4">
        <p className="text-center">
          Your request will be sent to an administrator and a<br /> response
          will be sent to your email.
        </p>
        <p>Click below to proceed.</p>
        <Button
          color="#074318"
          className="bg-[#074318]"
          onClick={() => handleRequest()}
        >
          Request Details
        </Button>
      </div>
    </div>
  );
};

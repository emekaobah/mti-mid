import { CircleCheck } from "lucide-react";

export const RequestBuyerModal = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <CircleCheck size={120} className="animate-bounce" color="#074318" />
      <div className="flex flex-col items-center gap-3 text-sm mb-4">
        <p>Your request has been received.</p>
        <p className="text-center">
          You’ll receive the buyer’s verified contact information <br />
          directly in your email.
        </p>
      </div>
    </div>
  );
};

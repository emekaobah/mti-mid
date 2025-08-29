import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import useModalStore from "@/hooks/store/useModalStore";

export const VerifyBvnModal = () => {
  const router = useRouter();
  const { closeModal } = useModalStore();
  return (
    <div className="flex flex-col items-center gap-6">
      {/* <CircleCheck size={120} className="animate-bounce" color="#074318" /> */}
      <div className="flex flex-col items-center gap-3 text-sm mb-4">
        <p>
          Please verify your identity to view more details about this trade
          request
        </p>
        <input type="text" className="w-full p-4" placeholder="BVN" />
        <Button
          className="rounded-full bg-[#074318]"
          onClick={() => {
            closeModal();
            router.push("/admin/sector-breakdown");
          }}
        >
          Verify
        </Button>
      </div>
    </div>
  );
};

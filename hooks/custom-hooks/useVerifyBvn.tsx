import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { service } from "@/lib/custom-apis/apis";
import { useRouter } from "next/navigation";
import { verifyBvnResponse } from "@/lib/custom-apis/types";
import { toast } from "sonner";
import { ApiResponse } from "../api/trade-interest/types";
import useFilterStore from "../store/useFilterStore";

export const useVerifyBvn = () => {
  const router = useRouter();
  const { sector } = useFilterStore();

  return useMutation({
    mutationFn: (bvn: string) => service.verifyBvn(bvn),
    onSuccess: (res: ApiResponse<verifyBvnResponse>) => {
      if (res.data.valid === true) {
        toast.success("Success", {
          description: "Verification successful",
          style: {
            background: "green",
            color: "white",
          },
        });
        if (sector.sectorId.includes("SERVICESEC")) {
          router.push("/trade-requests/services");
        } else {
          router.push("/trade-requests/breakdown");
        }
      } else
        toast.error("Invalid BVN", {
          description: "Kindly enter a valid BVN to proceed",
          style: {
            background: "red",
            color: "white",
          },
        });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};

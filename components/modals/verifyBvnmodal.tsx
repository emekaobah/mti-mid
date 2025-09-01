import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import useModalStore from "@/hooks/store/useModalStore";
import { useVerifyBvn } from "@/hooks/custom-hooks/useVerifyBvn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const bvnSchema = z.object({
  bvn: z
    .string()
    .min(1, "BVN is required")
    .length(11, "BVN must be exactly 11 digits")
    .regex(/^\d+$/, "BVN must contain only numbers"),
});

type Type = z.infer<typeof bvnSchema>;

export const VerifyBvnModal = () => {
  const { closeModal } = useModalStore();

  const methods = useForm<Type>({
    resolver: zodResolver(bvnSchema),
    mode: "onChange",
    defaultValues: {
      bvn: "",
    },
  });
  const { mutate: verifyBvn, isPending } = useVerifyBvn();
  const onSubmit = async (data: Type) => {
    try {
      verifyBvn(data.bvn, {
        onSuccess: (res) => {
          if (res.data.valid === true) closeModal();
        },
      });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
    }
  };
  return (
    <form
      className="flex flex-col items-center gap-6"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      {/* <CircleCheck size={120} className="animate-bounce" color="#074318" /> */}
      <div className="flex flex-col items-center gap-3 text-sm mb-4">
        <p>
          Please verify your identity to view more details about this trade
          request
        </p>
        <input
          type="text"
          className="w-full p-4"
          placeholder="BVN"
          {...methods.register("bvn")}
        />
        {methods.formState.errors.bvn && (
          <p className="text-red-500 text-sm">
            {methods.formState.errors.bvn.message}
          </p>
        )}
        <Button
          className="rounded-full bg-[#074318]"
          // onClick={() => {
          //   closeModal();
          //   router.push("/admin/sector-breakdown");
          // }
          // }
          type="submit"
          disabled={isPending}
        >
          Verify
        </Button>
      </div>
    </form>
  );
};

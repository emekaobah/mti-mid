import ColumnAction from "@/components/table/column-action";
// import useViewRequestStore from "@/features/requests/stores/useViewRequestStore";
import { useRouter } from "next/navigation";
// import { Requests } from "@/features/requests/lib/types/responseTypes";
import { items } from "@/components/table/column-action";
import { Eye, CircleX, FilePenLine } from "lucide-react";
// import { useCancelRequest } from "@/features/requests/hooks/useRequests";
import useModalStore from "@/hooks/store/useModalStore";
import useTradeSUbmissionStore from "@/hooks/store/useTradeSubmissionStore";
import { TradeSubmissions } from "@/lib/custom-apis/types";

export const TradeRequestsAction = ({
  submission,
}: {
  submission: TradeSubmissions;
}) => {
  const router = useRouter();
  const { openModal } = useModalStore();
  const { setSubmission } = useTradeSUbmissionStore();

  const menuItems: items[] = [
    // {
    //   label: "Details",
    //   action: () => {
    //     setSubmission(submission);
    //     router.push(`/trade-requests/breakdown/1/details`);
    //   },
    //   //   icon: Eye,
    // },
    {
      label: "Request Contact Info",
      action: () => {
        setSubmission(submission);
        openModal("requestBuyerModal");
      },
      //   icon: FilePenLine,
    },
  ];

  return <ColumnAction menuItems={menuItems} />;
};

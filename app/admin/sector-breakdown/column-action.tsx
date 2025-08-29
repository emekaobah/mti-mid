import ColumnAction from "@/components/table/column-action";
// import useViewRequestStore from "@/features/requests/stores/useViewRequestStore";
import { useRouter } from "next/navigation";
// import { Requests } from "@/features/requests/lib/types/responseTypes";
import { items } from "@/components/table/column-action";
import { Eye, CircleX, FilePenLine } from "lucide-react";
// import { useCancelRequest } from "@/features/requests/hooks/useRequests";
import useModalStore from "@/hooks/store/useModalStore";

export const RequestsColumnAction = () => {
  const router = useRouter();
  //   const { mutate: cancelRequest } = useCancelRequest();
  const { openModal } = useModalStore();

  //   const { setRequest } = useViewRequestStore();

  const menuItems: items[] = [
    {
      label: "Details",
      action: () => {
        // setRequest(request);
        router.push(`/admin/sector-breakdown/1/business-details`);
      },
      //   icon: Eye,
    },
    {
      label: "Request Buyers Contact",
      action: () => {
        // setRequest(request);
        // router.push(
        //   `/request-management/product-request/${request.id}/edit-request`
        // );
        openModal("requestBuyerModal");
      },
      //   icon: FilePenLine,
    },
  ];

  return <ColumnAction menuItems={menuItems} />;
};

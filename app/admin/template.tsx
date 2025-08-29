"use client";
import Modal from "@/components/modal-container";
import useModalStore from "@/hooks/store/useModalStore";
import { RequestBuyerModal } from "@/components/modals/requestBuyerModal";
import { VerifyBvnModal } from "@/components/modals/verifyBvnmodal";

const MainTemplate = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { activeModal } = useModalStore();

  return (
    <>
      {/* Requests */}
      <Modal
        isModalOpen={activeModal === "requestBuyerModal"}
        // title="Input Code"
        // description="A code was sent to your email address. Input code to complete this order"
      >
        <RequestBuyerModal />
      </Modal>
      <Modal isModalOpen={activeModal === "verifyBvnModal"}>
        <VerifyBvnModal />
      </Modal>
      {children}
    </>
  );
};

export default MainTemplate;

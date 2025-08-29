"use client";
import Modal from "@/components/modal-container";
import useModalStore from "@/hooks/store/useModalStore";
import { RequestBuyerModal } from "@/components/modals/requestBuyerModal";
import { VerifyBvnModal } from "@/components/modals/verifyBvnmodal";
import { VerifyMailandCountry } from "@/components/modals/verifyMailandCountryModal";

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
      <Modal
        isModalOpen={activeModal === "verifyMailandCountry"}
        title="Let's do a quick check"
        description="Please verify your identity, then the insights are all yours."
      >
        <VerifyMailandCountry />
      </Modal>
      <Modal isModalOpen={activeModal === "verifyBvnModal"}>
        <VerifyBvnModal />
      </Modal>
      {children}
    </>
  );
};

export default MainTemplate;

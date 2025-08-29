import { create } from "zustand";

type ModalName =
  | "requestBuyerModal"
  | "verifyBvnModal"
  | "verifyMailandCountry";

interface ModalState {
  activeModal: ModalName | null;
  openModal: (modal: ModalName) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
}));

export default useModalStore;

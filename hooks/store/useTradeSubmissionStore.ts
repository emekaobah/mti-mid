import { TradeSubmissions } from "@/lib/custom-apis/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Submission {
  submission: TradeSubmissions | null;
  setSubmission: (submission: TradeSubmissions) => void;
  reset: () => void;
}

const useTradeSUbmissionStore = create<Submission>()(
  persist(
    (set) => ({
      submission: null,
      setSubmission: (submission) => set({ submission }),
      reset: () => set({ submission: null }),
    }),
    {
      name: "trade-submission",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useTradeSUbmissionStore;

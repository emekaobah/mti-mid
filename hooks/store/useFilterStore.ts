// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const state = {
  globalFilter: "",
  organizationFilterValue: "",
  countryFilterValue: "",
  productFilterValue: "",
  hsCodesFilterValue: "",
  productSectorFilterValue: "",
  serviceSectorFilterValue: "",
  tradeType: "",
};

interface FilterActions {
  globalFilter: string;
  organizationFilterValue: string;
  countryFilterValue: string;
  productFilterValue: string;
  hsCodesFilterValue: string;
  productSectorFilterValue: string;
  serviceSectorFilterValue: string;
  tradeType: string | number;
  setGlobalFilter: (value: string) => void;
  setOrganizationFilterValue: (value: string) => void;
  setCountryFilterValue: (value: string) => void;
  setProductFilterValue: (value: string) => void;
  setHsCodesFilterValue: (value: string) => void;
  setProductSectorFilterValue: (value: string) => void;
  setServiceSectorFilterValue: (value: string) => void;
  setTradeType: (value: string | number) => void;
  reset: () => void;
}

const useFilterStore = create<FilterActions>()(
  persist(
    (set) => ({
      ...state,
      setGlobalFilter: (value) => set({ globalFilter: value }),
      setOrganizationFilterValue: (value) =>
        set({ organizationFilterValue: value }),
      setCountryFilterValue: (value) => set({ countryFilterValue: value }),
      setProductFilterValue: (value) => set({ productFilterValue: value }),
      setHsCodesFilterValue: (value) => set({ hsCodesFilterValue: value }),
      setProductSectorFilterValue: (value) =>
        set({ productSectorFilterValue: value }),
      setServiceSectorFilterValue: (value) =>
        set({ serviceSectorFilterValue: value }),
      setTradeType: (value) => set({ tradeType: value }),
      reset: () => set({ ...state }),
    }),
    {
      name: "filters",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFilterStore;

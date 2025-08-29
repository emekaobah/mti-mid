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
};

interface FilterActions {
  globalFilter: string;
  organizationFilterValue: string;
  countryFilterValue: string;
  productFilterValue: string;
  hsCodesFilterValue: string;
  setGlobalFilter: (value: string) => void;
  setOrganizationFilterValue: (value: string) => void;
  setCountryFilterValue: (value: string) => void;
  setProductFilterValue: (value: string) => void;
  setHsCodesFilterValue: (value: string) => void;
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
      reset: () => set({ ...state }),
    }),
    {
      name: "dash_table_filter",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFilterStore;

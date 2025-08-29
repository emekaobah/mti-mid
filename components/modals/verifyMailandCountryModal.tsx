import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import useModalStore from "@/hooks/store/useModalStore";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { z } from "zod";
import ReactFlagsSelect from "react-flags-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const contactInfoSchema = z.object({
  //   name: z.string().min(1, "Full name is required"),
  //   company: z.string().min(1, "Company or institution name is required"),
  //   city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  email: z.string().email("Please enter a valid email address"),
  //   phone: z.string().optional(),
  //   gender: z.enum(["Male", "Female"]).optional(),
  //   contactMethod: z.array(z.string()).optional(),
});

const countries = [
  "NG",
  "ZA",
  "KE",
  "GH",
  "CM",
  "UG",
  "TZ",
  "ET",
  "EG",
  "MA",
  "DZ",
  "TN",
  "LY",
  "SD",
  "TD",
  "NE",
  "ML",
  "BF",
  "CI",
  "SN",
  "GN",
  "SL",
  "LR",
  "TG",
  "BJ",
  "GW",
  "CV",
  "GM",
  "MR",
  "DJ",
  "SO",
  "ER",
  "CF",
  "CG",
  "CD",
  "GA",
  "GQ",
  "ST",
  "AO",
  "ZM",
  "ZW",
  "BW",
  "NA",
  "SZ",
  "LS",
  "MG",
  "MU",
  "SC",
  "KM",
  "BI",
  "RW",
  "MW",
  "MZ",
];

export type ContactInfoType = z.infer<typeof contactInfoSchema>;

export const VerifyMailandCountry = () => {
  const router = useRouter();
  const { closeModal } = useModalStore();
  const { control } = useFormContext<ContactInfoType>();
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-3 text-sm mb-4">
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Country <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="w-full">
                  <ReactFlagsSelect
                    selected={field.value}
                    onSelect={field.onChange}
                    searchable
                    countries={countries}
                    customLabels={{
                      NG: "Nigeria",
                      ZA: "South Africa",
                      KE: "Kenya",
                      GH: "Ghana",
                      CM: "Cameroon",
                      UG: "Uganda",
                      TZ: "Tanzania",
                      ET: "Ethiopia",
                      EG: "Egypt",
                      MA: "Morocco",
                      DZ: "Algeria",
                      TN: "Tunisia",
                      LY: "Libya",
                      SD: "Sudan",
                      TD: "Chad",
                      NE: "Niger",
                      ML: "Mali",
                      BF: "Burkina Faso",
                      CI: "Ivory Coast",
                      SN: "Senegal",
                      GN: "Guinea",
                      SL: "Sierra Leone",
                      LR: "Liberia",
                      TG: "Togo",
                      BJ: "Benin",
                      GW: "Guinea-Bissau",
                      CV: "Cape Verde",
                      GM: "Gambia",
                      MR: "Mauritania",
                      DJ: "Djibouti",
                      SO: "Somalia",
                      ER: "Eritrea",
                      CF: "Central African Republic",
                      CG: "Republic of Congo",
                      CD: "Democratic Republic of Congo",
                      GA: "Gabon",
                      GQ: "Equatorial Guinea",
                      ST: "São Tomé and Príncipe",
                      AO: "Angola",
                      ZM: "Zambia",
                      ZW: "Zimbabwe",
                      BW: "Botswana",
                      NA: "Namibia",
                      SZ: "Eswatini",
                      LS: "Lesotho",
                      MG: "Madagascar",
                      MU: "Mauritius",
                      SC: "Seychelles",
                      KM: "Comoros",
                      BI: "Burundi",
                      RW: "Rwanda",
                      MW: "Malawi",
                      MZ: "Mozambique",
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Email Address <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="rounded-full bg-[#074318]"
          onClick={() => {
            closeModal();
            router.push("/admin/sectors");
          }}
        >
          Verify
        </Button>
      </div>
    </div>
  );
};

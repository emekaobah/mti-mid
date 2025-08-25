"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { z } from "zod";

export const contactInfoSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  company: z.string().min(1, "Company or institution name is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
});

export type ContactInfoType = z.infer<typeof contactInfoSchema>;

export default function ContactInfo() {
  const { control } = useFormContext<ContactInfoType>();

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

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <FormDescription>
          Please provide your contact details so we can follow up if needed.
        </FormDescription>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Full Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Company / Institution <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter company or institution name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                City <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Country <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="max-w-md">
                  <ReactFlagsSelect
                    selected={field.value}
                    onSelect={field.onChange}
                    searchable
                    placeholder="Select your country"
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
            <FormItem>
              <FormLabel>
                Email Address <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <div className="max-w-md">
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="NG"
                    placeholder="Enter phone number"
                    value={field.value}
                    onChange={field.onChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </FormControl>
              <FormDescription>
                Optional - we may call for clarification
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

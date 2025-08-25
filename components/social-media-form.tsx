"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Globe, Handshake, User, Mail } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import ReactFlagsSelect from "react-flags-select";
import { z } from "zod";

export const socialMediaFormSchema = z.object({
  originCountry: z.string().min(1, "Please select your country"),
  userType: z.string().min(1, "Please select your user type"),
  gender: z.enum(["Male", "Female"]).optional(),
  contactMethod: z.array(z.string()).optional(),
  contactInfo: z.string().optional(),
});

export type SocialMediaFormType = z.infer<typeof socialMediaFormSchema>;

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
const userTypes = [
  "Individual Buyer/Consumer",
  "SME Owner",
  "Distributor/Wholesaler",
  "Supermarket/Retailer",
  "Large Company/Corporation",
  "Startup",
  "Cooperative/Farmers Association",
  "Trade Association/Business Association",
  "Not applicable (Government/Other)",
];
const contactMethods = ["WhatsApp", "Email", "Phone"];

export default function SocialMediaForm() {
  const { control } = useFormContext<SocialMediaFormType>();

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <Globe className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Additional Information</h3>
      </div>

      <FormField
        control={control}
        name="originCountry"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <FormLabel className="text-base font-medium">
                Where are you from? <span className="text-red-500">*</span>
              </FormLabel>
            </div>
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
        name="userType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <div className="flex items-center space-x-2">
              <Handshake className="h-4 w-4 text-muted-foreground" />
              <FormLabel className="text-base font-medium">
                You are a: <span className="text-red-500">*</span>
              </FormLabel>
            </div>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                {userTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-3">
                    <RadioGroupItem value={type} id={type} />
                    <Label
                      htmlFor={type}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <FormLabel>Gender</FormLabel>
            </div>
            <FormDescription>
              Optional - helps us understand our respondent demographics.
            </FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex items-center space-x-6"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="Male" id="male" />
                  <Label
                    htmlFor="male"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Male
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="Female" id="female" />
                  <Label
                    htmlFor="female"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Female
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="contactMethod"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center space-x-2 mb-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <FormLabel className="text-base font-medium">
                How can we reach you?
              </FormLabel>
            </div>
            <FormDescription>
              Select your preferred contact methods.
            </FormDescription>
            <div className="flex flex-wrap gap-4">
              {contactMethods.map((method) => (
                <FormItem
                  key={method}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(method)}
                      onCheckedChange={(checked) => {
                        const currentValues = field.value || [];
                        if (checked) {
                          field.onChange([...currentValues, method]);
                        } else {
                          field.onChange(
                            currentValues.filter((value) => value !== method)
                          );
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal cursor-pointer">
                    {method}
                  </FormLabel>
                </FormItem>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="contactInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Information</FormLabel>
            <FormControl>
              <Input
                placeholder="Contact info (e.g., phone, email, WhatsApp)"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Provide your contact details based on your selected methods above.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

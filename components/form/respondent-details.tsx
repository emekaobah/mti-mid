"use client";

import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import ReactFlagsSelect from "react-flags-select";
import {
  useOrganizationSubtypes,
  useOrganizationTypes,
} from "@/hooks/api/catalog/use-organization-types";
import { useSectorCount } from "@/hooks/api";

export const tradeDirectionSchema = z.object({
  tradeDirection: z
    .enum(["buy_from_nigeria", "sell_to_nigeria"])
    .refine((val) => val !== undefined, {
      message: "Please select your trade direction",
    }),
});

export const respondentDetailsSchema = z.object({
  // NEW: Trade direction as first question
  tradeDirection: z
    .enum(["buy_from_nigeria", "sell_to_nigeria"])
    .refine((val) => val !== undefined, {
      message: "Please select your trade direction",
    }),
  organizationType: z.string().min(1, "Please select your organization type"),
  otherOrganization: z.string().optional(),
  businessTypes: z
    .array(z.string())
    .max(2, "Please select up to 2 business types")
    .optional(),
});

export type RespondentDetailsType = z.infer<typeof respondentDetailsSchema>;

export default function RespondentDetails() {
  const { control, watch } = useFormContext<RespondentDetailsType>();
  const orgType = watch("organizationType");
  const tradeDirection = watch("tradeDirection");

  const { data: organizationTypes, isLoading } = useOrganizationTypes();
  const { data: organizationSubtypes, isLoading: isSubtypesLoading } =
    useOrganizationSubtypes("ORGTYPE_002");
  console.log("these are organization types", organizationTypes);
  console.log("these are organization subtypes", organizationSubtypes);
  // Find the selected organization type name for display purposes
  const selectedOrgType = organizationTypes?.find((org) => org.id === orgType);
  return (
    <div className="space-y-8">
      {/* NEW: Trade Direction as first question */}

      <FormField
        control={control}
        name="tradeDirection"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base font-medium">
              What is your primary trade interest with Nigeria?{" "}
              <span className="text-red-500">*</span>
            </FormLabel>
            <FormDescription>
              Select the option that best describes your trade relationship with
              Nigeria.
            </FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid gap-3"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="buy_from_nigeria"
                    id="buy_from_nigeria"
                  />
                  <Label
                    htmlFor="buy_from_nigeria"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Buy from Nigeria (Import)
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="sell_to_nigeria"
                    id="sell_to_nigeria"
                  />
                  <Label
                    htmlFor="sell_to_nigeria"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Sell to Nigeria (Export)
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
        name="organizationType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-base font-medium">
              What type of organization are you representing?{" "}
              <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              {isLoading ? (
                <div className="text-sm text-gray-500">
                  Loading organization types...
                </div>
              ) : (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid gap-3"
                >
                  {organizationTypes?.map((orgType) => (
                    <div
                      key={orgType.id}
                      className="flex items-center space-x-3"
                    >
                      <RadioGroupItem value={orgType.id!} id={orgType.id!} />
                      <Label
                        htmlFor={orgType.id!}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {orgType.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedOrgType?.name === "Other (Please Specify)" && (
        <FormField
          control={control}
          name="otherOrganization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please specify your organization type</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter organization type"
                  {...field}
                  className="max-w-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {selectedOrgType?.name === "Business Association" && (
        <FormField
          control={control}
          name="businessTypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                What type of business are you?
              </FormLabel>
              <FormDescription>
                Choose up to 2 business types that best describe your
                organization.
              </FormDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Individual Buyer/Consumer",
                  "SME Owner",
                  "Distributor/Wholesaler",
                  "Supermarket/Retailer",
                  "Large Company/Corporation",
                  "Startup",
                ].map((type) => (
                  <FormItem
                    key={type}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(type)}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || [];
                          if (checked) {
                            if (currentValues.length < 2) {
                              field.onChange([...currentValues, type]);
                            }
                          } else {
                            field.onChange(
                              currentValues.filter((value) => value !== type)
                            );
                          }
                        }}
                        disabled={
                          (field.value?.length ?? 0) >= 2 &&
                          !field.value?.includes(type)
                        }
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal cursor-pointer">
                      {type}
                    </FormLabel>
                  </FormItem>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}

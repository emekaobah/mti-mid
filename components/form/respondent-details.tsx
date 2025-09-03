"use client";

import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
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
import {
  useOrganizationSubtypes,
  useOrganizationTypes,
} from "@/hooks/api/catalog/use-organization-types";

export const tradeDirectionSchema = z.object({
  tradeDirection: z
    .enum(["buy_from_nigeria", "sell_to_nigeria"])
    .refine((val) => val !== undefined, {
      message: "Please select your trade direction",
    }),
});

export const respondentDetailsSchema = z
  .object({
    // NEW: Trade direction as first question
    tradeDirection: z
      .enum(["buy_from_nigeria", "sell_to_nigeria"])
      .refine((val) => val !== undefined, {
        message: "Please select your trade direction",
      }),
    organizationType: z.string().refine((val) => val && val.trim().length > 0, {
      message: "Please select your organization type",
    }),
    otherOrganization: z.string().optional(),
    organizationSubtypes: z
      .array(z.string())
      .max(2, "Please select up to 2 subtypes")
      .optional(),
  })
  .refine((data) => {
    // If organization type has subtypes (and is not "other"), then subtypes are required
    if (data.organizationType && data.organizationType !== "other") {
      // Check if this organization type actually has subtypes available
      // We'll handle this validation in the component since we need access to the API data
      return true; // Let the component handle the validation
    }
    return true;
  });

export type RespondentDetailsType = z.infer<typeof respondentDetailsSchema>;

export default function RespondentDetails() {
  const { control, watch, setValue, trigger, formState } =
    useFormContext<RespondentDetailsType>();
  const orgType = watch("organizationType");
  const tradeDirection = watch("tradeDirection");

  const { data: organizationTypes, isLoading } = useOrganizationTypes();
  const { data: organizationSubtypes, isLoading: isSubtypesLoading } =
    useOrganizationSubtypes(orgType);

  // Find the selected organization type name for display purposes
  const selectedOrgType = organizationTypes?.data?.find(
    (org) => org.id === orgType
  );

  // Clear subtypes when organization type changes (unless it's "other")
  useEffect(() => {
    if (orgType && orgType !== "other") {
      // Don't clear subtypes if the new org type also has subtypes
      const selectedOrg = organizationTypes?.data?.find(
        (org) => org.id === orgType
      );
      if (!selectedOrg?.hasChildren) {
        setValue("organizationSubtypes", []);
      }
    } else if (orgType === "other") {
      // Clear subtypes when switching to "other"
      setValue("organizationSubtypes", []);
    }
  }, [orgType, organizationTypes, setValue]);

  // Custom validation function for subtypes
  const validateSubtypes = async () => {
    if (orgType && organizationTypes?.data) {
      const selectedOrg = organizationTypes.data.find(
        (org) => org.id === orgType
      );
      if (selectedOrg?.hasChildren) {
        // Check if subtypes are selected
        const currentSubtypes = watch("organizationSubtypes");
        if (!currentSubtypes || currentSubtypes.length === 0) {
          // Set a custom error for subtypes
          setValue("organizationSubtypes", [], { shouldValidate: true });
          return false;
        }
      }
    }
    return true;
  };

  // Expose validation function to parent component
  useEffect(() => {
    window.validateSubtypes = validateSubtypes;
  }, [orgType, organizationTypes]);

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
                onValueChange={(value) => {
                  field.onChange(value);
                  // Force re-render of the form
                  setValue(
                    "tradeDirection",
                    value as "buy_from_nigeria" | "sell_to_nigeria",
                    { shouldValidate: false }
                  );
                }}
                value={field.value || ""}
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
                  value={field.value}
                  className="grid gap-3"
                >
                  {organizationTypes?.data?.map((orgType) => (
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

      {selectedOrgType?.hasChildren && (
        <FormField
          control={control}
          name="organizationSubtypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                What type of {selectedOrgType?.name?.toLowerCase()} are you?{" "}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormDescription>
                Choose at least 1 and up to 2 subtypes that best describe your
                organization.
              </FormDescription>
              {isSubtypesLoading ? (
                <div className="text-sm text-gray-500">Loading subtypes...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {organizationSubtypes?.data?.map((subtype) => (
                    <FormItem
                      key={subtype.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(subtype.id!)}
                          onCheckedChange={(checked) => {
                            const currentValues = field.value || [];
                            if (checked) {
                              if (currentValues.length < 2) {
                                field.onChange([...currentValues, subtype.id!]);
                              }
                            } else {
                              field.onChange(
                                currentValues.filter(
                                  (value) => value !== subtype.id!
                                )
                              );
                            }
                          }}
                          disabled={
                            (field.value?.length ?? 0) >= 2 &&
                            !field.value?.includes(subtype.id!)
                          }
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        {subtype.name}
                      </FormLabel>
                    </FormItem>
                  ))}
                </div>
              )}
              <FormMessage />
              {/* Custom validation error for subtypes */}
              {orgType &&
                organizationTypes?.data &&
                (() => {
                  const selectedOrg = organizationTypes.data.find(
                    (org) => org.id === orgType
                  );
                  if (selectedOrg?.hasChildren) {
                    const currentSubtypes = watch("organizationSubtypes");
                    if (!currentSubtypes || currentSubtypes.length === 0) {
                      return (
                        <div className="text-sm font-medium text-destructive">
                          Please select at least one subtype for your
                          organization type
                        </div>
                      );
                    }
                  }
                  return null;
                })()}
            </FormItem>
          )}
        />
      )}
    </div>
  );
}

import { z } from "zod";

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
  organizationType: z
    .string()
    .min(1, "Please select your organization type")
    .refine((val) => val && val.trim().length > 0, {
      message: "Please select your organization type",
    }),
  otherOrganization: z.string().optional(),
  organizationSubtypes: z
    .array(z.string())
    .max(2, "Please select up to 2 subtypes")
    .optional(),
  country: z.string().min(1, "Country is required"),
});

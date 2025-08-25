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
  organizationType: z.enum([
    "Government",
    "Business Association",
    "Cooperative/Farmers Association",
    "Other",
  ]),
  otherOrganization: z.string().optional(),
  businessTypes: z.array(z.string()).optional(),
  country: z.string().min(1, "Country is required"),
});

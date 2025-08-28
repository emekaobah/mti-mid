"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import RespondentDetails, {
  respondentDetailsSchema,
  tradeDirectionSchema,
} from "./respondent-details";
import ImportGoods, { importGoodsSchema } from "./import-goods";
import ImportServices, { importServicesSchema } from "./import-services";
import ExportGoods, { exportGoodsSchema } from "./form/export-goods";
import ExportServices, { exportServicesSchema } from "./form/export-services";
import ContactInfo, { contactInfoSchema } from "./form/contact-info";

const fullFormSchema = z.object({
  ...tradeDirectionSchema.shape,
  ...respondentDetailsSchema.shape,
  ...importGoodsSchema.shape,
  ...importServicesSchema.shape,
  ...exportGoodsSchema.shape,
  ...exportServicesSchema.shape,
  ...contactInfoSchema.shape,
});

type FullFormType = z.infer<typeof fullFormSchema>;

export default function FormWrapper() {
  const methods = useForm<FullFormType>({
    resolver: zodResolver(fullFormSchema),
    defaultValues: {
      tradeDirection: "buy_from_nigeria", // Default to import
      importGoods: [],
      exportGoods: [],
      importServices: [],
      exportServices: [],
    },
  });

  const onSubmit = (data: FullFormType) => {
    console.log("Form submitted:", data);
    // TODO: Send data to backend or API
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-10 max-w-4xl mx-auto p-6"
      >
        <RespondentDetails />
        <ImportGoods />
        <ImportServices />
        <ExportGoods />
        <ExportServices />
        <ContactInfo />

        <div className="pt-6">
          <Button type="submit" className="w-full">
            Submit Form
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

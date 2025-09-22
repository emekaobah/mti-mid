"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Plus, Trash2, Briefcase } from "lucide-react";
import { z } from "zod";
import { useServiceSectors } from "@/hooks/api/catalog/use-service-sectors";

export const importServicesSchema = z.object({
  importServices: z
    .array(
      z.object({
        sector: z.string().min(1, "Service sector is required"),
        otherService: z.string().optional(),
        description: z.string().min(1, "Service description is required"),
      })
    )
    .max(5, "You can only add up to 5 services"),
});

export type ImportServicesType = z.infer<typeof importServicesSchema>;

// Service sectors will be fetched from API

export default function ImportServices() {
  const { control } = useFormContext<ImportServicesType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "importServices",
  });
  const { data: importServices, isLoading: importServicesLoading } =
    useServiceSectors();

  const importServicesData = importServices?.data;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-8">
        <div className="flex items-center space-x-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">
            Services to Import from Nigeria
          </h3>
        </div>
        <FormDescription>
          Tell us about the services your country would like to buy from
          Nigeria. You can add up to 5 services.
        </FormDescription>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border rounded-lg p-6 space-y-6 bg-card"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-base font-medium">Service {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <FormField
              control={control}
              name={`importServices.${index}.sector`}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>Service Sector</FormLabel>
                  <FormDescription>
                    Select the service sector that best describes this service.
                  </FormDescription>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {importServicesLoading || !importServicesData ? (
                      <div className="col-span-full text-center py-4 text-muted-foreground">
                        Loading service sectors...
                      </div>
                    ) : (
                      importServicesData
                        ?.filter(
                          (sector: {
                            id?: string | null;
                            name?: string | null;
                            isActive?: boolean;
                          }) => sector.isActive
                        )
                        .map(
                          (sector: {
                            id?: string | null;
                            name?: string | null;
                            isActive?: boolean;
                          }) => (
                            <FormItem
                              key={sector.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={formField.value === sector.id}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      formField.onChange(sector.id);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer">
                                {sector.name}
                              </FormLabel>
                            </FormItem>
                          )
                        )
                    )}
                  </div>
                  <FormMessage />
                  {importServicesData?.find((s) => s.id === formField.value)
                    ?.name === "Other Service: Tell Us!" && (
                    <div className="mt-3">
                      <FormField
                        control={control}
                        name={`importServices.${index}.otherService`}
                        render={({ field: otherServiceField }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Please specify other service"
                                {...otherServiceField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`importServices.${index}.description`}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>Service Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the specific service you need"
                      {...formField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-8">
            <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-2">
              No services added yet. Click &ldquo;Add Service&rdquo; to get
              started.
            </p>
            <p className="text-sm text-destructive font-medium">
              Please add at least one service to import
            </p>
          </div>
        )}
      </div>

      {fields.length < 5 && (
        <Button
          type="button"
          variant="default"
          onClick={() =>
            append({
              sector: "",
              description: "",
            })
          }
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Service ({fields.length}/5)
        </Button>
      )}
    </div>
  );
}

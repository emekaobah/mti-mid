"use client";

import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Package } from "lucide-react";
import { z } from "zod";
import { useSectors } from "@/hooks/api/catalog/use-sectors";
import { useProductsBySector } from "@/hooks/api/catalog/use-products";
import type { Control, UseFormSetValue } from "react-hook-form";
import type { ProductResponse } from "@/hooks/api/shared/types";

export const exportGoodsSchema = z.object({
  exportGoods: z
    .array(
      z
        .object({
          sector: z.string().min(1, "Sector is required"),
          product: z.string().optional(),
          productId: z.string().optional(),
          hsCode: z.string().optional(),
          quantity: z.string().optional(),
          unit: z.string().optional(),
          frequency: z.enum(["Monthly", "Quarterly", "Annually"]).optional(),
          standards: z.string().optional(),
          authority: z.string().optional(),
          otherProduct: z.string().optional(),
        })
        .refine(
          (data) => {
            // Either product or otherProduct must be provided
            return (
              (data.product && data.product.length > 0) ||
              (data.otherProduct && data.otherProduct.length > 0)
            );
          },
          {
            message: "Product name is required",
            path: ["product"], // This will show the error on the product field
          }
        )
    )
    .max(5, "You can only add up to 5 goods"),
});

export type ExportGoodsType = z.infer<typeof exportGoodsSchema>;

// Type for the ProductField component props
interface ProductFieldProps {
  index: number;
  control: Control<ExportGoodsType>;
  sectorId: string | null;
  setValue: UseFormSetValue<ExportGoodsType>;
}

// Component for handling product selection
function ProductField({
  index,
  control,
  sectorId,
  setValue,
}: ProductFieldProps) {
  const validSectorId = sectorId ? String(sectorId) : "";
  const { data: products, isLoading: isProductsLoading } = useProductsBySector(
    validSectorId as string
  );

  // Check if "Other Goods, Tell Us!" is selected
  const isOtherGoodsTellUs = sectorId === "SECTOR_016";

  return (
    <>
      {isOtherGoodsTellUs ? (
        // Custom input for "Other Goods, Tell Us!" sector
        <FormField
          control={control}
          name={`exportGoods.${index}.otherProduct`}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              <FormControl>
                <Input
                  placeholder="Please describe the product you want to export"
                  {...formField}
                  onChange={(e) => {
                    formField.onChange(e.target.value);
                    // Clear productId and hsCode for custom products
                    setValue(`exportGoods.${index}.productId`, "");
                    setValue(`exportGoods.${index}.hsCode`, "");
                    // Clear the product field to avoid duplication
                    setValue(`exportGoods.${index}.product`, "");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <FormField
          control={control}
          name={`exportGoods.${index}.product`}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              {sectorId ? (
                <Select
                  onValueChange={(value) => {
                    const selectedProduct = (
                      products?.data as ProductResponse[]
                    )?.find((p) => p.id === value);
                    if (selectedProduct) {
                      // Set the product name
                      formField.onChange(selectedProduct.name);
                      // Set the product ID
                      setValue(
                        `exportGoods.${index}.productId`,
                        selectedProduct.id || undefined
                      );
                      // Auto-fill the HS code if available
                      if (selectedProduct.hsCode) {
                        setValue(
                          `exportGoods.${index}.hsCode`,
                          selectedProduct.hsCode
                        );
                      }
                      // Clear otherProduct for standard products
                      setValue(`exportGoods.${index}.otherProduct`, "");
                    } else {
                      formField.onChange(value);
                    }
                  }}
                  defaultValue={formField.value}
                  disabled={isProductsLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isProductsLoading
                            ? "Loading products..."
                            : "Select a product"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isProductsLoading ? (
                      <div className="px-2 py-1.5 text-sm text-muted-foreground">
                        Loading products...
                      </div>
                    ) : products?.data &&
                      Array.isArray(products.data) &&
                      products.data.length > 0 ? (
                      (products.data as ProductResponse[])
                        .filter(
                          (
                            product
                          ): product is ProductResponse & {
                            id: string;
                            name: string;
                          } => Boolean(product.id && product.name)
                        )
                        .map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))
                    ) : (
                      <div className="px-2 py-1.5 text-sm text-muted-foreground">
                        No products available for this sector
                      </div>
                    )}
                  </SelectContent>
                </Select>
              ) : (
                <FormControl>
                  <Input placeholder="Select a sector first" disabled />
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
}

export default function ExportGoods() {
  const { control, setValue } = useFormContext<ExportGoodsType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exportGoods",
  });

  const { data: sectors, isLoading: isSectorsLoading } = useSectors();

  // Watch all sector values to get products for each field
  const watchedSectors = useWatch({
    control,
    name: "exportGoods",
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-8">
        <div className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Goods to Export to Nigeria</h3>
        </div>
        <FormDescription>
          Tell us about the goods your country can sell to Nigeria. You can add
          up to 5 products.
        </FormDescription>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border rounded-lg p-6 space-y-6 bg-card"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-base font-medium">Product {index + 1}</h4>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`exportGoods.${index}.sector`}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>Sector</FormLabel>
                    <Select
                      onValueChange={formField.onChange}
                      defaultValue={formField.value}
                      disabled={isSectorsLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              isSectorsLoading
                                ? "Loading sectors..."
                                : "Select a sector"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isSectorsLoading ? (
                          <SelectItem value="" disabled>
                            Loading sectors...
                          </SelectItem>
                        ) : sectors?.data && sectors?.data?.length > 0 ? (
                          sectors?.data
                            ?.filter((sector) => sector.id && sector.name)
                            .map((sector) => (
                              <SelectItem key={sector.id!} value={sector.id!}>
                                {sector.name!}
                              </SelectItem>
                            ))
                        ) : (
                          <SelectItem value="" disabled>
                            No sectors available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ProductField
                index={index}
                control={control}
                sectorId={watchedSectors?.[index]?.sector || null}
                setValue={setValue}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`exportGoods.${index}.hsCode`}
                render={({ field: formField }) => {
                  const isOtherGoodsTellUs =
                    watchedSectors?.[index]?.sector === "SECTOR_016";

                  return (
                    <FormItem>
                      <FormLabel>
                        {isOtherGoodsTellUs
                          ? "HS Code (Not Required)"
                          : "HS Code (Auto-filled)"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            isOtherGoodsTellUs
                              ? "HS code not required for custom products"
                              : "Will be auto-filled when you select a product"
                          }
                          {...formField}
                          readOnly={
                            isOtherGoodsTellUs ||
                            (!isOtherGoodsTellUs && !!formField.value)
                          }
                          className={
                            isOtherGoodsTellUs
                              ? "bg-muted"
                              : !isOtherGoodsTellUs && formField.value
                              ? "bg-muted"
                              : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={control}
                name={`exportGoods.${index}.quantity`}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>Quantity (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter quantity" {...formField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`exportGoods.${index}.unit`}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>Unit (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., kg, tons, pieces"
                        {...formField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`exportGoods.${index}.frequency`}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>Frequency (Optional)</FormLabel>
                    <Select
                      onValueChange={formField.onChange}
                      defaultValue={formField.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Quarterly">Quarterly</SelectItem>
                        <SelectItem value="Annually">Annually</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`exportGoods.${index}.standards`}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>Standards & Certifications (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe any specific standards, certifications, or quality requirements"
                        {...formField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`exportGoods.${index}.authority`}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>Regulatory Authority (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., FDA, ISO, Local Standards Body"
                        {...formField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-8">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-2">
              No products added yet. Click &ldquo;Add Product&rdquo; to get
              started.
            </p>
            <p className="text-sm text-destructive font-medium">
              Please add at least one good to export
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
              product: "",
              productId: "",
              hsCode: "",
              quantity: "",
              unit: "",
              frequency: undefined,
              standards: "",
              authority: "",
              otherProduct: "",
            })
          }
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Product ({fields.length}/5)
        </Button>
      )}
    </div>
  );
}

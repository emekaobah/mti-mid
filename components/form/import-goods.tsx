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
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Plus, Trash2, Package } from "lucide-react";
import { z } from "zod";
import { useSectors } from "@/hooks/api/catalog/use-sectors";
import { useProductsBySector } from "@/hooks/api/catalog/use-products";
import type { Control, UseFormSetValue } from "react-hook-form";
import type { ProductResponse } from "@/hooks/api/shared/types";

// Type for the ProductField component props
interface ProductFieldProps {
  index: number;
  control: Control<ImportGoodsType>;
  sectorId: string | null;
  setValue: UseFormSetValue<ImportGoodsType>;
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
  console.log("this is the products from import goods", products);
  return (
    <FormField
      control={control}
      name={`importGoods.${index}.product`}
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
                    `importGoods.${index}.productId`,
                    selectedProduct.id || undefined
                  );
                  // Auto-fill the HS code if available
                  if (selectedProduct.hsCode) {
                    setValue(
                      `importGoods.${index}.hsCode`,
                      selectedProduct.hsCode
                    );
                  }
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
  );
}

export const importGoodsSchema = z.object({
  importGoods: z
    .array(
      z.object({
        sector: z.string().min(1, "Sector is required"),
        product: z.string().min(1, "Product is required"),
        productId: z.string().optional(),
        hsCode: z.string().optional(),
        quantity: z.string().optional(),
        unit: z.string().optional(),
        frequency: z.enum(["Monthly", "Quarterly", "Annually"]).optional(),
        standards: z.string().optional(),
        authority: z.string().optional(),
      })
    )
    .max(5, "You can only add up to 5 goods"),
});

export type ImportGoodsType = z.infer<typeof importGoodsSchema>;

export default function ImportGoods() {
  const { control, setValue } = useFormContext<ImportGoodsType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "importGoods",
  });

  const { data: sectors, isLoading: isSectorsLoading } = useSectors();

  // Watch all sector values to get products for each field
  const watchedSectors = useWatch({
    control,
    name: "importGoods",
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-8">
        <div className="flex items-center space-x-2">
          <Package className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">
            Goods to Import from Nigeria
          </h3>
        </div>
        <FormDescription>
          Tell us about the goods your country would like to buy from Nigeria.
          You can add up to 5 products.
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

            <FormField
              control={control}
              name={`importGoods.${index}.sector`}
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
                          .filter((sector) => sector.id && sector.name)
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`importGoods.${index}.hsCode`}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>
                      HS Code (Auto-filled when product is selected)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Will be auto-filled when you select a product"
                        {...formField}
                        readOnly={!!formField.value}
                        className={formField.value ? "bg-muted" : ""}
                      />
                    </FormControl>
                    {formField.value && (
                      <FormDescription>
                        HS Code auto-filled from selected product
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`importGoods.${index}.quantity`}
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
                name={`importGoods.${index}.unit`}
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
                name={`importGoods.${index}.frequency`}
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

            <FormField
              control={control}
              name={`importGoods.${index}.standards`}
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
              name={`importGoods.${index}.authority`}
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
        ))}

        {fields.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>
              No products added yet. Click &ldquo;Add Product&rdquo; to get
              started.
            </p>
          </div>
        )}
      </div>

      {fields.length < 5 && (
        <Button
          type="button"
          variant="outline"
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

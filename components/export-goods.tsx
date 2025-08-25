"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export const exportGoodsSchema = z.object({
  exportGoods: z
    .array(
      z.object({
        sector: z.string().min(1, "Sector is required"),
        product: z.string().min(1, "Product name is required"),
        hsCode: z.string().optional(),
        quantity: z.string().optional(),
        unit: z.string().optional(),
        frequency: z.enum(["Monthly", "Quarterly", "Annually"]).optional(),
      })
    )
    .max(5, "You can only add up to 5 goods"),
});

export type ExportGoodsType = z.infer<typeof exportGoodsSchema>;

const sectors = [
  "Agriculture",
  "Food & Beverage",
  "Minerals & Metals",
  "Chemicals",
  "Textiles & Apparel",
  "Machinery & Electronics",
  "Pharmaceuticals & Medical Supplies",
  "Building Materials",
  "Petrochemicals & Fuels",
  "Paper & Packaging",
  "Furniture & Home Goods",
  "Arts, Crafts & Cultural Products",
  "Automotive & Transport Equipment",
  "Environmental Goods",
  "Sporting Goods & Recreational Equipment",
  "Other Goods: Tell Us!",
];

export default function ExportGoods() {
  const { control } = useFormContext<ExportGoodsType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exportGoods",
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <Package className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Goods to Export to Nigeria</h3>
      </div>
      <FormDescription>
        Tell us about the goods your country can sell to Nigeria. You can add up
        to 5 products.
      </FormDescription>

      {fields.map((field, index) => (
        <div key={field.id} className="border rounded-lg p-6 space-y-6 bg-card">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-medium">Product {index + 1}</h4>
            {fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          <FormField
            control={control}
            name={`exportGoods.${index}.sector`}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>Sector</FormLabel>
                <Select
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sector" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`exportGoods.${index}.product`}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...formField} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name={`exportGoods.${index}.hsCode`}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>HS Code (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter HS Code" {...formField} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
        </div>
      ))}

      {fields.length < 5 && (
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              sector: "",
              product: "",
              hsCode: "",
              quantity: "",
              unit: "",
              frequency: undefined,
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

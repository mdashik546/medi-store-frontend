"use client";
import { medicineAction } from "@/actions/medicine.action";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { medicineService } from "@/services/medicine.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
const medicineSchema = z.object({
  name: z.string().min(2, "Medicine name required"),
  price: z.number().min(1),
  stock: z.number().min(1),
  categoryId: z.string().optional(),
  expiryDate: z.string(),
  imageURL: z.any(),
});

type MedicineInput = z.infer<typeof medicineSchema>;
export const MedicineForm = ({ item }: any) => {
  const form = useForm<MedicineInput>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      name: item?.name || "",
      price: item?.price || 0,
      stock: item?.stock || 0,
      categoryId: item?.categoryId || "",
      expiryDate: item?.expiryDate || "",
      imageURL: item?.imageURL || null,
    },
  });

  const onSubmit = async (value: MedicineInput) => {
    const toastId = toast.loading(item?.id ? "Updating..." : "Creating...");
    try {
      let response;
      if (item?.id) {
        response = await medicineService.updateCompany(item.id, value);
        console.log(response);
      } else {
        response = await medicineAction(value);
      }
      toast.success(response?.message, { id: toastId });
      form.reset();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong!!", {
        id: toastId,
      });
    }
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        {/* Name */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Medicine Name</FieldLabel>
              <Input {...field} placeholder="name" />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Price */}
        <Controller
          name="price"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Price</FieldLabel>
              <Input
                placeholder="0"
                type="number"
                value={field.value || ""}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Stock */}
        <Controller
          name="stock"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Stock</FieldLabel>
              <Input
                type="number"
                placeholder="0"
                value={field.value || ""}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Expiry */}
        {item?.id ? null : (
          <>
            <Controller
              name="expiryDate"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Expiry Date</FieldLabel>
                  <Input type="date" {...field} />
                </Field>
              )}
            />

            {/* imageURL */}
            <Controller
              name="imageURL"
              control={form.control}
              render={({ field }) => {
                const inputRef = useRef<HTMLInputElement>(null);
                useEffect(() => {
                  if (!field.value && inputRef.current) {
                    inputRef.current.value = "";
                  }
                }, [field.value]);

                return (
                  <Field>
                    <FieldLabel>Image</FieldLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      ref={inputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file ? URL.createObjectURL(file) : null);
                      }}
                    />
                  </Field>
                );
              }}
            />
          </>
        )}
      </FieldGroup>

      <DialogFooter className="flex">
        <DialogClose asChild>
          <Button variant="outline" className="w-1/2">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" className="w-1/2">
          {form.formState.isSubmitting ? (
            <Spinner />
          ) : (
            <span>{item?.id ? "Update" : "Add"}</span>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

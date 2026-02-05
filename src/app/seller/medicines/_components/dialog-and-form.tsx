"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { medicineAction } from "@/actions/medicine.action";
import { useEffect, useRef } from "react";
import CompanyForm from "./company-form";

const medicineSchema = z.object({
  name: z.string().min(2, "Medicine name required"),
  price: z.number().min(1),
  stock: z.number().min(1),
  categoryId: z.string().optional(),
  expiryDate: z.string(),
  imageURL: z.any().optional(),
});

type MedicineInput = z.infer<typeof medicineSchema>;

export function MedicineDialog() {
  const form = useForm<MedicineInput>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      categoryId: "",
      expiryDate: "",
      imageURL: null,
    },
  });

  const onSubmit = async (value: MedicineInput) => {
    const toastId = toast.loading("Creating...");
    try {
      const resMedicine = await medicineAction(value);
      toast.success(resMedicine.message, { id: toastId });
      form.reset();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to create medicine", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Product</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Medicine</DialogTitle>
          <DialogDescription>
            Add company first, then medicine info
          </DialogDescription>
        </DialogHeader>
        <CompanyForm />
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
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Expiry */}
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
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="w-1/2">Cancel</Button>
            </DialogClose>

            <Button type="submit" className="w-1/2">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
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
import { medicineService } from "@/services/medicine.service";
import { toast } from "sonner";

/* ---------------- Schema ---------------- */

const medicineSchema = z.object({
  companyName: z.string().min(2, "Company name required"),
  name: z.string().min(2, "Medicine name required"),
  price: z.number().min(1),
  stock: z.number().min(1),
  categoryId: z.string().optional(),
  expiryDate: z.string(),
  image: z.any().optional(),
});

type MedicineInput = z.infer<typeof medicineSchema>;

/* ---------------- Component ---------------- */

export function MedicineDialog() {
  const [companyAdded, setCompanyAdded] = useState(false);

  const form = useForm<MedicineInput>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      companyName: "",
      name: "",
      price: 0,
      stock: 0,
      categoryId: "",
      expiryDate: "",
      image: undefined,
    },
  });

  const handleCompanyAdd = async () => {
    const companyName = form.getValues("companyName")?.trim();
    if (!companyName) return;

    const toastId = toast.loading("Creating company...");

    try {
      const resCompany = await medicineService.createCompany({
        name: companyName,
      });

      toast.success("Company created successfully!", { id: toastId });
console.log(resCompany);
      setCompanyAdded(true);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to create company", {
        id: toastId,
      });
    }
  };

  const onSubmit = async (value: MedicineInput) => {
    const toastId = toast.loading("Creating...");
    try {
      const resCompany = await medicineService.createCompany({
        name: value.companyName,
      });

      const resMedicine = await medicineService.createMedicine(value);

      toast.success(resCompany.message || resMedicine.message, { id: toastId });

      form.reset();
      setCompanyAdded(false);

      console.log("Company:", resCompany, "Medicine:", resMedicine);
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

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            {!companyAdded && (
              <Controller
                name="companyName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Company Name</FieldLabel>
                    <Input {...field} placeholder="Enter company name" />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}

                    <Button
                      type="button"
                      className="mt-2 w-full"
                      onClick={handleCompanyAdd}
                    >
                      Add Company
                    </Button>
                  </Field>
                )}
              />
            )}

            {companyAdded && (
              <>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Company: {form.watch("companyName")}
                  </p>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setCompanyAdded(false)}
                  >
                    Change
                  </Button>
                </div>

                {/* Name */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Medicine Name</FieldLabel>
                      <Input {...field} />
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

                {/* Image */}
                <Controller
                  name="image"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Image</FieldLabel>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </Field>
                  )}
                />
              </>
            )}
          </FieldGroup>

          {companyAdded && (
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button type="submit">Add Medicine</Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

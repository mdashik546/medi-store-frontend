import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
const medicineSchema = z.object({
  categoryName: z.string().min(2, "Category name required"),
});

type MedicineInput = z.infer<typeof medicineSchema>;
const CategoryForm = () => {
  const [categoryAdded, setCategoryAdded] = useState(false);
  const form = useForm<MedicineInput>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      categoryName: "",
    },
  });

  const onSubmit = async (value: MedicineInput) => {
    const categoryName = form.getValues("categoryName")?.trim();
    if (!categoryName) return;
    const toastId = toast.loading("Creating category...");
    try {
      const res = await medicineService.createCategory(value);
      toast.success(res.message, { id: toastId });
      setCategoryAdded(true);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to create category", {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          {!categoryAdded && (
            <Controller
              name="categoryName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Category Name</FieldLabel>
                  <Input {...field} placeholder="Enter category name" />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}

                  <Button type="submit" className="mt-2 w-full">
                    {form.formState.isSubmitting ? <Spinner /> : "Add Category"}
                  </Button>
                </Field>
              )}
            />
          )}

          {categoryAdded && (
            <>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Category: {form.watch("categoryName")}
                </p>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setCategoryAdded(false)}
                >
                  Change
                </Button>
              </div>
            </>
          )}
        </FieldGroup>
      </form>
    </div>
  );
};

export default CategoryForm;

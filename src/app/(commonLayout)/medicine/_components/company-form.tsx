import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { medicineService } from "@/services/medicine.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
const medicineSchema = z.object({
  companyName: z.string().min(2, "Company name required"),
});

type MedicineInput = z.infer<typeof medicineSchema>;
const CompanyForm = () => {
  const [companyAdded, setCompanyAdded] = useState(false);
  const form = useForm<MedicineInput>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      companyName: "",
    },
  });

  const onSubmit = async (value: MedicineInput) => {
    const companyName = form.getValues("companyName")?.trim();
    if (!companyName) return;
    const toastId = toast.loading("Creating company...");
    try {
      const resCompany = await medicineService.createCompany(value);

      toast.success(resCompany.message, { id: toastId });
      setCompanyAdded(true);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to create company", {
        id: toastId,
      });
    }
  };

  return (
    <div>
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

                  <Button type="submit" className="mt-2 w-full">
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
            </>
          )}
        </FieldGroup>
      </form>
    </div>
  );
};

export default CompanyForm;

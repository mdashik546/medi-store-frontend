"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { orderService } from "@/services/order.service";
const checkoutSchema = z.object({
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address too long"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;
const CheckoutForm = () => {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      address: "",
    },
  });
  const onSubmit = async (value: CheckoutFormValues) => {
    const toastId = toast.loading("Ordering...");
    try {
      const res = await orderService.createOrder(value);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
        return;
      }
      form.reset();
      toast.success(res?.message, { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Internal Server Error", { id: toastId });
    }
  };
  return (
    <div className="max-w-sm mx-auto">
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Shipping Address</CardTitle>
        </CardHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <CardContent>
            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Address</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Enter your full delivery address"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full">
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CheckoutForm;

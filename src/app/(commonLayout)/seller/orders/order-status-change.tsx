"use client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { OrderStatus, orderStatus } from "@/types/order-status";
import { sellerAction } from "@/actions/seller.action";
import { Spinner } from "@/components/ui/spinner";
const allowedNextStatus: Record<OrderStatus, OrderStatus[]> = {
  PLACED: ["PROCESSING"],
  PROCESSING: ["SHIPPED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};
const statusSchema = z.object({
  status: z.enum(orderStatus),
});

type StatusForm = z.infer<typeof statusSchema>;
type Order = {
  id: string;
  orderStatus: OrderStatus;
};
export default function OrderStatusChange({ order }: { order: Order }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<StatusForm>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      status: order.orderStatus,
    },
  });

  const handleChange = (newStatus: StatusForm["status"]) => {
    const previousStatus = form.getValues("status");

    startTransition(async () => {
      const toastId = toast.loading("Updating status...");
      try {
        const res = await sellerAction(order?.id, newStatus);
        console.log(res);

        toast.success(res?.message || "Status updated", {
          id: toastId,
        });
      } catch (error) {
        form.setValue("status", previousStatus);
        toast.error("Failed to update status", {
          id: toastId,
        });
      }
    });
  };
  const currentStatus = form.getValues("status") || order?.orderStatus;

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-36">
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value: OrderStatus) => {
                    field.onChange(value);
                    handleChange(value);
                  }}
                  disabled={isPending}
                >
                  <SelectTrigger className="w-full">
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <Spinner className="text-blue-500" /> Loading...
                      </div>
                    ) : (
                      <SelectValue />
                    )}
                  </SelectTrigger>

                  <SelectContent>
                    {orderStatus?.map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        disabled={
                          status === "PLACED" ||
                          status === "CANCELLED" ||
                          !allowedNextStatus[currentStatus]?.includes(status)
                        }
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

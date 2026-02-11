"use client";
import { cancelOrderAction, reOrderAction } from "@/actions/order.action";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const OrderCancelAndReorder = ({ order }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleCancel = async () => {
    const toastId = toast.loading("Cancelling order...");
    try {
      setLoading(true);
      const res = await cancelOrderAction(order?.id);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
        return;
      }
      toast.success(res?.message, { id: toastId });
    } catch (error) {
      toast.error("Internal Server Error", { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  const handleReorder = async () => {
    const toastId = toast.loading("Reordering...");
    try {
      setLoading(true);
      const res = await reOrderAction(order?.id);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
        return;
      }

      toast.success(res?.message, { id: toastId });
      router.push(`/orders`);
    } catch (error) {
      toast.error("Internal Server Error", { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {order?.orderStatus === "PROCESSING" ||
      order?.orderStatus === "SHIPPED" ||
      order?.orderStatus === "DELIVERED" ? null : (
        <div className="flex gap-2">
          {order.orderStatus !== "CANCELLED" && (
            <Button disabled={loading} size="sm" onClick={handleCancel}>
              {loading ? <Spinner /> : "Cancel Order"}
            </Button>
          )}

          {order.orderStatus === "CANCELLED" && (
            <Button disabled={loading} size="sm" onClick={handleReorder}>
              {loading ? <Spinner /> : "Reorder"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderCancelAndReorder;

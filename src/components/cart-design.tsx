"use client";
import { Delete } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { allDeleteCartAction, deleteCartAction } from "@/actions/cart.action";

const CartDesign = ({ cartItems }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDeleteCart = async (id: string) => {
    const toastId = toast.loading("Deleting...");
    try {
      setLoadingId(id);
      const res = await deleteCartAction(id);
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
        return;
      }
      toast.success(res?.message, { id: toastId });
      setLoadingId(null);
    } catch (error) {
      toast.error("Internal Server Error", { id: toastId });
    }
  };

  const handleDeleteAllCart = async () => {
    const toastId = toast.loading("All deleting...");
    try {
      setLoading(true);
      const res = await allDeleteCartAction();
      if (!res.success) {
        toast.error(res?.message, { id: toastId });
        return;
      }
      toast.success(res?.message, { id: toastId });
      setLoading(false);
    } catch (error) {
      toast.error("Internal Server Error", { id: toastId });
    }
  };

  return (
    <div className="p-4 bg-white">
      {/* 1. Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">All Carts</h2>
          <p className="text-sm text-muted-foreground">
            {cartItems?.length || 0} items
          </p>
        </div>
        <Button
          disabled={cartItems?.length === 0}
          variant={"destructive"}
          size="sm"
          onClick={handleDeleteAllCart}
        >
          {loading ? <Spinner /> : "Clear All"}
        </Button>
      </div>

      {/* 2. Cart Items */}
      <div className="space-y-4">
        {cartItems?.map((item: any) => {
          const subtotal = item.quantity * item.medicine.price;
          const isLoading = loadingId === item.id;

          return (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{item.medicine.name}</p>
                <p className="text-sm text-muted-foreground">
                  Price: ৳{item.medicine.price} | Qty: {item.quantity}
                </p>
              </div>

              <div className="flex flex-col items-end ">
                <p className="font-semibold mb-1">৳{subtotal}</p>
                <Button
                  onClick={() => handleDeleteCart(item?.id)}
                  variant="destructive"
                  size="icon"
                  className="size-7"
                >
                  {isLoading ? <Spinner /> : <Delete />}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Divider */}
      <div className="border-t mt-4 pt-4 flex justify-between items-center">
        <span className="font-semibold">Total</span>
        <span className="font-bold text-primary">
          ৳
          {cartItems?.reduce(
            (sum: number, item: any) =>
              sum + item.quantity * item.medicine.price,
            0,
          )}
        </span>
      </div>
    </div>
  );
};

export default CartDesign;

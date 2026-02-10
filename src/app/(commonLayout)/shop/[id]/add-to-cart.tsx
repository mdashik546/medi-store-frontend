"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { toast } from "sonner";
import { addToCartAction } from "@/actions/cart.action";
import CartDesign from "@/components/cart-design";

const AddToCart = ({ session, medicine, cartItems, singleCartDelete }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleAddToCart = async () => {
    const toastId = toast.loading("Cart Adding...");
    try {
      setLoading(true);
      const res = await addToCartAction(medicine?.id);
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
    <Sheet>
      <SheetTrigger asChild>
        {!session?.user ? (
          <Button onClick={() => router.push("/login")}>Add To Cart</Button>
        ) : (
          <Button disabled={loading} onClick={handleAddToCart}>
            {loading ? "Adding..." : "Add to Cart"}
          </Button>
        )}
      </SheetTrigger>
      {session?.user && (
        <SheetContent>
          <SheetHeader>
            <CartDesign cartItems={cartItems?.data} medicineId={medicine?.id} />
          </SheetHeader>

          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default AddToCart;

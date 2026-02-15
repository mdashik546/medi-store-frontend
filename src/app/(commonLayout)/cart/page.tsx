import CartDesign from "@/components/cart-design";
import { cartService } from "@/services/cart.service";
export const dynamic = "force-dynamic";

const Page = async () => {
  const cartItems = await cartService.getAllCart();

  return <CartDesign cartItems={cartItems?.data} />;
};

export default Page;

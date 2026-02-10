import { fetcher } from "@/lib/fetcher";
import MedicineDetails from "./medicine-details";
import { userService } from "@/services/user.service";
import { cartService } from "@/services/cart.service";

const DetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data: medicine } = await fetcher(`/seller/medicines/${id}`);
  const session = await userService.getSession();
  const cartItems = await cartService.getAllCart();

  return (
    <div>
      <MedicineDetails
        medicine={medicine}
        session={session}
        cartItems={cartItems}
      />
    </div>
  );
};

export default DetailsPage;

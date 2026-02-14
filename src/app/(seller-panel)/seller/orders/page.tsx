import { fetcher } from "@/lib/fetcher";
import SellerOrders from "./seller-orders-table";

const OrderPage = async () => {
  const { data } = await fetcher(`/seller/orders`, { tags: ["sellerOrder"] });
  return <SellerOrders ordersData={data} />;
};

export default OrderPage;

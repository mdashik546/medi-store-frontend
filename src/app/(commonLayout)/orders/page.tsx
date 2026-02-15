import { orderService } from "@/services/order.service";
import { OrdersList } from "./order-list";
export const dynamic = "force-dynamic";

const Page = async () => {
  const { data } = await orderService.getAllOrder();
  return <OrdersList orders={data} />;
};

export default Page;

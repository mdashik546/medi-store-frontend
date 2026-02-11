import { orderService } from "@/services/order.service";
import { OrdersList } from "./order-list";

const Page = async () => {
  const { data } = await orderService.getAllOrder();
  return <OrdersList orders={data} />;
};

export default Page;

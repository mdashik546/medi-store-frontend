import { fetcher } from "@/lib/fetcher";
import { OrderView } from "./order-view";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data } = await fetcher(`/orders/${id}`, { tags: ["orders"] });
  return <OrderView order={data} />;
};

export default Page;

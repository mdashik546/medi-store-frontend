"use server"
import { fetcher } from "@/lib/fetcher";
import { OrderStatus } from "@/types/order-status";
import { revalidateTag } from "next/cache";

export async function sellerAction(id: string, status: OrderStatus) {
  const res = await fetcher(`/seller/orders/${id}`, {
    method: "PATCH",
    body: { orderStatus: status },
  });
  revalidateTag("sellerOrder","max")
  return res;
}

"use server";
import { revalidateTag } from "next/cache";
import { fetcher } from "@/lib/fetcher";

export async function cancelOrderAction(id: string) {
  const res = await fetcher(`/orders/${id}`, { method: "PATCH" });
  revalidateTag("orders", "max");
  return res;
}

export async function reOrderAction(id: string) {
  const res = await fetcher(`/orders/${id}/reorder`, { method: "POST" });
  revalidateTag("orders", "max");
  return res;
}

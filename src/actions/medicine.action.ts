"use server";
import { fetcher } from "@/lib/fetcher";
import { revalidateTag } from "next/cache";

export async function medicineAction(value: any) {
  const res = await fetcher(`/seller/medicines`, {
    method: "POST",
    body: value,
  });
  revalidateTag("medicine", "max");
  return res;
}

"use server";
import { fetcher } from "@/lib/fetcher";
import { revalidateTag } from "next/cache";

export async function addMedicineAction(value: any) {
  const res = await fetcher(`/seller/medicines`, {
    method: "POST",
    body: value,
  });
  revalidateTag("medicine", "max");
  return res;
}
export async function updateMedicineAction(id: string, value: any) {
  const res = await fetcher(`/seller/medicines/${id}`, {
    method: "PATCH",
    body: value,
  });
  revalidateTag("medicine", "max");
  return await res;
}

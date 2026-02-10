"use server";
import { fetcher } from "@/lib/fetcher";
import { revalidateTag } from "next/cache";

export async function addToCartAction(id: string) {
  const res = await fetcher(`/carts/${id}`, {
    method: "POST",
  });
  revalidateTag("carts", "max");
  return res;
}

export async function deleteCartAction(id: string) {
  const res = await fetcher(`/carts/${id}`, {
    method: "DELETE",
  });
  revalidateTag("carts", "max");
  return res;
}

export async function allDeleteCartAction() {
  const res = await fetcher(`/carts/`, {
    method: "DELETE",
  });
  revalidateTag("carts", "max");
  return res;
}

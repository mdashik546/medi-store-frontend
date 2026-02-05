"use server";
import { fetcher } from "@/lib/fetcher";
import { revalidateTag } from "next/cache";

export async function deleteAction(api: string, tag: string) {
  const res = await fetcher(api, { method: "DELETE" });
  revalidateTag(tag, "max");
  return res;
}

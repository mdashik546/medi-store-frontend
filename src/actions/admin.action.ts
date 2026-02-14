"use server"
import { UserStatus } from "@/app/(admin-panel)/admin/users/user-staus-update";
import { fetcher } from "@/lib/fetcher";
import { revalidateTag } from "next/cache";

export const updateStatusAction = async (id: string, status: UserStatus) => {
  const res = await fetcher(`/admin/users/${id}`, {
    method: "PATCH",
    body: { status },
  });
  revalidateTag("allUserStaus", "max");
  return res;
};

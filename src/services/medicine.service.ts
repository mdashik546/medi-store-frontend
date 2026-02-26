import { fetcher } from "@/lib/fetcher";

export const medicineService = {
  createCategory: async function (value: any) {
    const res = await fetcher(`/seller/categories`, {
      method: "POST",
      body: value,
    });

    return await res;
  },
};

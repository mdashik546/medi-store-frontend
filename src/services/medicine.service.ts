import { fetcher } from "@/lib/fetcher";

export const medicineService = {
  createCompany: async function (value: any) {
    const res = await fetcher(`/seller/company`, {
      method: "POST",
      body: value,
    });

    return await res;
  },
};

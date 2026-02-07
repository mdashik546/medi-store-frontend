import { fetcher } from "@/lib/fetcher";

export const medicineService = {
  createCompany: async function (value: any) {
    const res = await fetcher(`/seller/company`, {
      method: "POST",
      body: value,
    });

    return await res;
  },
  updateCompany: async function (id: string, value: any) {
    const res = await fetcher(`/seller/medicines/${id}`, {
      method: "PATCH",
      body: value,
    });

    return await res;
  },
};

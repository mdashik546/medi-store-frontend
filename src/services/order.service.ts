import { fetcher } from "@/lib/fetcher";

export const orderService = {
  createOrder: async function (value: any) {
    const res = await fetcher(`/orders`, {
      method: "POST",
      body: value,
    });
    return res;
  },
  getAllOrder: async function () {
    const res = await fetcher(`/orders`);
    return res;
  },
  cancelOrder: async function (id: string) {
    const res = await fetcher(`/orders/${id}`, { method: "PATCH" });
    return res;
  },
  reOrder: async function (id: string) {
    const res = await fetcher(`/orders/${id}/reorder`, { method: "POST" });
    return res;
  },
};

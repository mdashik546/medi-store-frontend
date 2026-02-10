import { fetcher } from "@/lib/fetcher";

export const cartService = {
  getAllCart: async function () {
    const res = await fetcher("/carts", { tags: ["carts"] });
    return await res;
  },
};

import { fetcher } from "@/lib/fetcher";

export const getAllCategoryMedicine = async () => {
  const res = await fetcher("/admin/users/categories");
  return res;
};

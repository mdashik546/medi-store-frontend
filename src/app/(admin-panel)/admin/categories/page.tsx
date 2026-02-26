import { getAllCategoryMedicine } from "@/services/category-medicine.service";
import { CategoryMedicineTable } from "./category-medicine-table";
export const dynamic = "force-dynamic";
const Page = async () => {
  const { data } = await getAllCategoryMedicine();
  return <CategoryMedicineTable data={data} />;
};

export default Page;

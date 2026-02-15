import { fetcher } from "@/lib/fetcher";
import MedicineTable from "./_components/medicine-table";
export const dynamic = "force-dynamic";
const Page = async () => {
  const { data } = await fetcher("/seller/medicines", { tags: ["medicine"] });
  return <MedicineTable data={data} />;
};

export default Page;

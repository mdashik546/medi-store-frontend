import { fetcher } from "@/lib/fetcher";
import MedicineDetails from "./medicine-details";

const DetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const {data} = await fetcher(`/seller/medicines/${id}`);
  return (
    <div>
      <MedicineDetails medicine={data} />
    </div>
  );
};

export default DetailsPage;

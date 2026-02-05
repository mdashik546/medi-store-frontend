import { fetcher } from "@/lib/fetcher";
import { MedicineCard } from "./medicine-card";
import { Medicine } from "@/types/medicine";

const ShopPage = async () => {
  const medicines = await fetcher("/seller/medicines");
  return (
    <div className="grid grid-cols-3 gap-5">
      {medicines?.data?.map((medicine: Medicine) => (
        <MedicineCard medicine={medicine} key={medicine?.id} />
      ))}
    </div>
  );
};

export default ShopPage;

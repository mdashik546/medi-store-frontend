import { fetcher } from "@/lib/fetcher";
import { MedicineCard } from "./medicine-card";
import { Medicine } from "@/types/medicine";

const ShopPage = async () => {
  const medicines = await fetcher("/seller/medicines");

  return (
    <div className="my-16">
      <h2 className="lg:text-3xl sm:text-xl text-lg font-bold">Featured Medicines</h2>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5">
        {medicines?.data?.length > 0 ? (
          <>
            {medicines?.data?.map((medicine: Medicine) => (
              <MedicineCard medicine={medicine} key={medicine?.id} />
            ))}
          </>
        ) : (
          <span className="col-span-3 text-center">Not Found</span>
        )}
      </div>
    </div>
  );
};

export default ShopPage;

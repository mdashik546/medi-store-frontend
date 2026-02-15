import { fetcher } from "@/lib/fetcher";
import LatestOrder from "./_components/latest-order";
// import StatsCard from "./_components/stats-card";
export const dynamic = "force-dynamic";

const Page = async () => {
  const { data } = await fetcher(`/seller/orders`, { tags: ["sellerOrder"] });
  return (
    <div>
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Overview of your orders and performance metrics
          </p>
        </div>
      </div>
      {/* <StatsCard /> */}
      <LatestOrder orderData={data} />
    </div>
  );
};

export default Page;

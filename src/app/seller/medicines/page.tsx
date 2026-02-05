import { fetcher } from "@/lib/fetcher";
import Medicine from "./_components/medicine";

const Page = async () => {
  const { data } = await fetcher("/seller/medicines", { tags: ["medicine"] });
  return <Medicine data={data} />;
};

export default Page;

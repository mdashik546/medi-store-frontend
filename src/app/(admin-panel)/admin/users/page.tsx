import { fetcher } from "@/lib/fetcher";
import UserTable from "./user-table";
export const dynamic = "force-dynamic";

const Page = async () => {
  const { data } = await fetcher("/admin/users", { tags: ["allUserStatus"] });
  return <UserTable data={data} />;
};

export default Page;

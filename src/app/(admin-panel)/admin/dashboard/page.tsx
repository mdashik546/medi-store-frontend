import { fetcher } from "@/lib/fetcher";
import AdminDashboar from "./admin-dashboar";

export default async function AdminPage() {
  const { data } = await fetcher("/admin/users");
  const orderData = await fetcher("/admin/users/orders");
  return <AdminDashboar data={data} orderData={orderData?.data} />;
}

import { Order } from "@/app/(seller-panel)/seller/orders/seller-orders-table";
import { getStatusColor } from "@/components/get-status-color";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboar = ({
  data,
  orderData,
}: {
  data: any;
  orderData: Order[];
}) => {
    console.log(orderData);
  return (
    <div className="lg:px-0 px-4">
      <h1 className="text-2xl font-semibold mb-6 mt-2">Dashboard</h1>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Total Users</p>
          <p className="text-xl font-bold">{data?.length}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <p className="text-xl font-bold">{orderData?.length}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Revenue</p>
          <p className="text-xl font-bold">
            ৳
            {orderData?.reduce((sum: number, item: any) => sum + item.total, 0)}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="mb-4 font-medium">Recent Orders</h2>

        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>address</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orderData?.slice(0, 8)?.map((order, index) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {orderData.length - index}
                  </TableCell>

                  <TableCell>{order?.author?.name}</TableCell>

                  <TableCell>৳ {order.total}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.orderStatus,
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </TableCell>
                  <TableCell> {order.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboar;

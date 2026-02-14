import { OrderStatus } from "@/types/order-status";
import OrderStatusChange from "./order-status-change";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Author = {
  id: string;
  name: string;
  email: string;
};

type Order = {
  id: string;
  authorId: string;
  total: number;
  paymentStatus: string;
  orderStatus:OrderStatus;
  address: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
};

export default function SellerOrders({ ordersData }: { ordersData: Order[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PLACED":
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      case "PROCESSING":
        return "bg-blue-100 text-blue-700";

      case "SHIPPED":
        return "bg-purple-100 text-purple-700";

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Seller Orders</h1>
      <div className="rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {ordersData?.map((order: Order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>

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

                <TableCell className="text-right">
                  <OrderStatusChange order={order} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

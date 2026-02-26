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
import { getStatusColor } from "@/components/get-status-color";

export type Author = {
  id: string;
  name: string;
  email: string;
};

export type Order = {
  id: string;
  authorId: string;
  total: number;
  paymentStatus: string;
  orderStatus: OrderStatus;
  address: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
};

export default function SellerOrders({ ordersData }: { ordersData: Order[] }) {
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
              <TableHead>address</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {ordersData?.length === undefined || ordersData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No orders available
                </TableCell>
              </TableRow>
            ) : (
              <>
                {ordersData?.map((order, index) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {ordersData.length - index}
                    </TableCell>

                    <TableCell>{order?.author?.name}</TableCell>

                    <TableCell>৳ {order.total}</TableCell>
                    <TableCell>৳ {order.address}</TableCell>

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
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

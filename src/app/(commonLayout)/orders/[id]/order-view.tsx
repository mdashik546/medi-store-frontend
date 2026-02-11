import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import OrderCancelAndReorder from "./order-cancel-and-reorder";

type OrderItem = {
  id: string;
  medicineName: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  address: string;
  total: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  items: OrderItem[];
};

interface OrderViewProps {
  order: Order;
}

export function OrderView({ order }: OrderViewProps) {
  return (
    <div className="max-w-3xl mx-auto mt-6">
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Order #{order.id.substring(0, 6).toUpperCase()}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Placed on: {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span
              className={`px-2 py-1 text-xs rounded-full font-medium ${
                order.orderStatus === "PLACED"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {order.orderStatus}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded-full font-medium ${
                order.paymentStatus === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {order.paymentStatus}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 mt-2">
          <div>
            <h3 className="font-semibold text-sm">Shipping Address</h3>
            <p className="text-gray-700">{order.address}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-2">Items</h3>
            <div className="space-y-2 border-t border-b py-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.medicineName} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-right font-semibold text-lg">
            Total: ${order.total.toFixed(2)}
          </p>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 flex-wrap">
          <OrderCancelAndReorder order={order} />
        </CardFooter>
      </Card>
    </div>
  );
}

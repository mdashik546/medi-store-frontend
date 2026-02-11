"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type OrderSummary = {
  id: string;
  total: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
};

interface OrderListProps {
  orders: OrderSummary[];
}

export function OrdersList({ orders }: OrderListProps) {
  return (
    <div className="space-y-4 max-w-3xl mx-auto mt-6">
      {orders.map((order) => (
        <Card key={order.id} className="rounded-2xl shadow-sm">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold">
              Order #{order.id.substring(0, 6).toUpperCase()}
            </CardTitle>
            <div className="flex gap-2 flex-wrap">
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${
                  order.orderStatus === "PLACED" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                }`}
              >
                {order.orderStatus}
              </span>
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${
                  order.paymentStatus === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>
          </CardHeader>

          <CardContent className="flex justify-between text-sm mt-2">
            <p>Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="font-semibold">Total: {order.total.toFixed(2)} TK</p>
          </CardContent>

         <CardFooter className="flex justify-end">
            <Button asChild variant="outline" size="sm">
              <Link href={`/orders/${order?.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

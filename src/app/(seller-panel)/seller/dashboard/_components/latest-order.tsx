import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStatusColor } from "@/components/get-status-color";
import { Order } from "../../orders/seller-orders-table";

const LatestOrder = ({ orderData }: { orderData: Order[] }) => {
  return (
    <div>
      <Card className="bg-card border-border">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="text-lg md:text-xl">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="text-foreground font-semibold">
                    Order ID
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    Customer
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    Amount
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderData?.length === undefined || orderData?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center py-6 text-gray-500"
                    >
                      No data found
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {orderData?.slice(0, 8)?.map((order, index) => (
                      <TableRow
                        key={order.id}
                        className="border-b border-border hover:bg-muted/30 transition-colors"
                      >
                        <TableCell className="font-semibold text-foreground">
                          {orderData.length - index}
                        </TableCell>
                        <TableCell className="text-foreground">
                          {order.author?.name}
                        </TableCell>
                        <TableCell className="text-foreground">
                          ৳ {order.total}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.orderStatus,
                            )}`}
                          >
                            {order.orderStatus}
                          </span>
                        </TableCell>
                        <TableCell className="text-foreground">
                          {order.updatedAt}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden divide-y divide-border">
            {orderData?.slice(0, 8)?.map((order, index) => (
              <div key={order.id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-foreground">
                      Id: {orderData.length - index}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.author?.name}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.orderStatus,
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                  <p className="text-foreground font-semibold">
                    ৳ {order.total}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LatestOrder;

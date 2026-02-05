import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { MedicineDialog } from "./dialog-and-form";
import { MedicineActions } from "./medicine-actions";

export default function Medicine({ data }: { data: any }) {
  console.log(data);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Inventory</h2>
        <MedicineDialog />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>All Medicines</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-48">Expiry Date</TableHead>
                <TableHead className="space-x-3 text-center w-64">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.length > 0 ? (
                <>
                  {data?.map((item: any) => (
                    <TableRow key={item.id}>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>
                        {item.description ? (
                          <span>{item.description}</span>
                        ) : (
                          <span>-</span>
                        )}
                      </TableCell>
                      <TableCell>{item?.stock}</TableCell>
                      <TableCell>{item?.status}</TableCell>
                      <TableCell>{item?.expiryDate}</TableCell>
                      <TableCell className="space-x-3 text-center">
                        <MedicineActions id={item?.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-6 text-gray-500"
                  >
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

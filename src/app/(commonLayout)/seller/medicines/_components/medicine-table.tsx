import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { MedicineDialog } from "./add-dialog";
import { EditAndDeleteDialog } from "./edit-and-delete-dialog";
import Image from "next/image";

export default function MedicineTable({ data }: { data: any }) {
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
          {/* Horizontal scroll for small screens */}
          <div className="overflow-x-auto">
            <Table className="table-auto w-full ">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="max-w-50">Description</TableHead>
                  <TableHead className="hidden md:table-cell">Stock</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Expiry Date
                  </TableHead>
                  <TableHead className="w-48 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data && data?.length > 0 ? (
                  data?.map((item: any, index: number) => (
                    <TableRow key={item.id}>
                      <TableCell className="w-12">
                        {data.length - index}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        {item.imageURL ? (
                          <Image
                            src={item.imageURL}
                            alt={item.name}
                            width={40}
                            height={40}
                          />
                        ) : (
                          <span>-</span>
                        )}
                      </TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell className="whitespace-normal wrap-break-words max-w-50">
                        {item.description || "-"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.stock}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.status}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {item.expiryDate || "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        <EditAndDeleteDialog item={item} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center py-6 text-gray-500"
                    >
                      No data found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

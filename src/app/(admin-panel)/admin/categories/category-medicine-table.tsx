import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Medicine {
  id: string;
  name: string;
  price: number;
  stock: number;
  expiryDate: string;
  status: string;
}

interface Category {
  id: string;
  categoryName: string;
  medicines: Medicine[];
}

interface Props {
  data: Category[];
}

export const CategoryMedicineTable = ({ data }: Props) => {
  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-xl font-bold"> Medicine Inventory</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Medicine Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((category) =>
            category.medicines.map((med) => (
              <TableRow key={med.id}>
                <TableCell>
                  <Badge variant="secondary">{category.categoryName}</Badge>
                </TableCell>
                <TableCell>{med.name}</TableCell>
                <TableCell>${med.price}</TableCell>
                <TableCell>{med.stock}</TableCell>
                <TableCell>
                  {new Date(med.expiryDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      med.status === "ACTIVE" ? "default" : "destructive"
                    }
                  >
                    {med.status}
                  </Badge>
                </TableCell>
              </TableRow>
            )),
          )}
        </TableBody>
      </Table>
    </div>
  );
};

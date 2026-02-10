import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Medicine } from "@/types/medicine";
import Link from "next/link";

export function MedicineCard({ medicine }: { medicine: Medicine }) {
  return (
    <Card className="hover:shadow-md transition p-0 mt-8">
      <CardHeader className="p-0">
        <img
          src={medicine.imageURL || "https://avatar.vercel.sh/shadcn"}
          alt={medicine.name || ""}
          className="h-48 w-full object-cover rounded-t-md"
        />
      </CardHeader>

      <CardContent className="pt-4 space-y-2">
        <CardTitle className="text-lg line-clamp-1">{medicine.name}</CardTitle>

        <p className="text-xl font-semibold">৳ {medicine.price}</p>

        <div className="flex items-center gap-2">
          <Badge variant={medicine.stock > 0 ? "default" : "destructive"}>
            {medicine.stock > 0 ? "In Stock" : "Out of Stock"}
          </Badge>

          <Badge variant="secondary">{medicine.status}</Badge>
        </div>
      </CardContent>

      <CardFooter className="mb-5">
        <Button className="w-full" asChild>
          <Link href={`/shop/${medicine?.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

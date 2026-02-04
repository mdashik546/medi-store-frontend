import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Medicine } from "@/types/medicine";
import Image from "next/image";

const MedicineDetails = ({ medicine }: { medicine: Medicine }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <Card>
          <CardContent className="px-6">
            <Image
              src={medicine.imageURL || "https://avatar.vercel.sh/shadcn"}
              alt={medicine.name}
              width={490}
              height={350}
              className="w-full h-87.5 object-contain"
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{medicine.name}</h1>

          <Badge variant="secondary">{medicine.status}</Badge>

          <p className="text-2xl font-semibold text-green-600">
            ৳ {medicine.price}
          </p>

          <p className="text-sm text-muted-foreground">
            Company ID: {medicine.companyId}
          </p>

          <p>
            Stock:
            <span className="ml-2 font-medium">{medicine.stock} pcs</span>
          </p>

          <Separator />

          <p className="text-muted-foreground">
            {medicine.description || "No description available."}
          </p>

          <Button className="w-full">Add To Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;

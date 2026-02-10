"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import CompanyForm from "./company-form";
import { MedicineForm } from "./medicine-form";
export function MedicineDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Product</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Medicine</DialogTitle>
          <DialogDescription>
            Add company first, then medicine info
          </DialogDescription>
        </DialogHeader>
        <CompanyForm />
        <MedicineForm />
      </DialogContent>
    </Dialog>
  );
}

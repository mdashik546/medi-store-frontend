"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import { MedicineForm } from "./medicine-form";
import CategoryForm from "./category-form";
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
            Add category first, then medicine info
          </DialogDescription>
        </DialogHeader>
        {/* <CategoryForm /> */}
        <MedicineForm />
      </DialogContent>
    </Dialog>
  );
}

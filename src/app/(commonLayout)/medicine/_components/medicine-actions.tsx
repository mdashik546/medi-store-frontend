"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDeleteAlert } from "@/lib/use-delete";
import { MedicineDialog } from "./dialog-and-form";

export const MedicineActions = ({ id }: { id: string }) => {
  const { handleDelete } = useDeleteAlert();
  const handleEdit = () => {
    console.log("Edit ID:", id);
  };

  return (
    <div className="flex justify-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
        </DialogContent>
      </Dialog>
      <Button
        variant="destructive"
        onClick={() => handleDelete(`/seller/medicines/${id}`, "medicine")}
      >
        Delete
      </Button>
    </div>
  );
};

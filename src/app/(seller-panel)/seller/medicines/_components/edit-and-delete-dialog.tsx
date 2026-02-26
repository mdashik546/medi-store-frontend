"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useDeleteAlert } from "@/lib/use-delete";
import { MedicineForm } from "./medicine-form";

export const EditAndDeleteDialog = ({ item }: any) => {
  const { handleDelete } = useDeleteAlert();

  return (
    <div className="flex justify-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <MedicineForm item={item} />
        </DialogContent>
      </Dialog>
      <Button
        variant="destructive"
        onClick={() =>
          handleDelete(`/seller/medicines/${item?.id}`, "medicine")
        }
      >
        Delete
      </Button>
    </div>
  );
};

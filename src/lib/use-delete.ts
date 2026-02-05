import Swal from "sweetalert2";
import { deleteAction } from "@/actions/delete.action";

export const useDeleteAlert = () => {
  const handleDelete = async (api: string, tag: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await deleteAction(api, tag);

      if (res) {
        await Swal.fire("Deleted!", "Deleted successfully", "success");
      } else {
        Swal.fire("Error!", "Delete failed.", "error");
      }
    }
  };

  return { handleDelete };
};

import Swal from "sweetalert2";
import { deleteAction } from "@/actions/delete.action";

export const useDeleteAlert = () => {
  const handleDelete = async (api: string, tag: string) => {
    Swal.fire({
      title: "Deleting...",
      text: "Please wait!",
      icon: "info",
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    try {
      const res = await deleteAction(api, tag);
      if (res) {
        Swal.fire("Deleted!", "Deleted successfully", "success");
      } else {
        Swal.fire("Error!", "Delete failed.", "error");
      }
    } catch (err) {
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return { handleDelete };
};
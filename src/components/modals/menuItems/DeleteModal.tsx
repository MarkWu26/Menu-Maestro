import useDeleteModal from "@/hooks/useDeleteModal";
import Modal from "../../Modal";
import { useState } from "react";
import { database } from "@/config/firebase";
import Heading from "../../Heading";
import { ref, remove } from "firebase/database";
import { toast } from "sonner";

const DeleteModal = () => {
  const deleteModal = useDeleteModal();

  const { id } = deleteModal;

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await remove(ref(database, "/menuItems/" + id));
      setIsLoading(false);
      deleteModal.setClose();
      toast.success("Item deleted!");
    } catch (error) {
      console.error("Error: ", error);
      setIsLoading(false);
      toast.error("Something happened");
    }
  };

  const body = (
    <div className="p-8">
  <Heading
      center
      title="Delete Menu Item"
      subtitle="Are you sure you want to delete this item?"
    />
    </div>
  
  );

  return (
    <Modal
      isOpen={deleteModal.isOpen}
      onClose={deleteModal.setClose}
      onSubmit={onSubmit}
      body={body}
      disabled={isLoading}
      isLoading={isLoading}
      title="Delete Item"
      actionLabel="Confirm"
      secondaryActionLabel="Close"
      secondaryAction={deleteModal.setClose}
    />
  );
};

export default DeleteModal;

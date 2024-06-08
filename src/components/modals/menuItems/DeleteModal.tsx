import {useDeleteModal} from "@/hooks/useDeleteModal";
import Modal from "../../Modal";
import { useState } from "react";
import { database } from "@/config/firebase";
import Heading from "../../Heading";
import { ref, remove } from "firebase/database";
import { toast } from "sonner";

const DeleteModal = () => {
  const { handleCloseDeleteModal, selectedItem, modalState,} = useDeleteModal();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await remove(ref(database, "/menuItems/" + selectedItem.id));
      setIsLoading(false);
      handleCloseDeleteModal()
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
      isOpen={modalState}
      onClose={handleCloseDeleteModal}
      onSubmit={onSubmit}
      body={body}
      disabled={isLoading}
      isLoading={isLoading}
      title="Delete Item"
      actionLabel="Confirm"
      secondaryActionLabel="Close"
      secondaryAction={handleCloseDeleteModal}
    />
  );
};

export default DeleteModal;

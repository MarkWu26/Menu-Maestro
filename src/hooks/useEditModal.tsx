import { useDispatch, useSelector } from "react-redux";
import { setOpenEditModal } from "@/features/slice/modalSlice";
import { item } from "@/types";

export const useEditModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: any) => state.modal.isEditModalOpen);
  const selectedItem: item = useSelector((state: any) => state.modal.selectedItem)

  const handleOpenEditModal = (item?: item) => {
    dispatch(setOpenEditModal({isOpen: true, item}));
  };

  const handleCloseEditModal = () => {
    dispatch(setOpenEditModal({isOpen: false}));
  };

  return {
    handleOpenEditModal,
    handleCloseEditModal,
    selectedItem,
    modalState,
  };
};

import { useDispatch, useSelector } from "react-redux";
import { setOpenAddModal } from "@/features/slice/modalSlice";

export const useAddModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: any) => state.modal.isAddModalOpen);

  const handleOpenAddModal = () => {
    dispatch(setOpenAddModal(true));
  };

  const handleCloseAddModal = () => {
    dispatch(setOpenAddModal(false));
  };

  return {
    handleOpenAddModal,
    handleCloseAddModal,
    modalState,
  };
};

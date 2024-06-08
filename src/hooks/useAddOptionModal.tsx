import { useDispatch, useSelector } from "react-redux";
import { setOpenOptionModal } from "@/features/slice/modalSlice";

export const useAddOptionModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: any) => state.modal.isAddOptionModalOpen);

  const handleOpenOptionModal = () => {
    dispatch(setOpenOptionModal(true));
  };

  const handleCloseOptionModal = () => {
    dispatch(setOpenOptionModal(false));
  };

  return {
    handleOpenOptionModal,
    handleCloseOptionModal,
    modalState,
  };
};

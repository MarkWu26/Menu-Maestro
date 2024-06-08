import { useDispatch, useSelector } from "react-redux";
import { setOpenLoginModal } from "@/features/slice/modalSlice";

export const useLoginModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.modal.isLoginModalOpen);

  const setOpen = (value: boolean) => {
    dispatch(setOpenLoginModal(value));
  };

  const setClose = () => {
    dispatch(setOpenLoginModal(false));
  };

  return {
    setOpen,
    setClose,
    isOpen,
  };
};

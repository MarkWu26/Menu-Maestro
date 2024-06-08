import { useDispatch, useSelector } from "react-redux";
import { setOpenSignupModal } from "@/features/slice/modalSlice";

export const useSignupModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.modal.isSignupModalOpen);

  const setOpen = (value: boolean) => {
    dispatch(setOpenSignupModal(value));
  };

  const setClose = () => {
    dispatch(setOpenSignupModal(false));
  };

  return {
    setOpen,
    setClose,
    isOpen,
  };
};

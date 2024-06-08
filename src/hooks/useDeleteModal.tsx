/* import {create} from 'zustand';

interface deleteProps{
    isOpen: boolean;
    setOpen: (isOpen: boolean, id?: string) => void;
    id: string
    setClose: () => void;
} 

const useDeleteModal = create<deleteProps> ((set)=>({
    isOpen: false,
    setOpen: (isOpen, id) => set({isOpen, id}),
    setClose: () => set({isOpen: false}),
    id: ''
}))

export default useDeleteModal */

import { useDispatch, useSelector } from "react-redux";
import { setOpenDeleteModal } from "@/features/slice/modalSlice";
import { item } from "@/types";

export const useDeleteModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: any) => state.modal.isDeleteModalOpen);
  const selectedItem: item = useSelector((state: any) => state.modal.selectedItem)

  const handleOpenDeleteModal = (item?: item) => {
    dispatch(setOpenDeleteModal({isOpen: true, item}));
  };

  const handleCloseDeleteModal = () => {
    dispatch(setOpenDeleteModal({isOpen: false}));
  };

  return {
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    selectedItem,
    modalState,
  };
};

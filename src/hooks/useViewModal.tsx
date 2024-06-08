/* import { item } from '@/types';
import {create} from 'zustand';

interface viewProps{
    isOpen: boolean;
    setOpen: (isOpen: boolean, item?: item) => void;
    item: item | null
    setClose: () => void;
} 

const useViewModal = create<viewProps> ((set)=>({
    isOpen: false,
    setOpen: (isOpen, item) => set({isOpen, item}),
    setClose: () => set({isOpen: false}),
    item: null
}))

export default useViewModal */


import { useDispatch, useSelector } from "react-redux";
import { setOpenViewModal } from "@/features/slice/modalSlice";
import { item } from "@/types";

export const useViewModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: any) => state.modal.isViewModalOpen);
  const selectedItem: item = useSelector((state: any) => state.modal.selectedItem)

  const handleOpenViewModal = (item?: item) => {
    dispatch(setOpenViewModal({isOpen: true, item}));
  };

  const handleCloseViewModal = () => {
    dispatch(setOpenViewModal({isOpen: false}));
  };

  return {
    handleOpenViewModal,
    handleCloseViewModal,
    selectedItem,
    modalState,
  };
};
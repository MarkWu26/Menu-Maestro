import { item } from '@/types';
import {create} from 'zustand';

interface editProps{
    isOpen: boolean;
    setOpen: (isOpen: boolean, item?: item) => void;
    item?: item;
    setClose: () => void;
} 

const useEditModal = create<editProps> ((set)=>({
    isOpen: false,
    setOpen: (isOpen, item) => set({isOpen, item}),
    setClose: () => set({isOpen: false}),
}))

export default useEditModal
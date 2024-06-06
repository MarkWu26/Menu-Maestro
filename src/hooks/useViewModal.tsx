import { item } from '@/types';
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

export default useViewModal
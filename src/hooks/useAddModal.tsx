import {create} from 'zustand';

interface MenuProps{
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    setClose: () => void;
} 

const useAddModal = create<MenuProps> ((set)=>({
    isOpen: false,
    setOpen: (isOpen) => set({isOpen}),
    setClose: () => set({isOpen: false}),
}))

export default useAddModal
import {create} from 'zustand';

interface loginProps{
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    setClose: () => void;
} 

const useLoginModal = create<loginProps> ((set)=>({
    isOpen: false,
    setOpen: (isOpen: boolean) => set({isOpen}),
    setClose: () => set({isOpen: false}),
   
}))

export default useLoginModal
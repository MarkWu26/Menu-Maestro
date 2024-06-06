import {create} from 'zustand';

interface signupProps{
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    setClose: () => void;
} 

const useSignupModal = create<signupProps> ((set)=>({
    isOpen: false,
    setOpen: (isOpen: boolean) => set({isOpen}),
    setClose: () => set({isOpen: false}),
   
}))

export default useSignupModal
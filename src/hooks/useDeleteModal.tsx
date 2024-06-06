import {create} from 'zustand';

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

export default useDeleteModal
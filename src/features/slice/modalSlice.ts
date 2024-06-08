
import { item } from '@/types';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface ModalState {
    isAddModalOpen: boolean;
    isViewModalOpen: boolean;
    isEditModalOpen: boolean;
    isDeleteModalOpen: boolean;
    isSignupModalOpen: boolean;
    isLoginModalOpen: boolean;
    isAddOptionModalOpen: boolean;
    selectedItem: item | null; 
}

const initialState: ModalState = {
    isAddModalOpen: false,
    isViewModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    isSignupModalOpen: false,
    isLoginModalOpen: false,
    isAddOptionModalOpen: false,
    selectedItem: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setOpenViewModal: (state, action: PayloadAction<{ isOpen: boolean; item?: item | null }>) => {
            const {isOpen, item} = action.payload;
            if(!isOpen) {
                state.isViewModalOpen = isOpen;
                state.selectedItem = null
            } else {
                state.isViewModalOpen = isOpen;
                state.selectedItem = item || null
            } 
        },
        setOpenAddModal: (state, action) => {
            state.isAddModalOpen = action.payload
        },
        setOpenSignupModal: (state, action) => {
            state.isSignupModalOpen = action.payload
        },
        setOpenLoginModal: (state, action) => {
            state.isLoginModalOpen = action.payload
        },
        setOpenDeleteModal: (state, action: PayloadAction<{ isOpen: boolean; item?: item | null }>) => {
            const {isOpen, item} = action.payload;
            if(!isOpen) {
                state.isDeleteModalOpen = isOpen;
                state.selectedItem = null
            } else {
                state.isDeleteModalOpen = isOpen;
                state.selectedItem = item || null
            } 
        },
        setOpenEditModal: (state, action: PayloadAction<{ isOpen: boolean; item?: item | null }>) => {
            const {isOpen, item} = action.payload;
            if(!isOpen) {
                state.isEditModalOpen = isOpen;
                state.selectedItem = null
            } else {
                state.isEditModalOpen = isOpen;
                state.selectedItem = item || null
            } 
        },
        setOpenOptionModal: (state, action) => {
            state.isAddOptionModalOpen = action.payload
        }
    },

})

export const {
    setOpenViewModal, 
    setOpenAddModal, 
    setOpenDeleteModal, 
    setOpenSignupModal, 
    setOpenLoginModal,
    setOpenOptionModal,
    setOpenEditModal
} = modalSlice.actions

export default modalSlice.reducer
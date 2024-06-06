import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuItems: null
}

const menuItemSlice = createSlice({
    name: 'menuItems',
    initialState,
    reducers: {
        setMenuItems: (state, action) => {
            state.menuItems = action.payload
        }
    }
});

export const {setMenuItems} = menuItemSlice.actions;
export default menuItemSlice.reducer
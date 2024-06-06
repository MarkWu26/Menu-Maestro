import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    options: null
}

const optionSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setOptions: (state, action) => {
            state.options = action.payload
        }
    }
});

export const {setOptions} = optionSlice.actions;
export default optionSlice.reducer

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/userSlice";
import optionSlice from "./slice/optionSlice";
import menuItemsSlice from "./slice/menuItemsSlice";
import modalSlice from "./slice/modalSlice";

const store = configureStore({
    reducer: {
        user: authSlice,
        options: optionSlice,
        menuItems: menuItemsSlice,
        modal: modalSlice
    },
    /* middleware: (getDefaultMiddleware) => {
        getDefaultMiddleware()
    }, */
})

export default store
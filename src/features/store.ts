import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/userSlice";
import optionSlice from "./slice/optionSlice";
import menuItemsSlice from "./slice/menuItemsSlice";

const store = configureStore({
    reducer: {
        user: authSlice,
        options: optionSlice,
        menuItems: menuItemsSlice
    }
})

export default store
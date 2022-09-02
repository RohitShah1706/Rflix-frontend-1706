import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLoggedIn: false,
    user: null,
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        }
    }
})
export const authActions = authSlice.actions;
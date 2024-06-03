import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    token: string;
}

interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;

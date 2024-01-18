import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    token: string | null;
    profile_pic: string | null;
}

const initialState: UserState = {
    firstname: null,
    lastname: null,
    email: null,
    token: null,
    profile_pic: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload };
        },
        clearUser: () => {
            return { ...initialState };
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

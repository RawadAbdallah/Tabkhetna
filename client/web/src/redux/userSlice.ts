import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    id?: string,
    firstname?: string;
    lastname?: string;
    email?: string;
    token?: string;
    profile_pic?: string;
}

const initialState: UserState = {
    id: undefined,
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    token: undefined,
    profile_pic: undefined,
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

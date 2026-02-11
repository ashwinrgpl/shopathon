import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logoutUser: (state) => {
            state.userInfo = null;
            localStorage.clear();
        },
    },
});

export const { setCredentials, logoutUser } = authSlice.actions;

export default authSlice.reducer;
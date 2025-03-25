import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance"
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {}  // /TODO: JSON PARSE this
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        console.log(data);
        
        const res = axiosInstance.post("user/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
})

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading: "Wait! authentication in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log in"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.get("user/logout");
        toast.promise(res, {
            loading: "Wait! logout in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log out"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
})

export const updateProfile = createAsyncThunk("/user/update-profile", async ({id,data}) => {
    try {
        const res = axiosInstance.put(`user/update/${id}`, data);
        toast.promise(res, {
            loading: "Wait! updating your profile",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
})

export const getUserData = createAsyncThunk("/user/me", async () => {
    try {
        const res = axiosInstance.get("user/me");   
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            if(action?.payload?.user) {
                localStorage.setItem("data", JSON.stringify(action.payload.user));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action.payload.user.role);
                state.isLoggedIn = true;
                state.data = action.payload.user;
                state.role = action.payload.user.role;
            }
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            if(action?.payload?.user) {
                localStorage.setItem("data", JSON.stringify(action.payload.user));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action.payload.user.role);
                state.isLoggedIn = true;
                state.data = action.payload.user;
                state.role = action.payload.user.role;
            }
        })
    }
});

export default authSlice.reducer;
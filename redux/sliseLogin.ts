"use client";

import { createSlice } from '@reduxjs/toolkit';


interface  InitSlice {
    loginOn: boolean;
    user : Object|null;
    temporaryPhone: String|null;
    likes: string[];
}  

const initialLogin:InitSlice = {
    loginOn: false,
    user: null,
    temporaryPhone: null,
    likes: []
}

interface  ActionsSlice {
    type: string;
    payload: any;
}


const slice = createSlice({
    name: 'LoginReducer',
    initialState: initialLogin,
    reducers: {
        loginStatus(state:InitSlice,action:ActionsSlice){
            state.loginOn = action.payload;
        },
        intend(state:InitSlice, action:ActionsSlice){
            state.user = action.payload;
        },
        addPhone(state:InitSlice, action: ActionsSlice){
            state.temporaryPhone = action.payload;
        },
        updateLikes(state:InitSlice, action: ActionsSlice){
            state.likes = action.payload
        }
    }
});

export default slice.reducer;
export const {loginStatus, intend,  addPhone, updateLikes} = slice.actions;
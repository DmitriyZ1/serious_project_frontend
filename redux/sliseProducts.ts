"use client";

import { createSlice } from '@reduxjs/toolkit';


interface  initSlice {
    listProducts: Object[]
}  

const initialProducts:initSlice = {
    listProducts: []
}

interface  actionsSlice {
    type: string;
    payload: any;
}


const slice = createSlice({
    name: 'ProductReducer',
    initialState: initialProducts,
    reducers: {
        appdateProductOut(state:initSlice,action: actionsSlice){
            state.listProducts = action.payload;
        }
    }
});

export default slice.reducer;
export const {appdateProductOut} = slice.actions;
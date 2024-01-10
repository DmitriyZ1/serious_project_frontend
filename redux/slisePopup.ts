"use client";

import { createSlice } from '@reduxjs/toolkit';

interface  actionsSlice {
    type: string;
    payload: any;
}

interface InPopup{
    show: boolean,
    warning: boolean
}

const initialPopup:InPopup = {show: false, warning: true};


const slice = createSlice({
    name: 'PopupShow',
    initialState: initialPopup,
    reducers: {
        poputUpdate(state:InPopup,action:actionsSlice){
            state.show = action.payload;
        },
        warningUpdate(state:InPopup,action:actionsSlice){
            state.warning = action.payload;
        },
    }
});
    
export default slice.reducer;

export const { poputUpdate, warningUpdate } = slice.actions;
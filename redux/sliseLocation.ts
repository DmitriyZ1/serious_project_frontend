"use client";

import { createSlice } from '@reduxjs/toolkit';


interface  initSlice {
    sityLocation : Number;
    listSity: {name: string, id: number}[];
}  

const initialLocation:initSlice = {
    sityLocation : 1,
    listSity: [
        {name:'Москва', id: 1}, 
        {name:'Санкт-Петербург', id: 2},
        {name: 'Екатеренбург', id: 3}
    ]
}

interface  actionsSlice {
    type: string;
    payload: any;
}

const slice = createSlice({
    name: 'LocationReducer',
    initialState: initialLocation,
    reducers: {
        selectSity(state:initSlice,action: actionsSlice){
            state.sityLocation = action.payload;
        },
        updateListSity(state:initSlice,action: actionsSlice){
            state.listSity = action.payload;
        }
    }
});

export default slice.reducer;
export const {selectSity} = slice.actions;
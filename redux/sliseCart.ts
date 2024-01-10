"use client";

import { createSlice } from '@reduxjs/toolkit';

interface  actionsSlice {
    type: string;
    payload: any;
}

interface ProductItem{
    product: {
        id: string,
        category: string,
        price: number,
        label: string,
        model: string,
        description: string,
        rating: number,
        popularity: number,
        photos:string[],
        coments:Object[],
        characteristic:{
            dia: number,
            gender: string,
            color: string,
            helm : string,
            frame: string,
            mass: number
        }
    }
}

interface InCart {
    cart: {
        id: string,
        count: number,
        status: string
    }[],
    selectedProducts: ProductItem[]
}

const initialCart:InCart = { cart: [], selectedProducts: []};


const slice = createSlice({
    name: 'LoginReducer',
    initialState: initialCart,
    reducers: {
        updateCart(state:InCart,action:actionsSlice){
            state.cart = action.payload;
        },
        updatePicked(state:InCart,action:actionsSlice){
            state.selectedProducts = action.payload;
        },
    }
});

export default slice.reducer;

export const { updateCart, updatePicked } = slice.actions;
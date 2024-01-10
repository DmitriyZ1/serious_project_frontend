"use client";

import { configureStore } from '@reduxjs/toolkit';
import sliseLocation from './sliseLocation';
import sliseProducts from './sliseProducts';
import sliseLogin from './sliseLogin';
import slisePopup from './slisePopup';
import sliseCart from './sliseCart';

const store = configureStore({
    reducer: {sliseLocation, sliseProducts, sliseLogin, sliseCart, slisePopup},
    devTools: process.env.NODE_ENV !== "production"
})

export default store;

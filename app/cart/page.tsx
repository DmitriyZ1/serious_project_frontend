'use client';

import '@/style/cart/cart.scss';
import '@/fontawesome.js';

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import {CartEmpty, Cart, ShadowNav } from '@/components/';


export default function CartPage(){
    const cart = useSelector(({sliseCart}) => sliseCart.cart)
    const [empty, setEmpty] = useState(false) 
    
    useEffect(() => {
        if(cart.length > 0){
            setEmpty(true)
        } else {
            setEmpty(false)
        }
    },[cart])
    
    return (
        <>
        <div className="cart">
            <ShadowNav />
            <div className="container">
                {empty  ? <Cart/> : <CartEmpty/>}
            </div>
        </div>
        </>
    )
} 
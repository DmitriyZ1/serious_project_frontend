'use client';


import {ProductsList} from '@/components/';
import {listFilterBic} from '@/excess/filterObj'

export default function Bicycles(){

    return (
        <>
             <ProductsList filtData={listFilterBic} tittle={'Ведосипеды'} url={'bicycles'}/> 
        </>
    )
}
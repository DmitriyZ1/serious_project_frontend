'use client';


import { ProductsList } from '@/components/';
import { listFilterSkate } from '@/excess/filterObj';


export default function Skateboards(){

    
    return (
        <>
             <ProductsList filtData={listFilterSkate} tittle={'Скейтборды'} url={'skateboards'}/> 
        </>
    )
}
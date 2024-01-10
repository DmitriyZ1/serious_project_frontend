'use client';


import {ProductsList} from '@/components/';
import { listFilterScootesr } from '@/excess/filterObj'


export default function Scooters(){

    return (
        <>
             <ProductsList filtData={listFilterScootesr} tittle={'Самокаты'} url={'scooters'}/> 
        </>
    )
}
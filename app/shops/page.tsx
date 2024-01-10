'use client';

import '@/style/shops/shops.scss'
import '@/style/icons.scss'

import { URL } from '@/options';
import axios from 'axios'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@/fontawesome.js'

import { useState, useEffect, ReactElement, useMemo } from "react";
import { useSelector } from 'react-redux';
import { ShadowNav } from '@/components/';

import { ShopType } from '@/interfaces.js'


export default function Shops() {
    const sity:number = useSelector(({sliseLocation}) => sliseLocation.sityLocation);
    const [list, setList] = useState<ShopType[]>([]);
    const [nameSity, setNameSity] = useState<string>();
   
    const conditions = useMemo(() => {
        switch (sity) {
            case 1: 
                setNameSity('Москва');
                return "moscow";
            case 2: 
                setNameSity('Санкт-Петербурк');
                return "peter";
            case 3: 
                setNameSity('Екатеренбург');
                return "ekat";
        }
    },[sity])

    useEffect(() => {
        (async function(){
            try{
                const response:any= await axios.get(URL + '/shops/' + conditions);
                setList(response.data)
            } catch(err){
                console.error(err)
            }
        })()
    }, [sity]);

    const dropStars = (r:number):ReactElement[] => {
        return Array.from({length:r}, (e,i) => (<FontAwesomeIcon icon='star' size='sm' className='i_star' key={i} />))
    }

    return (
        <>
        <ShadowNav />
        <div className="shops">
            <div className="shops_container">
                <div className="shops_title">
                    <h2>Адреса всех магазинов в городе {nameSity}</h2>
                </div>  
                <div className="location_list">
                    <ul>
                        <li className="location_list_header">
                            <div className="shop_name shop_column_one"><h4>Название и адрес</h4></div>
                            <div className="shop_condition shop_column_two"><h4>Режим работы</h4></div>
                            <div className="shop_rating shop_column_three"></div>
                        </li>
                        {list.map(elem => (
                            <li className="location_list_item" key={elem._id}>
                                <div className="shop_item_name shop_column_one"><h4>{elem.name}</h4> <span>{elem.address}</span></div>
                                <div className="shop_item_cond shop_column_two"><span>{elem.regime}</span></div>
                                <div className="shop_item_rating shop_column_three"><span>{dropStars(elem.reting)}</span></div>
                            </li> 
                        ))}
                    </ul>
                </div>      
            </div>
        </div>
        </>
      )
  }
  
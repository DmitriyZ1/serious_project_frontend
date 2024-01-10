'use client';

import { useRouter } from 'next/navigation';
import '@/style/goods/goods.scss'
import axios from 'axios';
import { URL } from '@/options';

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import {ArrowBack,ProductItem, NavProducts } from '@/components/';
import {ProductItemType} from '@/interfaces';


export default function Goods(){
    const par = useSearchParams()
    const router = useRouter()
    const [products, setProducts] = useState<ProductItemType[]>([]) 
    const [counting, setСounting] = useState<number>(0) 
   
    useEffect(() => {
        const p = par.get('page');
        const s = par.get('search');
        
        (async function(){
            try{
                const response = await axios.get(URL + '/goods', {params:{search: s, page: p}});
                setProducts(response.data.data);
                setСounting(response.data.count)
            } catch(err){
                console.error(err)
            }
        })()
    },[par])

    const pageLimit = () => {
        const page = par.get('page');
        const search = par.get('search');
        const s = `?search=${search}`;
        let p = (page) ? +page + 1 : 1;
        router.push(`/goods${s}&page=${p}`);
    }

    return (
        <div className="goods">
            <NavProducts/>
            <div className="container">
                <ArrowBack patch={"/"} />
                <div className="out_items">
                    <div className="out_items_tittle">
                        {products ? <h2> Найдено <span>{counting}</span></h2> : <h2>Ничего не найдено</h2>}
                    </div>
                    <div className="out_items_list">
                        {products && products.map(item => <ProductItem key={item._id} product={item} />)}
                    </div>
                    {products && <div className="show_more">
                        <button className='show_more_button' onClick={() => {pageLimit()}}>Показать еще</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}
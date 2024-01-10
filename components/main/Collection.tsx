
import '@/style/icons.scss'
import '@/style/main/collection.scss'
import ProductItem from './ProductItem'
import axios from 'axios'
import { URL } from '@/options'
import { ProductItemType } from '@/interfaces'

import { useState, useEffect } from 'react';


export default function Collection(){

    const [productsHit, setProductsHit] = useState<ProductItemType[]>([]);

    useEffect(() => {
        (async function(){
            try{
                const response = await axios.get(URL + '/hit');
                setProductsHit(response.data);
            } catch(err){
                console.error(err)
            }
        })()
    }, [])

    return(
        <div className="product_collection">
            <div className="container">
                <div className="product_collection_tittle">
                    <h2>Хиты продаж</h2>
                </div>
                <div className="product_collection_items">
                    {productsHit && productsHit.map(item => <ProductItem key={item._id} product={item} />)}
                </div>
            </div>
        </div>
)

}


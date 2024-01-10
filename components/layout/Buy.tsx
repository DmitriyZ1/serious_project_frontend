'use client';

import '@/style/layout/buy.scss';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { URL } from '@/options';

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@/fontawesome.js';

import { updateCart } from '@/redux/sliseCart';

import { ProductItemType, CartFaceType, InCartStateType } from '@/interfaces';

export default function Buy( ){

    const router = useRouter();

    const dispatch = useDispatch();

    const cartSelected:ProductItemType[] = useSelector(({sliseCart}) => sliseCart.selectedProducts);
    const cart:CartFaceType[] = useSelector(({sliseCart}) => sliseCart.cart);
    const [cartState, setCartState] = useState<InCartStateType []>([]);

    useEffect(() => {
        const products = cart.map(elem => {
            const product = cartSelected.find(item => item._id === elem.id);
            return {id: product?._id || '', name: product?.description || '', photos: product?.photos || []}
        })
        setCartState(products)
    }, [cartSelected, cart])

    const delProduct = (id:string):void => {
        const newCart = cart.filter(elem => {
            return elem.id !== id
        })
        dispatch(updateCart(newCart))
    }

    const whatPicture = (p: string[] | undefined):string => {
        if(p){
            const pathPic = `${URL}/pic/${p[0]}`;
            if (p.length !== 0) return pathPic;  
            return ''
        }
        return ''
    }

    return(
        <div className="buy">
            <div className="buy_interactive">
                <div className="buy_block">
                    <ul className='buy_items'>
                        {cartState.map(elem => (
                            <li className='buy_item' key={elem.id}>
                                <div className="buy_item_pic" onClick={() => {router.push(`/products/${elem.id}`)}}>
                                    <Image src={whatPicture(elem?.photos)} alt='' width={40} height={45}  />
                                </div>
                                <div className="buy_item_name" onClick={() => {router.push(`/products/${elem.id}`)}}>{elem.name}</div>
                                <div className="buy_item_del" onClick={() => {delProduct(elem.id)}}><FontAwesomeIcon icon='trash' size='sm' className='i_tresh'/></div>
                            </li>
                        ))}
                    </ul>
                    <div className="buy_button">
                        <button onClick={() => {router.push('/cart')}}>Перейти в корзину</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
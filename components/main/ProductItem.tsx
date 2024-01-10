"use client";

import { URL } from '@/options';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import '@/fontawesome.js';

import { useRouter } from 'next/navigation';

import Link from 'next/link';
import Image from 'next/image'
import classNames from 'classnames';

import '@/style/main/productItem.scss';

import { updateCart } from '@/redux/sliseCart';
import { updateLikes } from '@/redux/sliseLogin';
import { useDispatch, useSelector } from 'react-redux';

import { useState, useEffect } from 'react';

import {ProductItemType, CartFaceType} from '@/interfaces';


export default function ProductItem({product}: {product: ProductItemType}){
    const rout = useRouter()

    const dispatch = useDispatch()
    const cart:CartFaceType[] = useSelector(({sliseCart}) => sliseCart.cart)
    const likes:string[] = useSelector(({sliseLogin}) => sliseLogin.likes)

    const [likesState, setLikesState] = useState<string[]>([]) 
    const [cartState, setCartState] = useState<CartFaceType[]>([]) 

    useEffect(() => {
        setLikesState(likes)
    }, [likes])
    
    useEffect(() => {
        setCartState(cart)
    }, [cart])

    const putProduct = (id:string):void => {
        if(cart.some(elem => elem.id === id)){
            dispatch(updateCart(cart.map(elem => {
                if(elem.id === id) return {id: id, count: elem.count + 1}
                return elem
            })))
        } else {
            dispatch(updateCart([...cart, {id:id, count: 1}]))
        }
    }
    
    const putLike = (id:string):void => {
        if(!likes.includes(id)){
            dispatch(updateLikes([...likes, id]))
        } else {
            dispatch(updateLikes(likes.filter(elem => id !== elem)))
        }
    }

    const whatPicture = (p: string[]):string => {
        const pathPic = `${URL}/pic/${p[0]}`;
        if (p.length !== 0) return pathPic;
        return ''
    }

   
    return(
        <div className="cp_item">
            <Link href={`/products/${product._id}`}>
                <div className="cp_item_img">
                    <div className="img_min_item">
                        <Image className='' src={whatPicture(product.photos)} alt={product.description} width={120} height={160} />
                    </div>
                </div>
            </Link>
            <div className="cp_indent"></div>
            <Link href={`/products/${product._id}`}>
                <div className="cp_item_name">{product.description}</div>
            </Link>
            <div className="cp_item_reating">
                <FontAwesomeIcon icon='star' size='sm' className='i_star2'/>
                <span className='reating_num'>{product.rating} <span className='reating_comments' onClick={() => {rout.push(`/comments/${product._id}`)}}> {product.coments.length} отзывов</span> </span> 
            </div>
            <div className="cp_price">
                <div className="cp_price_block">{product.price}<FontAwesomeIcon icon='ruble' size='sm' className='i_ruble'/></div>
            </div>
            <div className="cp_indent"></div>
            <div className="cp_buttons">
                <div className="cp_button">
                    <button className={classNames('button_card', {'white_color': cartState.some(elem => elem.id === product._id) })} onClick={() => {putProduct(product._id)}} >
                         <FontAwesomeIcon icon='cart-shopping' size='sm' className='i_cart3'/>
                    </button> 
                </div>
                <div onClick={() => {putLike(product._id)}} className={classNames('cp_like', {'red_color': likesState.includes(product._id)})}>
                    <FontAwesomeIcon icon='heart' size='sm' className='i_heart'/>
                </div>  
            </div>
        </div>
    )
}


'use client';

import '@/style/favourites/favourites.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/fontawesome.js';

import { useRouter } from 'next/navigation';

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { ProductItemType, CartFaceType } from '@/interfaces';
import { updateCart } from '@/redux/sliseCart';
import { updateLikes } from '@/redux/sliseLogin';

import {ShadowNav} from '@/components/';

import Image from 'next/image';
import { URL } from '@/options';

export default function LikePage() {
    const dispatch = useDispatch();
    const router = useRouter()

    const like:string[] = useSelector(({ sliseLogin }) => sliseLogin.likes);
    const goods:ProductItemType[] = useSelector(({sliseCart}) => sliseCart.selectedProducts);
    const cart:CartFaceType[] = useSelector(({sliseCart}) => sliseCart.cart)

    const [likeState, setLikeState] = useState<string[]>([]);

    useEffect(() => {
        if(like.length === 0) router.push('/')
        else  setLikeState(like)
    }, [like])

    const outName = (id:string):string => {
        const nameProduct = goods.find(item => item._id === id)?.description;
        return nameProduct || '';
      }

    const outPrice = (id:string):number => {
        const priceProduct = goods.find(item => item._id === id)?.price;
        return priceProduct || 0;
    }

    const outPic = (id:string):string[] => {
        const priceProduct = goods.find(item => item._id === id)?.photos;
        return priceProduct || [];
    }

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

    const delProduct = (id:string):void => {
        const newLikes = like.filter(elem => {
            return elem !== id
        })
        dispatch(updateLikes(newLikes))
    }

    const whatPicture = (p: string[] | undefined):string => {
        if(p){
            const pathPic = `${URL}/pic/${p[0]}`;
            if (p.length !== 0) return pathPic;  
            return ''
        }
        return ''
    }


    return (
        <>
        <div className="favourites">
            <ShadowNav />
            <div className="container">
                <div className="favourites_tittle">
                    <h2>Избранное <span>{likeState.length}</span></h2>
                </div>
                <div className="favourites_list_items">
                    {likeState.map(elem => (
                        <div className="favourites_list_item" key={elem}>
                            <div className="favourites_item_wrapper">
                                <div className="favourites_item_img" onClick={() => {router.push(`/products/${elem}`)}}>
                                    <Image src={whatPicture(outPic(elem))} alt='' width={108} height={128}  />
                                </div>
                                <div className="favourites_item_name" onClick={() => {router.push(`/products/${elem}`)}}>
                                    <div className="fav_name_text"> {outName(elem)}</div>
                                    <div className="fav_name_button" onClick={() => {delProduct(elem)}}>
                                        Удалить<span><FontAwesomeIcon icon='trash' size='sm' className='i_tresh'/></span>
                                    </div>
                                </div>
                                <div className="favourites_item_addendum">
                                    <div className="favourites_item_price">
                                        {outPrice(elem)} <span><FontAwesomeIcon icon='ruble' size='sm' className='i_ruble0' /></span>
                                    </div>
                                    <div className="favourites_item_button">
                                        <button className='button_addcart' onClick={() => {putProduct(elem)}}>
                                            <FontAwesomeIcon icon='cart-shopping' size='sm' className='i_cart3'/>
                                            <span className='button_text'>В корзину</span>  
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
} 
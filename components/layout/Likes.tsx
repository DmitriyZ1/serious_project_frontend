'use client';

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateLikes } from '@/redux/sliseLogin';

import { URL } from '@/options'

import { ProductItemType, InCartStateType } from '@/interfaces';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@/fontawesome.js';

import '@/style/layout/likes.scss';
import Image from 'next/image';


export default function Likes( ){
    const dispatch = useDispatch()
    const router = useRouter();

    const like:string[] = useSelector(({ sliseLogin }) => sliseLogin.likes);
    const cartSelected:ProductItemType[] = useSelector(({sliseCart}) => sliseCart.selectedProducts);

    const [likeState, setLikeState] = useState<InCartStateType[]>([])

    useEffect(() => {
        const products = like.map(elem => {
            const product = cartSelected.find(item => item._id === elem);
            return {id: product?._id || '', name: product?.description || '', photos: product?.photos || []}
        })
        setLikeState(products)
    },[like, cartSelected])

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

    return(
        <div className="likes">
            <div className="likes_interactive">
                <div className="likes_block">
                <ul className='like_items'>
                        {likeState.map(elem => (
                            <li className='like_item' key={elem.id}>
                                <div className="like_item_pic" onClick={() => {router.push(`/products/${elem.id}`)}}>
                                    <Image src={whatPicture(elem?.photos)} alt='' width={40} height={45}  />
                                </div>
                                <div className="like_item_name" onClick={() => {router.push(`/products/${elem.id}`)}}>{elem.name}</div>
                                <div className="like_item_del" onClick={() => {delProduct(elem.id)}}><FontAwesomeIcon icon='trash' size='sm' className='i_tresh'/></div>
                            </li>
                        ))}
                    </ul>
                    <div className="like_button">
                        <button onClick={() => {router.push('/favourites')}}>Перейти в избранное</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
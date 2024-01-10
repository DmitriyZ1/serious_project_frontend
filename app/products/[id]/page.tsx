'use client';

import axios from 'axios'
import { URL } from '@/options';
import '@/style/products/products.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@/fontawesome';
import '@/style/icons.scss'
import Image from 'next/image'

import {ArrowBack,  ShadowNav, PicZoom} from '@/components/';

import { useRouter } from 'next/navigation';
import { useState, useEffect, ReactElement } from 'react';

import { ProductItemType, CartFaceType } from '@/interfaces'

import { useSelector, useDispatch } from 'react-redux';
import { updateLikes } from '@/redux/sliseLogin';
import { updateCart } from '@/redux/sliseCart';

import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

interface SpecType {
    model?: string,
    material?: string,
    helm?: boolean
}


export default function Products({ params }: {params: {id: string}}) {
    const dispatch = useDispatch();
    const router = useRouter();
    
    const userLogin:boolean = useSelector(( {sliseLogin} ) => sliseLogin.loginOn);
    const cart:CartFaceType[] = useSelector(({sliseCart}) => sliseCart.cart)
    const likes:string[] = useSelector(({sliseLogin}) => sliseLogin.likes)
    
    const [item, setItem] = useState<ProductItemType | null | undefined>(null);
    const [login, setLogin] = useState<boolean>(false)
    const [likesState, setLikesState] = useState<string[]>([])
    const [cartState, setCartState] = useState<CartFaceType[]>([])
    const [specific, setSpecific] = useState<SpecType>({})
    const [zooming, setZooming] = useState<boolean>(false)

    useEffect(() => {
        setLikesState(likes);
    }, [likes])
    
    useEffect(() => {
        setCartState(cart);
    }, [cart])

    useEffect(() => {
        (async function(){
            try{
                const response = await axios.get(URL + '/products/' + params.id);
                if(response){
                    setItem(response.data)
                } else {
                    setItem(null)
                }
            } catch(err){
                console.error(err)
                router.push('/')
            }
        })()
    }, [])

    useEffect(() => {
        if(item){
            const o = item.model.length > 0 ? item.model : '---';
            switch(item.category){
                    case 'bicycle':
                        setSpecific({
                            model: o,
                            material: "Материал рамы" ,
                            helm: true
                        }) 
                        break
                    case 'scooters':
                        setSpecific({
                            model: o,
                            material: "Материал рамы" ,
                            helm: false
                        }) 
                        break
                    case 'skateboards':
                        setSpecific({
                            model: o,
                            material: "Материал доски" ,
                            helm: false
                        }) 
                        break
            }
        }
    },[item])

    useEffect(() => {
        setLogin(userLogin)
    }, [userLogin])

    const dropStars = (r: number | undefined, cl: string): ReactElement[] | null => {
        if (r) {
            return Array.from({ length: r }, (e, i) => (<FontAwesomeIcon icon='star' size='sm' className={cl} key={i} />))
        }
        else
            return null
    }

    const linkComments = ():void => {router.push(`/comments/${item?._id}`)};

    const classLike = (id: string|undefined):boolean => {
        if(id) return likesState.includes(id)
        else return false
    }
    
    const classCart = (id: string|undefined):boolean => {
        if(id) return cartState.some(item => item.id === id)
        else return false
    }

    const putLike = ():void => {
        if(item?._id){
            if(!likes.includes(item?._id)){
                dispatch(updateLikes([...likes, item?._id]))
            } else {
                dispatch(updateLikes(likes.filter(elem => item?._id !== elem)))
            }
        }
    }
    
    const putProduct = ():void => {
        if(item?._id){
            if(cart.some(elem => elem.id === item._id)){
                dispatch(updateCart(cart.map(elem => {
                    if(elem.id === item._id) return {id: elem.id, count: elem.count + 1 }
                    return elem
                })))
            } else {
                dispatch(updateCart([...cart, {id: item._id, count: 1}]))
            }
        }
    } 

    const picOut = ():void => {
        setZooming(!zooming)
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
        <ShadowNav />
        <div className="products">
            <div className="container">
                <ArrowBack patch='/'/>
                <div className="product_content">
                    <div className="product_block_pic" onClick={() => {picOut()}}>
                        <Image src={whatPicture(item?.photos)} alt='' width={412} height={550}  />
                    </div>
                    <div className="product_block_text">
                        <div className="product_info_title">
                            <h3>{item?.description}</h3>
                        </div>
                        <div className="product_info_rating">
                            <div className="p_info_stars">{dropStars(item?.rating, 'i_star2')}</div>
                            <div className="p_info_reviews" onClick={() => {linkComments()}}>{item?.coments.length} отзывов</div>
                            <div className={ classNames("p_info_like", { 'red_color': classLike(item?._id)})} onClick={() => {putLike()}}>
                                <FontAwesomeIcon icon='heart' size='sm' className='i_heart2'/>
                            </div>
                            <div className="p_info_cart" onClick={() => {putProduct()}}>
                                <button className={classNames('push_cart', {'push_cart_added': classCart(item?._id)})}>
                                    Добавит в корзину 
                                    <span>
                                        <FontAwesomeIcon icon='cart-shopping' size='sm' className='i_cart3'/>
                                    </span> 
                                </button>
                            </div>
                        </div>
                        <div className="product_info_specifications">
                            <p className="p_specifications_title">Характеристики:</p>
                            <ul className="p_specifications_list">
                                <li className="p_specifications_item">
                                    <div className="p_sp_item_title">Марка</div>
                                    <div className="p_sp_item_text">{item?.label}</div>
                                </li>
                                <li className="p_specifications_item">
                                    <div className="p_sp_item_title">Модель</div>
                                    <div className="p_sp_item_text">{specific.model}</div>
                                </li>
                                <li className="p_specifications_item">
                                    <div className="p_sp_item_title">Диаметр колеса</div>
                                    <div className="p_sp_item_text">{item?.characteristic.dia}</div>
                                </li>
                                <li className="p_specifications_item">
                                    <div className="p_sp_item_title">{specific.material}</div>
                                    <div className="p_sp_item_text">{item?.characteristic.frame}</div>
                                </li>
                                <li className="p_specifications_item">
                                    <div className="p_sp_item_title">Пол</div>
                                    <div className="p_sp_item_text">{item?.characteristic.gender}</div>
                                </li>
                                <li className="p_specifications_item">
                                    <div className="p_sp_item_title">Вес</div>
                                    <div className="p_sp_item_text">{item?.characteristic.mass} кг</div>
                                </li>
                                <li className={classNames("p_specifications_item", {'del_specifications': !specific.helm} )} >
                                    <div className="p_sp_item_title">Руль</div>
                                    <div className="p_sp_item_text">{item?.characteristic.helm}</div>
                                </li>
                            </ul>
                        </div>
                        <div className="product_info_description">
                            <h4>О товаре</h4>
                            <div className="p_descr_text">{item?.text}</div>
                        </div>
                    </div>
                </div>
                <div className="product_reviews">
                    <div className="product_reviews_title" onClick={() => {linkComments()}}>
                        <h4>Отзывы <span>{item?.coments.length}</span></h4>
                    </div>
                    <div className="product_reviews_link">
                        <button className='r_l_button' disabled={!login} onClick={() => {linkComments()}}>Оставить отзыв</button>
                    </div>
                    {(item?.coments) && (item?.coments.length > 0) && (
                        <>
                        <div className="product_reviews_rating">
                            {dropStars(5, 'i_star3')} <span>5.0</span>
                        </div>
                        <ul className="product_reviews_list">
                            {item?.coments && item.coments.length > 0 && item.coments.map(elem => (
                                <li className='p_rev_item' key={elem.id}>
                                    <div className="p_rev_item_name">{elem.name} <span>{elem.date}</span></div>
                                    <div className="p_rev_item_bals">{dropStars(elem.estimation, 'i_star2')} <span>{elem.estimation}</span> </div>
                                    <div className="p_rev_item_text">{elem.text}</div>
                                </li>
                            ))
                            }
                        </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
        <CSSTransition in={zooming} timeout={100} unmountOnExit classNames='zooming'>
            <PicZoom pic={whatPicture(item?.photos)} funOut={picOut}/>
        </CSSTransition>
        </>
    )
}
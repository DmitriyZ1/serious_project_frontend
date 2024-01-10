'use client';

import axios from 'axios';
import { URL } from '@/options';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@/fontawesome.js';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from '@/redux/sliseCart';

import Image from 'next/image'
import classNames from 'classnames';

import { ProductItemType, CartFaceType } from '@/interfaces'


export default function SliderLittle(){
    const dispatch = useDispatch();
    const rout = useRouter()
    const cart:CartFaceType[] = useSelector(({sliseCart}) => sliseCart.cart);
    
    const [itemsProductDay, setItemsProductDay] = useState<ProductItemType[]>([]);
    const [activSlider, setActivSlider] = useState<number>(0);
    const [activSliderMax, setActivSliderMax] = useState<number>(0);
    const [cartState, setCartState] = useState<CartFaceType[]>([]);

    useEffect(() => {
        setCartState(cart);
    }, [cart])
    
    useEffect(() => {
        (async function(){
            try{
                const response = await axios.get(URL + '/sliderLittle');
                setItemsProductDay(response.data);
            } catch(err){
                console.error(err)
            }
        })()
    },[]);
    
    useEffect(() => {
        setActivSliderMax(itemsProductDay.length)
    },[itemsProductDay])

    const swichProduct = (leaf:string):void => {
        if(leaf === 'right' && (activSlider + 1 < activSliderMax)){
            setActivSlider(e =>  e+1)
        }else if(leaf === 'right' && activSlider + 1 >= activSliderMax){
            setActivSlider(0)
        }
        if(leaf === 'left' && (activSlider - 1 > -1)){
            setActivSlider(e => e-1)
        }else if(leaf === 'left' && activSlider - 1 <= -1){
            setActivSlider(activSliderMax - 1)
        }
    }

    const swichCarousel = (indx:number):void => {
        setActivSlider(indx)
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
    
    const whatPicture = (p: string[]):string => {
        const pathPic = `${URL}/pic/${p[0]}`;
        if (p.length !== 0) return pathPic;
        return ''
    }


    return(
        <div className="slider_little">
            <div className="slider_little_block">
                <div className="slider_little_cart">
                    <div className="slider_l_angle_left angle" onClick={() => {swichProduct("left")}}>
                        <FontAwesomeIcon icon='angle-left' size='sm' className='i_angle'/>
                    </div>
                    <div className="slider_l_angle_right angle" onClick={() => {swichProduct("right")}}>
                        <FontAwesomeIcon icon='angle-right' size='sm' className='i_angle'/>
                    </div>
                    <div className="product_slider">
                        <div className="product_slider_title">
                            <h2>Товары дня</h2>
                        </div>
                        {itemsProductDay.map((item, indx ) => (
                            <div className={classNames(" product_slider_item", {'show_item_slider': indx === activSlider} )} key={item._id}>
                                <div className="p_s_item_pic" onClick={() => {rout.push(`/products/${item._id}`)}}>
                                    <Image src={whatPicture(item.photos)} alt={item.description} width={120} height={160} />
                                </div>
                                <div className="p_s_item_info">
                                    <div className="s_item_prise">{item.price} <FontAwesomeIcon icon='ruble' size='sm' className='i_ruble'/> </div>
                                    <div className="s_item_comments">
                                        <FontAwesomeIcon icon='star' size='sm' className='i_star2'/>
                                        <span className='reating_num'>{item.rating} <span className='reating_comments' onClick={() => {rout.push(`/comments/${item._id}`)}}> {item.coments.length} отзывов</span> </span> 
                                    </div>
                                    <div className="s_item_discription">{item.description}</div>
                                    <button className={classNames("s_item_button_cart", {"button_cart_white": (cartState.some(i => i.id === item._id))} )} onClick={() => {putProduct(item._id)}}>
                                        <FontAwesomeIcon icon='cart-shopping' size='sm' className='i_cart3'/> 
                                        В  корзину
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="slider_little_pswich">
                        <div className="pswich">
                        {itemsProductDay.map((elem, index) => (
                            <div className="carousel" key={index}  onClick={() => {swichCarousel(index)}}>
                                <div className={classNames("carousel_but",{"but_active": (index === activSlider)} )}></div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
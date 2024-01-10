'use client';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import '@/fontawesome.js';
import { CSSTransition } from 'react-transition-group';

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';

import { updateCart } from '@/redux/sliseCart';

import { ProductItemType, CartFaceType, OrderingType, Ptype } from '@/interfaces.js'

import { URL } from '@/options';

import Ordering from './Ordering';
import Image from 'next/image';


export default function Cart(){
    const router = useRouter();
    const dispatch = useDispatch();

    const cart:CartFaceType[] = useSelector(({sliseCart}) => sliseCart.cart);
    const goods:ProductItemType[] = useSelector(({sliseCart}) => sliseCart.selectedProducts);

    const [cartState, setCartState] = useState<CartFaceType[]>([]);
    const [checkeds, setCheckeds] = useState<String[]>([]);
    const [chengeAll, setChengeAll] = useState<boolean>(true);
    const [ordering, setOrdering] = useState<OrderingType | null>(null);
    
    useEffect(() => {
        setCheckeds(cart.map(elem => elem.id))
    }, [])
    
    useEffect(() => {
        setCartState(cart)
    },[cart])

    useEffect(() => {
        if(chengeAll){
            setCheckeds(cart.map(elem => elem.id))
        } else if(!chengeAll && checkeds.length === cart.length) {
            setCheckeds([])
        }
    }, [chengeAll])

    useEffect(() => {
        if(checkeds.length !== cartState.length){
            setChengeAll(false)
        }
    }, [checkeds])

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

    const counting = useMemo(():number => {
        return checkeds.reduce((result, item) => {
            const price = goods.find(elem => elem._id === item)?.price;
            const count = cartState.find(elem => elem.id === item)?.count;
            if(price && count){
                return result + price * count;
            }
            return 0
        },0)
    }, [checkeds, cartState]);

    const checkedUpdate = (e:React.ChangeEvent<HTMLInputElement>,id: string):void => {
        if(e.target.checked === true){
            setCheckeds([...checkeds, id])
        } else {
            setCheckeds(checkeds.filter(item => item !== id))
        }
    }

    const checkedAll = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setChengeAll(e.target.checked)
    }

    const countUpdate = (a: string, id:string) => {
        if(a === 'increment'){
            const newCart = cart.map(elem => {
                if(elem.id === id){
                    return {id, status: elem.status, count: elem.count + 1 }
                }
                return elem
            })
            dispatch( updateCart(newCart))
        }
        if(a === 'decrement'){
            const newCart = cart.map(elem => {
                if(elem.id === id && (elem.count - 1 !== 0 )){
                    return {id, status: elem.status, count: elem.count - 1 }
                }
                return elem
            })
            dispatch( updateCart(newCart))
        }
    }

    const delProductsCart = ():void => {
        const del = cart.filter(item => {
            if(!checkeds.includes(item.id)){
                return item
            }
        })
        dispatch(updateCart(del))
        setCheckeds([]);
    }

    const whatPicture = (p: string[] | undefined):string => {
        if(p){
            const pathPic = `${URL}/pic/${p[0]}`;
            if (p.length !== 0) return pathPic;  
            return ''
        }
        return ''
    }

    const orderPush = ():void => {
        const arr:Ptype[] = checkeds.map(elem => {
            const tavar = goods.find(item => item._id === elem);
            const nameProduct = tavar?.description;
            const priceProduct = tavar?.price;
            const countProduct = cartState.find(item => item.id === elem)?.count;
            return {name: nameProduct, count: countProduct, price: (priceProduct && countProduct) ? countProduct * priceProduct : 0 }
        })
        setOrdering({products: arr})
    }

    const closeOrder = ():void => {
        setOrdering(null)
    }


    return(
        <>
        <div className="cart_tittle">
            <h2>Корзина <span>{cartState.length}</span></h2>
        </div>
        <div className="cart_list_select_all">
            <div className="cart_list_checkbox">
                <input type="checkbox" id="select_cart" checked={chengeAll} onChange={(e) => {checkedAll(e)}}/>
                <label htmlFor="select_cart">выбрать все</label>
            </div>
            <div className="cart_list_del" onClick={() => (delProductsCart())}>Удалить выбранное</div>
        </div>
        <div className="cart_list_items">
            {cartState.map(elem => (
                <div className="cart_list_item" key={elem.id}>
                    <div className="cart_item_wrapper">
                        <div className="cart_item_check">
                            <input type="checkbox" name="" id={elem.id}  checked={checkeds.includes(elem.id)} onChange={(event) => {checkedUpdate(event,elem.id)}}/>
                            <label htmlFor={elem.id}></label>
                        </div>
                        <div className="cart_item_img" onClick={() => {router.push(`/products/${elem.id}`)}} >
                            <Image src={whatPicture(outPic(elem.id))} alt='' width={108} height={128}  />
                        </div>
                        <div className="cart_item_name" onClick={() => {router.push(`/products/${elem.id}`)}} >
                            { outName(elem.id) }
                        </div>
                        <div className="cart_item_count">
                            <div className="but_count" onClick={() => {countUpdate('decrement', elem.id)}}>-</div>
                            <div className="count">{elem.count}</div>
                            <div className="but_count" onClick={() => {countUpdate('increment', elem.id)}}>+</div>
                        </div>
                        <div className="cart_item_price">
                            {outPrice(elem.id)} <span><FontAwesomeIcon icon='ruble' size='sm' className='i_ruble'/></span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="cart_total">
            <div className="cart_total_content">
                <div className="cart_total_tittle">
                    {checkeds.length > 0  ? (<h2>Детали заказа</h2>) : (<h2>Ничего не выбрано</h2>)}
                </div>
                <div className={classNames("cart_total_price", {"total_none":(checkeds.length === 0)})}>
                    <div className="cart_count_price">
                        <div className="goods_items"> {checkeds.length} {checkeds.length === 1 ?'товар' : 'товара'}...................................................</div>
                        <div className="price_items"> {counting}<FontAwesomeIcon icon='ruble' size='sm' className='i_ruble'/></div>
                    </div>
                    <div className="cart_count_price">
                        <div className="goods_items"> Скидка....................................................</div>
                        <div className="price_items"> {0}<FontAwesomeIcon icon='ruble' size='sm' className='i_ruble'/></div>
                    </div>
                    <div className="cart_count_price">
                        <div className="goods_items"> Итого......................................................</div>
                        <div className="price_items"> {counting}<FontAwesomeIcon icon='ruble' size='sm' className='i_ruble'/></div>
                    </div>
                </div>
                <div className="cart_total_button">
                    <button disabled={checkeds.length === 0} onClick={() => {orderPush()}}>Заказать</button>
                </div>
            </div>
        </div>
        
        <CSSTransition in={(ordering !== null)?true:false} timeout={80} unmountOnExit classNames='order'>
            <Ordering productOrder={ordering} close={closeOrder}/>
        </CSSTransition>
        </>
    )
}
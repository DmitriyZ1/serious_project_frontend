'use client';

import { URL } from '@/options'

import '@/style/globals.css';
import '@/style/layout/basis.scss';
import '@/style/icons.scss';
import '@/style/layout/footer.scss';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import axios from 'axios'

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@/fontawesome.js';

import labelPic from '@/pict/all/label.png'

import {Locat, ChosingCity, EnterReg, UserMenu, Buy, Login, Likes, Catalog, Search, Warning, Footer} from '@/components';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { intend, loginStatus, updateLikes } from '@/redux/sliseLogin';
import { poputUpdate, warningUpdate } from '@/redux/slisePopup';
import { updateCart, updatePicked } from '@/redux/sliseCart';

import { CartFaceType, UserType, SityType } from "@/interfaces";


export default function Basis({ children, }:
    { children: React.ReactNode }) {

    const router = useRouter();
    const pathName = usePathname();
    
    const sityNameId:number = useSelector(({ sliseLocation }) => sliseLocation.sityLocation)
    const sityList:SityType[] = useSelector(({ sliseLocation }) => sliseLocation.listSity)
    const login:boolean = useSelector(( {sliseLogin} ) => sliseLogin.loginOn)
    const user:UserType = useSelector(( {sliseLogin} ) => sliseLogin.user)
    const popupLog:boolean = useSelector(({slisePopup}) => slisePopup.show)
    const popupWarning:boolean = useSelector(({slisePopup}) => slisePopup.warning)
    const cart:CartFaceType[] = useSelector(({sliseCart}) => sliseCart.cart)
    const likes:string[] = useSelector(({sliseLogin}) => sliseLogin.likes)
    const selectedProducts:CartFaceType[] = useSelector(({sliseCart}) => sliseCart.selectedProducts)
   
    const [showLocation, setShowLocation] = useState<boolean>(false)
    const [popupLocat, setPopupLocat] = useState<boolean>(false)
    const [showEnter, setShowEnter] = useState<boolean>(false)
    const [showBuy, setShowBuy] = useState<boolean>(false)
    const [showLikes, setShowLikes] = useState<boolean>(false)
    const [emptyCart, setEmptyCart] = useState<number>(0)
    const [emptyLike, setEmptyLike] = useState<number>(0) 
    const [catalog, setCatalog] = useState<boolean>(false)
    
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0,0);
        const userToken:string|null = window.localStorage.getItem('token');
        if(window.localStorage.getItem('token')){
            (async function(){
                try{
                    const response = await axios.post(URL + '/user', {userToken}, {headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    }});
                    const data = response.data;
                    if(data.action === "ok"){
                        dispatch(intend(data.user));
                        dispatch(loginStatus(true));
                    } else if(data.action === "not found" || data.action === "token expired"){
                        window.localStorage.removeItem('token');
                    }
                } catch(err) {
                    console.error(err)
                }
            })()
        }
        const goods = window.localStorage.getItem('cart');
        const arrGoods = goods ? JSON.parse(goods) : [];
        if(arrGoods.length > 0){
            dispatch(updateCart(arrGoods));
        }
        const l = window.localStorage.getItem('likes');
        const arrLikes = l ? JSON.parse(l) : [];
        if(arrLikes.length > 0){
            dispatch(updateLikes(arrLikes));
        }
    },[])

    useEffect(() => {
        if(pathName === '/cart'){
            setShowBuy(false)
        }
        if(pathName === '/favourites'){
            setShowLikes(false)
        }
    },[pathName])

    const reqUpdataList = () => {
        const cartArr:string[] = cart.map(elem => elem.id)
        const p:string[] = cartArr.concat(likes.filter(item => !cartArr.some(e => e === item)));
        (async function(){
            try{
                const response = await axios.get(URL + '/select',{params: {id: p.join(',')}});
                dispatch(updatePicked(response.data))
            } catch(err){
                console.error(err)
            }
        })()
    }
    
    useEffect(() => {
        if(cart.length > 0){
            if(!cart.every(elem => selectedProducts.some(item => item.id === elem.id))){
                reqUpdataList()
            }
            setEmptyCart(cart.length)
            window.localStorage.removeItem('cart')
            window.localStorage.setItem('cart', JSON.stringify(cart))
        } else {
            window.localStorage.removeItem('cart')
            setEmptyCart(0)
            setShowBuy(false)
        }
    }, [cart]);

    useEffect(() => {
        if(likes.length > 0){
            if(!likes.every(elem => selectedProducts.some(item => item.id === elem))){
                reqUpdataList()
            }
            setEmptyLike(likes.length)
            window.localStorage.removeItem('likes')
            window.localStorage.setItem('likes', JSON.stringify(likes))
        } else {
            window.localStorage.removeItem('likes')
            setEmptyLike(0)
            setShowLikes(false)
        }
    }, [likes])

    const outSiteLocation = (): String => sityList.find((elem: any) => elem.id === sityNameId)!.name;

    const lcheckCart = (a:boolean): void => {
        if(emptyCart > 0 && pathName !== '/cart') {
            setShowBuy(a)
        } 
    }

    const openClocseCatalog = ():void => {
        setCatalog(!catalog)
    }

    const lcheckLikes = (a:boolean): void => {
       if(emptyLike > 0 && pathName !== '/favourites') {
            setShowLikes(a)
       } 
    }
    
    const exitUser = ():void => {
        setShowEnter(false);
        dispatch(intend(null));
        dispatch(loginStatus(false));
        window.localStorage.removeItem('token');
        router.push('/');
    }

    const closeWarning = ():void => {
        dispatch(warningUpdate(false))
    }


    return (
        <div className="content">
            <div className="header_content">
                <div className="header_block">
                    <div className="header_block__app">
                        <div className="container">
                            <div className="header_navbar__app">
                                <div className="header_navbar__navigatiom">
                                    <div className="location_city nav_mar" onClick={() => { setPopupLocat(true) }} onMouseEnter={() => { setShowLocation(true) }} onMouseLeave={() => { setShowLocation(false) }} >
                                        <span>
                                            <FontAwesomeIcon icon='location-dot' size='sm' className='i_location' />
                                            {outSiteLocation()}
                                        </span>
                                    </div>
                                    <CSSTransition in={showLocation} timeout={50} unmountOnExit classNames='translocat'>
                                        <Locat outPopup={setPopupLocat} sity={outSiteLocation()} showLocation={setShowLocation} />
                                    </CSSTransition>
                                    <Link href="/shops" className='location_shops nav_mar'>Магазины</Link>
                                    <Link href="/delivery" className='location_delivery nav_mar'>Доставка</Link>
                                </div>
                                <div className="header_navbar__contact">
                                    <span className='phone_head'>
                                        <FontAwesomeIcon icon='phone' size='sm' className='i_phone'/>
                                         7-967-098-**-98
                                    </span>
                                    <span className='login_head' onClick={() => {if(login){router.push('/personal-account')} else {dispatch(poputUpdate(true))}}}>
                                        {login ? user.name : "Войти"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header_block__middle">
                        <div className="container">
                            <div className="header_navbar__middle">
                                <div className="middle_label">
                                    <Link href="/"> <img src={labelPic.src} alt="" /> </Link>
                                </div>
                                <div className="middle_button">
                                    <button className='button_bar' onClick={() => {openClocseCatalog()}}>
                                        {!catalog ? <FontAwesomeIcon icon='bars' size='sm' className='i_bars' /> : <FontAwesomeIcon icon='xmark' size='sm' className='i_bars' />}Каталог
                                    </button>
                                </div>
                                <Search />
                                <div className="middle_tab" >
                                    <div className="tab_enter tab_cart tab" onMouseEnter={() => {setShowEnter(true)}} onMouseLeave={() => { setShowEnter(false) }} onClick={() => {!login && dispatch(poputUpdate(true))}}>
                                        <FontAwesomeIcon icon='user' size='sm' className='i_user'/>
                                        <span>{login ? user.name : "Войти"}</span>
                                        <CSSTransition in={showEnter} timeout={50} unmountOnExit classNames={classNames({'transenter':!login},{'transuserwin':login} )}>
                                            {!login ? <EnterReg /> : <UserMenu exitfun={exitUser} />}
                                        </CSSTransition> 
                                    </div>
                                    <div className="tab_cart tab" onMouseEnter={() => {lcheckCart(true)}} onMouseLeave={() => {lcheckCart(false) }}>
                                        <FontAwesomeIcon icon='cart-shopping' size='sm' className='i_cart' />
                                        <span>Корзина</span>
                                        <div className= {classNames("cart_circle", {'show_none': emptyCart === 0}) }>{emptyCart}</div>
                                        <CSSTransition in={showBuy} timeout={50} unmountOnExit classNames='transBuy'>
                                            <Buy />
                                        </CSSTransition> 
                                    </div>
                                    <div className="tab_cart tab" onMouseEnter={() => {lcheckLikes(true)}} onMouseLeave={() => {lcheckLikes(false) }}>
                                        <FontAwesomeIcon icon='heart' size='sm' className='i_heart3' />
                                        <span>Избранное</span>
                                        <div className= {classNames("cart_circle", {'show_none': emptyLike === 0}) }>{emptyLike}</div>
                                        <CSSTransition in={showLikes} timeout={50} unmountOnExit classNames='transLikes'>
                                            <Likes />
                                        </CSSTransition> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {(emptyCart > 0 && pathName !== '/cart') && 
            <div className="flying_cart">
                <div className="tab_cart" onClick={() => {router.push('/cart')}}>
                    <FontAwesomeIcon icon='cart-shopping' size='sm' className='i_cart4'/>
                    <div className= {classNames("cart_circle", {'show_none': emptyCart === 0}) }>{emptyCart}</div>
                </div>
            </div>}
            
            <CSSTransition in={popupLocat} timeout={50} unmountOnExit classNames='trans'>
                <ChosingCity outPopup={setPopupLocat} />
            </CSSTransition>
            
            <CSSTransition in={popupLog} timeout={50} unmountOnExit classNames='trans'>
                <Login />
            </CSSTransition>
            
            <CSSTransition in={catalog} timeout={100} unmountOnExit classNames='trans'>
                <Catalog openClose={openClocseCatalog} />
            </CSSTransition>

            {children}

            {popupWarning && <Warning openClose={closeWarning} />}
            <div className="footer">
                <Footer />
            </div>
        </div>
    )
}

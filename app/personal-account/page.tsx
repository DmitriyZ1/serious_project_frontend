'use client';

import axios from 'axios';
import { URL } from '@/options';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@/fontawesome.js';

import '@/style/account/account.scss';

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { intend, loginStatus } from '@/redux/sliseLogin';

import { useRouter } from 'next/navigation'
import {ShadowNav} from "@/components/";

import { UserType } from '@/interfaces.js';


export default function Account() {
    const dispatch = useDispatch();

    const user:UserType = useSelector(( {sliseLogin} ) => sliseLogin.user);
    const [nameUser, setNameUser] = useState<string>('');
    const [telUser, setTelUser] = useState<string>('');
    const [mailUser, setMailUser] = useState<string>('');
    const [discountsUser, setDiscountsUser] = useState<Object[]>([]);
    const [ordersUser, setOrdersUser] = useState<Object[]>([]);
    const [bonusesUser, setBonusesUser] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
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
                        router.push('/')
                    }
                } catch(err) {
                    console.error(err)
                }
            })()
        }
    },[])

    useEffect(() => {
        if(user){
            setNameUser(user.name);
            setTelUser(user.tel);
            setMailUser(user.mail);
            setDiscountsUser(user.discounts);
            setOrdersUser(user.orders);
            setBonusesUser(user.bonuses); 
        }
    }, [user])

    const switchingEdit = ():void => {
        router.push('personal-account/edit')
    }

    const exitUser = ():void => {
        dispatch(intend(null));
        dispatch(loginStatus(false));
        window.localStorage.removeItem('token');
        router.push('/');
    }
    
    return (
        <>
            <ShadowNav />
            <div className="account">
                <div className="selection">
                    <h1>Личный кабинет</h1>
                    <div className="account_messages account_frame">
                        <div className="account_messages_content">
                            <p>Здравствуйте, <strong>{nameUser}</strong>, добро пожаловать в личный кабинет </p>
                        </div>
                    </div>
                    <div className="account_blocks">
                        <div className="column_equal">
                            <div className="account_my_data account_frame account_block_item">
                                <div className="my_data_content">
                                    <div className="my_data_head">
                                        <div className="my_data_head_tittle">
                                            <FontAwesomeIcon icon='user' size='sm' className='i_user3'/>
                                            <h2>Личные данные</h2>
                                        </div>
                                        <div className="my_data_head_button">
                                            <button className="but_account_edit" onClick={() => {switchingEdit()}}>Измнить</button>
                                        </div>
                                    </div>
                                    <div className="my_data_primary">
                                        <div className="my_data_name">{nameUser}</div>
                                        <div className="my_data_tel">тел:{telUser}</div>
                                        <div className="my_data_mail">{mailUser}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="account_my_discounts account_frame account_block_item">
                                <div className="my_discounts_content">
                                    <div className="my_discounts_head">
                                        <div className="my_discounts_head_tittle">
                                            <FontAwesomeIcon icon='percent' size='sm' className='i_percent'/>
                                            <h2>Скидки</h2>
                                        </div>
                                    </div>
                                    <div className="my_discounts_info">
                                        {(discountsUser.length === 0) && <p className="absence">У вас пока нет скидок</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column_equal">
                            <div className="account_my_orders account_frame account_block_item">
                                <div className="my_orders_content">
                                    <div className="my_orders_head">
                                        <div className="my_orders_head_tittle">
                                            <FontAwesomeIcon icon='cart-shopping' size='sm' className='i_cart2'/>
                                            <h2>Заказы</h2>
                                        </div>
                                    </div>
                                    <div className="my_orders_info">
                                        {(ordersUser.length === 0) && <p className="absence">У вас пока нет заказов</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="account_my_bonuses account_frame account_block_item ">
                                <div className="my_bonuses_content">
                                    <div className="my_bonuses_head">
                                        <div className="my_bonuses_head_tittle">
                                            <FontAwesomeIcon icon='credit-card' size='sm' className='i_card'/>
                                            <h2>Баланс бонусных рублей</h2>
                                        </div>
                                    </div>
                                    <div className="my_bonuses_info">
                                        {(bonusesUser === 0) && <p className="absence">У вас нет бонусных рублей</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="exit_user_account" onClick={() => {exitUser()}}> Выйти </div>
                </div>     
            </div>
        </>
      )
  }
  
'use client';

import { useDispatch, useSelector } from 'react-redux';
import { poputUpdate } from '@/redux/slisePopup';
import classNames from 'classnames';

export default function CartEmpty(){

    const dispatch = useDispatch();
    const login:boolean = useSelector(( {sliseLogin} ) => sliseLogin.loginOn);
  
    return(
            <div className="cart_empty">
                <h2> Корзина пуста  </h2>
                <div className={classNames("cart_empty_button", {'but_none' : login} )} >
                    <button onClick={() => {dispatch(poputUpdate(true))}}>Авторизоваться</button>
                </div>
            </div>
        )
}
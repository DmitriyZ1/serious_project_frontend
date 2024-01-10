'use client';

import '@/style/layout/login.scss';

import axios from 'axios'
import { URL } from '@/options';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@/fontawesome.js';

import { useRouter } from 'next/navigation';

import classNames from 'classnames';

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { intend, loginStatus, addPhone } from '@/redux/sliseLogin';

import { poputUpdate } from '@/redux/slisePopup';


export default function Login(){
    const router = useRouter();

    const logRef = useRef<HTMLInputElement>(null);
    const [inputTel, setInputTel] = useState<any>('+7');
    const [buttonPas, setbuttonPas] = useState<boolean>(true);
    const dispatch = useDispatch();

    const textFilter = (e:React.ChangeEvent<HTMLInputElement>):void => {
        if(e.target.value.length === 12) {
            setbuttonPas(false)
        } else {
            setbuttonPas(true)
        };

        if(e.target.value.length < 2){
            setInputTel("+7")
        }  else {
            if(e.target.value.match(/[0-9]$/)){
                setInputTel(e.target.value);
            }
        }
    }

    const intendification = () => {
        const phone = logRef.current?.value;
        (async function(){
            try{
                const response = await axios.post(URL + '/login', {phone}, {headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }});
                const data =response.data;
                if(data.action === "ok"){
                    dispatch(intend(data.user));
                    dispatch(loginStatus(true));
                    window.localStorage.setItem('token', data.token);
                } else if(data.action === "not found"){
                    dispatch(addPhone(logRef.current?.value));
                    router.push('/reg');
                }
            } catch(err) {
                console.error(err)
            }
        })()
        dispatch(poputUpdate(false))
    }

    return(
        <div className="login_background">
            <div className="login_block">
                <div className='login_xmark' onClick={() => {dispatch(poputUpdate(false))}}>
                    <FontAwesomeIcon icon='xmark' size='sm' className='i_xmark'/>
                </div>
                <div className="login_content">
                    <h3>Вход или регистрация</h3>
                    <div className="login_input">
                        <span>Телефон</span>
                        <input type="text" ref={logRef} value={inputTel} onChange={textFilter}/>
                        <button className={classNames({'butpassive': buttonPas})} onClick={()=> {intendification()}}>Продолжить</button>                        
                    </div>
                </div>
            </div>
        </div>
    )
}
'use client';

import { useRouter } from 'next/navigation';

import axios from 'axios';
import { URL } from '@/options';

import {ShadowNav, ArrowBack} from '@/components/';

import '@/style/reg/reg.scss'

import { useState, useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { intend, loginStatus } from '@/redux/sliseLogin';

export default function Reg(){
    const dispatch = useDispatch()
    const router = useRouter()

    const temTel:string = useSelector(({sliseLogin}) => sliseLogin.temporaryPhone)
   
    const nameRef = useRef<HTMLInputElement>(null);
    const mailRef = useRef<HTMLInputElement>(null);
    const [userTel, setUserTel] = useState<string>(''); 

    
    useEffect(() => {           
        setUserTel(temTel)
    }, [])

    const postForm = () => {
        if(!userTel) router.push('/')
        const nameUser = nameRef.current?.value;
        const mailUser = mailRef.current?.value;
        if(nameUser === ''){
            nameRef.current?.classList.add('err_input')
            nameRef.current?.focus()
        } else if(mailUser === ''){
            mailRef.current?.classList.add('err_input')
            mailRef.current?.focus()
        } else if(nameUser !== '' && mailUser !== ''){
            if(mailUser?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
                const form = {tel: temTel, name: nameUser,  mail: mailUser};
                (async function(){
                    try{
                        const response = await axios.post(URL + '/reg', form, {headers: {
                            'Accept' : 'application/json',
                            'Content-Type' : 'application/json'
                        }});
                        const data = response.data;
                        if(data.action === "ok"){
                            dispatch(intend(data.user));
                            dispatch(loginStatus(true));
                            window.localStorage.setItem('token', data.token);
                            router.push('/')
                        } 
                    } catch(err) {
                        console.error(err)
                        router.push('/')
                    }
                })() 
            } else {
                mailRef.current?.classList.add('err_input')
                mailRef.current?.focus()
            }
        }
    }    


    return (
        <>
        <ShadowNav />
        <div className="reg">
            <div className="reg_container">
                <ArrowBack patch='/' />
                <div className="reg_form">
                    <div className="reg_form_content">
                        <h2>Регистрация</h2>
                        <label htmlFor="inp_name">Имя</label>
                        <input type="text" id='inp_name' ref={nameRef}/>
                        <label htmlFor="inp_mail">E-mail</label>
                        <input type="text" id='inp_mail' ref={mailRef}/>
                        <button onClick={() => {postForm()}}>Зарегистрироваться</button>
                        <div className='reg_confir'>Номер телефона: {userTel}</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
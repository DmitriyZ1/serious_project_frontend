'use client';

import '@/style/account/edit.scss'

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { URL } from '@/options';

import {ShadowNav, ArrowBack} from '@/components/';

import { useRouter } from 'next/navigation';


export default function Edit(){
    const router = useRouter();
    
    const nameRef = useRef<HTMLInputElement>(null);
    const mailRef = useRef<HTMLInputElement>(null);
    const [inpName, setInpName] = useState<string>(''); 
    const [inpMail, setMailName] = useState<string>(''); 
    const [userTel, setUserTel] = useState<string>(''); 
   
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
                        const user = data.user;
                        setInpName(user.name)
                        setMailName(user.mail)
                        setUserTel(user.tel)
                    } 
                } catch(err) {
                    console.error(err)
                }
            })()
        }
    }, [])

    const editUser = ():void => {
        const nameR = nameRef.current?.value;
        const mailR = mailRef.current?.value;
        if(nameR === ''){
            nameRef.current?.classList.add('err_input')
            nameRef.current?.focus()
        }else if(mailR === ''){
            mailRef.current?.classList.add('err_input')
            mailRef.current?.focus()
        }else if(nameR !== '' && mailR !== ''){
            if(mailR?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
                const form = {name: nameR, mail: mailR}
                const userToken:string|null = window.localStorage.getItem('token');
                (async function(){
                    try{
                        const response = await axios.patch(URL + '/edit', {userToken, form}, {headers: {
                            'Accept' : 'application/json',
                            'Content-Type' : 'application/json'
                        }});
                        const data = response.data;
                        if(data.action === "ok"){
                            router.push('/personal-account')
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
        <div className="edit">
            <div className="edit_container">
                <ArrowBack patch='/personal-account' />
                <div className="edit_form">
                    <div className="edit_form_content">
                        <h2>Личные данные</h2>
                        <label htmlFor="inp_name">Имя</label>
                        <input type="text" id='inp_name' ref={nameRef} defaultValue={inpName}/>
                        <label htmlFor="inp_mail">E-mail</label>
                        <input type="text" id='inp_mail' ref={mailRef} defaultValue={inpMail}/>
                        <button onClick={() => {editUser()}}>Подтвердить изменения</button>
                        <div className='edit_confir'>Подтверждение номер телефона: {userTel}</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
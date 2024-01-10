'use client';

import '@/style/comments/comments.scss'

import axios from 'axios'
import { URL } from '@/options';

import { useRouter } from 'next/navigation';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@/fontawesome';
import '@/style/icons.scss'

import {ArrowBack, ShadowNav} from '@/components/';

import { useState, useEffect, ReactElement, useRef } from 'react';
import { useSelector } from 'react-redux';

import classNames from 'classnames';

import {RoutingParams, CommentItem } from '@/interfaces.js'


export default function Comments({ params }: RoutingParams) {
    const router = useRouter();

    const [item, setItem] = useState<CommentItem[]|null|undefined>(null);
    const [star, setStar] = useState<number>(0);
    const [showForm, setShowForm] = useState<Boolean>(false);
    const [loginForm, setLoginForm] = useState<Boolean>(false);
    const login:boolean = useSelector(({ sliseLogin }) => sliseLogin.loginOn);
    const textRef = useRef<HTMLTextAreaElement>(null);
    
    useEffect(() => {
        (async function(){
            try{
                const response = await axios.get(URL + '/comments/' + params.id);
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

    const dropStars = (r: number | undefined, cl: string):ReactElement[] | null => {
        if (r) {
            return Array.from({ length: r }, (e, i) => (<FontAwesomeIcon icon='star' size='sm' className={cl} key={i} />))
        }
        else
            return null
    }

    const buttonStars = ():ReactElement[] | null=> {
        return [1,2,3,4,5].map((item,idx)  => (
            <div className={classNames("button_star",{'star_button_active': item <= star})} onClick={() => {setStar(item)}}  key={idx}>
                <FontAwesomeIcon icon='star' size='sm' className='i_star4'/>
            </div>
        ))
    }

    const formControl = ():void => {
        if(showForm){
            setShowForm(false)
        } else {
            setShowForm(true)
        }
    }

    useEffect(() => {
        setLoginForm(login)
    }, [login])

    const postComment = ():void => {
        const text = textRef.current?.value;
        if(text !==  ''){
            const userToken:string|null = window.localStorage.getItem('token');
            if(userToken){
                const form = {star, text};
                (async function(){
                    try{
                        const response = await axios.post(URL + '/comments/' + params.id, {form, userToken}, {headers: {
                            'Accept' : 'application/json',
                            'Content-Type' : 'application/json'
                        }});
                        const data = response.data;
                    } catch(err) {
                        console.error(err)
                    }
                })()
            }else{
                router.push('/')
            }
        } else {
            textRef.current?.focus();
        }
    }

    return (
        <>
       <ShadowNav />
        <div className="comments">
            <div className="container">
                <ArrowBack patch={`/products/${params.id}`}/>
                <div className="comments_content">
                    <div className="comments_push">
                            <button disabled={!loginForm} className='c_p_button' onClick={() => {formControl()}}>Написать отзыв</button>
                            {!loginForm && <span>Чтобы оставить отзыв вам нужно авторизаваться</span>}
                        
                       {showForm && <div className="comments_form">
                            <div className="c_f_stars">{buttonStars()}</div>
                            <textarea disabled={star == 0} name="" id="" cols={50} rows={10} ref={textRef}></textarea>
                            <button disabled={star == 0} className='c_f_button' onClick={() => {postComment()}}>Опубликовать</button>
                        </div>}
                    </div>
                    <div className="product_reviews">
                        <div className="product_reviews_title">
                            <h4>Отзывы <span>{item?.length }</span></h4>
                        </div>
                        <div className="product_reviews_rating">
                            {dropStars(5, 'i_star3')} <span>5.0</span>
                        </div>
                        <ul className="product_reviews_list">
                            {item && item.length > 0 && item.map(elem => (
                                <li className='p_rev_item' key={elem.id}>
                                    <div className="p_rev_item_name">{elem.name} <span>{elem.date}</span></div>
                                    <div className="p_rev_item_bals">{dropStars(elem.estimation, 'i_star2')} <span>{elem.estimation}</span> </div>
                                    <div className="p_rev_item_text">{elem.text}</div>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
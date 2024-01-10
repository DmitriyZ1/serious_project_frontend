'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@/fontawesome.js';

import { useRouter } from 'next/navigation';

import { useRef } from "react";

export default function Search(){
    const router = useRouter();

    const searchText = useRef<HTMLInputElement>(null);

    const startSearch = ():void => {
        const text:string | undefined = searchText.current?.value.toLocaleLowerCase().trim();
        if(text){
            const format = text?.split(' ').filter(elem => elem !== '').join('+');
            const param = `?search=${format}`;
            router.push(`/goods${param}&page=1`);
        }
    }

    return (
        <div className="middle_input">
            <input type="text" ref={searchText} onKeyDown={(e) => {if(e.code === "Enter"){startSearch()}}} />
            <div className="input_search">
                <div className="input_search__button" onClick={() => {startSearch()}}>
                    <FontAwesomeIcon icon='magnifying-glass' size='sm' className='i_glass' />
                </div>
            </div>
        </div>
    )
}
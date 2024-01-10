'use client';

import '@/style/layout/catalog.scss';

import { catalogObj } from '@/excess/catalogObj'
import classNames from 'classnames';

import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

import { CatalogMenuType } from '@/interfaces';


export default function Catalog({openClose}: {openClose: () => void}){
    const router = useRouter();

    const [menuActiv, setMenuActiv] = useState<CatalogMenuType[]>([]); 
    const [act, setAct] = useState<string>(catalogObj[0].id);

    useEffect(() => {
        const elem = catalogObj.find(item => item.id === act);
        if (elem) setMenuActiv(elem?.list);
    },[act])

    useEffect(() => {
        setMenuActiv(catalogObj[0].list);
    },[])
    
    return (
        <div className="catalog">
            <div className="catalog_background">
                <div className="catalog_block">
                    <div className="catalog_content">
                        <div className="cat_left_menu">
                            <ul>
                                {catalogObj.map(elem => (
                                    <li className={classNames({'activ_li': elem.id === act})} 
                                        onMouseEnter={() => {setAct(elem.id)}} 
                                        key={elem.id}>
                                        {elem.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="cat_right_menu">
                            <ul>
                               {menuActiv && menuActiv.map(elem => (
                                    <li key={elem.id} onClick={() => {router.push(elem.link); openClose()}}>{elem.name}</li>
                               ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
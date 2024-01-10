'use client';

import '@/style/delivery/delivery.scss'

import {VarinatA,  VarinatB, ShadowNav} from '@/components/'

import { useState } from 'react';
import classNames from 'classnames';


export default function Delivery() {
    const [variant, setVariant] = useState<boolean>(false);
   
    return (
        <>
        <ShadowNav />
        <div className="delivery">
            <div className="delivery_title">
                <h2>Доставка курьером или самовывоз</h2>
            </div>
            <div className="delivery_megaTitle">
                <div className="delivery_container">
                    <div className="megaTitle_content">
                        <h3 className="megaTitle_text"> Выберите удобный для вас способ получения заказа</h3>
                        <div className="megaTitle_pic"></div>
                    </div>
                </div>
            </div>
            <div className="delivery_tabs">
                <div className={classNames("d_tabs_left", {"activ_tabs": !variant})}  onClick={() => {setVariant(false)}}>Самовывоз</div>
                <div className={classNames("d_tabs_right", {"activ_tabs": variant})} onClick={() => {setVariant(true)}}>Доставка</div>
            </div>
            {variant ? <VarinatA/> : <VarinatB/>}
        </div>
        </>
      )
}
  
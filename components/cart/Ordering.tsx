'use client';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import '@/fontawesome.js';
import { OrderingType } from '@/interfaces.js'
import '@/style/cart/ordering.scss'

import picMir from '@/pict/all/visa-mastercard-mir.jpg'
import picSbp from '@/pict/all/1602741_amp.jpeg'


export default function Ordering({productOrder, close} :{productOrder: OrderingType|null , close: () => void}){

    const allPrice = ():number => {
        const tavar = productOrder?.products;
        if (Array.isArray(tavar)) {
            return tavar.reduce((acc, item) => {
                acc = acc += (item.price || 0);
                return acc
            }, 0)
        }
        return 0
    }

    return (
        <>  
        <div className="ord_background" onClick={close}>
            <div className="ord_block" onClick={(e) => {e.stopPropagation()}} >
                <div className="ord_content">
                    <h3 className='ord_title'>Ваш заказ</h3>
                    <div className="ord_xmark"><FontAwesomeIcon icon='xmark' size='sm' className='i_xmark' onClick={close}/></div>
                    <div className="ord_list">
                        <ul className='ord_list_content'>
                            {productOrder?.products.map(elem => (
                                <li className='ord_list_item' key={elem.name}>
                                    <div className="ord_item_name">{elem.name}</div>
                                    <div className="ord_item_count">{elem.count}</div>
                                    <div className="ord_item_price">{elem.price} <FontAwesomeIcon icon='ruble' size='sm' className='i_ruble'/></div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="ord_all_price">Заказ на сумму <span>{allPrice()}</span>  <FontAwesomeIcon icon='ruble' size='sm' className='i_ruble'/></div>
                    <div className="ord_bank">
                        <div className="ord_bank_pic"><img src={picMir.src} alt="mir" className='pic_mir'/></div>
                        <div className="ord_bank_pic"><img src={picSbp.src} alt="sbp" className='pic_sbp' /></div>
                    </div>
                    <div className="ord_warning"><span>Внимание!</span>  На сайте нельзя совершать покупки так как сайт не является интернет магазином. Приложение сосзданно с демонстрационной целью и предназначено только для просмотра. </div>
                </div>
            </div>
        </div>
        </>
    )
}

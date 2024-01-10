'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@/fontawesome.js';

import '@/style/layout/warning.scss'


export default function Warning({openClose}: {openClose:() => void}){

    return (
        <div className="warning_block">
            <div className="warning_x" onClick={() => {openClose()}}>
                <FontAwesomeIcon icon='xmark' size='sm' className='i_xmark'/>
            </div>
            <div className="warning_content">
                <div className="warning_text">
                    <h3>Внимание!</h3>
                    <div className="warning_info">Сайт не является интернет магазином! Представленный тавар не продается! Данное веб-приложенеие созданно в демонстрационных целях и предназначено только для просмотра.</div>
                    <button className="warning_ok" onClick={() => {openClose()}}>Ok</button>
                </div>
            </div>
        </div>
    )
}
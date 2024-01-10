import '@/style/layout/locat.scss';
import '@/style/icons.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import '../../fontawesome.js';

export default function Locat({showLocation, outPopup, sity}: {
    showLocation: (a:boolean) => void;
    outPopup: (a: boolean) => void;
    sity: String;
}){
    
    return(
        <div className="location">
            <div className="location_interactive"  onMouseEnter={() => {showLocation(true)}}  onMouseLeave={() => {showLocation(false)}} >
                <div className="location_block">
                    <div className="location_content">
                        <div className='location_question'><FontAwesomeIcon icon='paper-plane' size='sm' className='i_plane'/>
                            <span>Ваш город</span> 
                            <strong> {sity} </strong> ? </div>
                        <div className="location_buttons">
                            <button className='location_but'>Верно</button>
                            <div className='location_dany' onClick={() => outPopup(true)}> Выбрать другой</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import '@/style/layout/enterReg.scss';
import '@/style/icons.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@/fontawesome.js';

import { poputUpdate } from '@/redux/slisePopup';
import { useDispatch } from 'react-redux';


export default function EnterReg(){
    const dispatch = useDispatch();

    return(
        <div className="enter">
            <div className="enter_interactive">
                <div className="enter_block">
                    <div className="enter_content">
                        <div className="enter_info" onClick={() => {dispatch(poputUpdate(true))}}>
                            <FontAwesomeIcon icon='user' size='sm' className= 'i_user2'  />
                            <span>Вход или регистрация</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
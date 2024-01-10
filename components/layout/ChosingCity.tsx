import '@/style/layout/chosingCity.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@/fontawesome.js';

import { useDispatch, useSelector } from 'react-redux';
import { selectSity } from '@/redux/sliseLocation';
import { SityType } from '@/interfaces';



export default function ChosingCity({outPopup} : {outPopup: (a: boolean) => void}) {
    const dispach = useDispatch();
    const sityNameId:number = useSelector(({ sliseLocation }) => sliseLocation.sityLocation);
    const sityList: SityType[] = useSelector(({ sliseLocation }) => sliseLocation.listSity);
   
    return (
        <div className="chosing_background">
            <div className="chosing_block">
                <div className='chosing_xmark' onClick={() => {outPopup(false)}}>
                    <FontAwesomeIcon icon='xmark' size='sm' className='i_xmark'/>
                </div>
                <div className="chosing_content">
                    <h3>Выберите город</h3>
                    <ul className='city_list'>
                        {sityList.map((item:any) => (
                            <li className='city_list_item' key={item.id} onClick={() => {dispach(selectSity(item.id)); outPopup(false);}}>
                                <div className="city_name">{item.name}</div>
                                <div className="city_marker">
                                    {(item.id === sityNameId) &&  <FontAwesomeIcon icon='check' size='sm' className='i_check'/> }
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
import Link from 'next/link';

import vkIcon from '@/pict/all/VK-Icon_icon-icons.com_52860.ico';
import telegrIcon from '@/pict/all/telegram_icon-icons.com_53603.ico';

import { useRouter } from 'next/navigation';

import { useSelector, useDispatch } from 'react-redux';
import { poputUpdate } from '@/redux/slisePopup'

export default function Footer(){
    const router = useRouter();
    const dispatch = useDispatch();

    const login:boolean = useSelector(( {sliseLogin} ) => sliseLogin.loginOn)
    
    const cabinet = ():void => {
        if(login) router.push('/personal-account')
        else dispatch(poputUpdate(true))
    }


    return(
       <>
            <div className="footer_content">
                <div className="footer_block">
                    <ul className="footer_list">
                        <li className="footer_list_item"><Link href="/bicycles?sort=rating" className='footer_list_link'>Велосипеды</Link></li>
                        <li className="footer_list_item"><Link href="/scooters?sort=rating" className='footer_list_link'>Самокаты</Link></li>
                        <li className="footer_list_item"><Link href="/skateboards?sort=rating" className='footer_list_link'>Скейтборды</Link></li>
                        <li className="footer_list_item"><Link href="/delivery" className='footer_list_link'>Доставка</Link></li>
                        <li className="footer_list_item"><div className='footer_list_link' onClick={() => {cabinet()}}>Личный кабинет</div></li>
                    </ul>
                </div> 
                <div className="footer_block">
                    <ul className="footer_list">
                        <li className="footer_list_item"><Link href="/" className='footer_list_link'>О нас</Link></li>
                        <li className="footer_list_item"><Link href="/shops" className='footer_list_link'>Магазины</Link></li>
                        <li className="footer_list_item"><Link href="/" className='footer_list_link'>Партнеры</Link></li>
                        <li className="footer_list_item"><Link href="/" className='footer_list_link'>Сотрудничество</Link></li>
                    </ul>
                </div> 
                <div className="footer_block">
                    <div className="footer_tel">+7 967 098 ** 98</div>
                    <div className="footer_icons">
                        <div className="footer_icon">
                            <Link href="https://vk.com/dmitriy_z_ov" className='footer_list_link'>
                                <img src={vkIcon.src} alt="VK" className='icon_imgv'/>
                            </Link>
                        </div>
                        <div className="footer_icon">
                            <Link href="https://t.me/DmitriyZv22" className='footer_list_link'>
                                <img src={telegrIcon.src} alt="Telegram" className='icon_imgt'/>
                            </Link>
                        </div>
                    </div>
                </div> 
            </div>
       </>
    )
} 
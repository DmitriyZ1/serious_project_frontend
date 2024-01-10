import '@/style/layout/userMenu.scss';
import '@/style/icons.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@/fontawesome.js';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';


export default function UserMenu({exitfun}:{exitfun: () => void}){

    const userName = useSelector(( {sliseLogin} ) => sliseLogin.user.name);
    const router = useRouter();

    return(
        <div className="userwin">
            <div className="userwin_interactive">
                <div className="userwin_block">
                    <div className="userwin_content">
                        <div className="userwin_name">
                            <div className="userwin_name_block">
                                <FontAwesomeIcon icon='user' size='sm' className= 'i_user3' />
                                <span>{userName}</span>
                            </div>
                        </div>
                        <div className="userwin_cabinet" onClick={()=> {router.push('/personal-account')}}>
                            <div className="userwin_cabinet_block">
                                <span>Личный кабинет</span>
                            </div>
                        </div>
                        <div className="userwin_exit" onClick={()=> {exitfun()}}>
                            <div className="userwin_exit_block">
                                <span>Выход</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
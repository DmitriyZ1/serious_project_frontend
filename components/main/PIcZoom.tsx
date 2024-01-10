'use client';

import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@/fontawesome.js';

import '@/style/main/picZoom.scss'


export default function PicZoom({pic, funOut}: {pic: string, funOut: () => void}){
    
    return (
        <div className="pic_background" onClick={() => {funOut()}}>
            <div className="pic_content" onClick={(e) => {e.stopPropagation()}}>
                <div className="pic_img">
                    <div className="pic_xmark" onClick={(e) => {funOut()}} >
                        <FontAwesomeIcon icon='xmark' size='sm' className='i_xmark'/>
                    </div>
                    <Image src={pic} alt='' width={525} height={700}  />
                </div>
            </div>
        </div>
    )
}
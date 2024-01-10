'use client';

import '@/style/sliders/sliders.scss';

import SliderBig from './SliderBig';
import SliderLittle from './SliderLittle';

export default function Sliders(){

    return(
        <div className="sliders">
            <SliderBig/>
            <SliderLittle />
        </div>
    )

}
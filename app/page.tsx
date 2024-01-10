
'use client';

import '@/style/main/main.scss';
import '@/style/icons.scss';

import {Sliders, Collection, NavProducts, Poster} from '@/components/';

import PosterSale1  from '@/pict/all/skid.jpg';
import PosterSale2  from '@/pict/all/black.jpg';


export default function Home() {
  
    return (
        <div className="main">
            <NavProducts/>
            <div className="container">
                <Sliders/>
            </div>
            <Collection />
            <Poster  picPuth={PosterSale1.src}/>
        </div>
    )
}

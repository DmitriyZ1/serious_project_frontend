
import classNames from 'classnames';

import pic1 from '@/pict/slider/slider1.jpg'
import pic2 from '@/pict/slider/slider2.jpg'
import pic3 from '@/pict/slider/slider3.jpg'
import pic4 from '@/pict/slider/slider4.jpg'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@/fontawesome.js';

import { useState, useEffect } from 'react';

export default function SliderBig(){
    const [pics, setPics] = useState<string[]>([]);
    const [showItemPic, setShowItemPic] = useState<number>(0);
    const [itemPicsMax, setItemPicsMax] = useState<number>(0);

    useEffect(() => {
        setPics([pic1.src, pic2.src, pic3.src, pic4.src]);
    },[]);
    useEffect(() => {
        setItemPicsMax(pics.length)
    }, [pics]);

    const swichPic = (leaf:string):void => {
        if(leaf === 'right' && (showItemPic + 1 < itemPicsMax)){
            setShowItemPic(e =>  e+1)
        }else if(leaf === 'right' && showItemPic + 1 >= itemPicsMax){
            setShowItemPic(0)
        }
        if(leaf === 'left' && (showItemPic - 1 > -1)){
            setShowItemPic(e => e-1)
        }else if(leaf === 'left' && showItemPic - 1 <= -1){
            setShowItemPic(itemPicsMax - 1)
        }
    }
    const swichCarousel = (item:number):void => {
        setShowItemPic(item);
    }

    return (
        <div className='slider_big'>
            <div className="slider_big_block">
                <div className="slider_big_pics">
                    <div className="slider_b_angle_left angle" onClick={() => {swichPic("left")}}>
                        <FontAwesomeIcon icon='angle-left' size='sm' className='i_angle'/>
                    </div>
                    <div className="slider_b_angle_right angle" onClick={() => {swichPic("right")}}>
                        <FontAwesomeIcon icon='angle-right' size='sm' className='i_angle'/>
                    </div>
                    <div className="big_pictures">
                        {pics.map((elem,index) => (
                            <div className={classNames("big_pictures_item", {"show_item_slider" : (index === showItemPic)})} key={index}>
                                <img src={elem} alt=""/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="slider_big_pswich">
                    <div className="pswich">
                        {pics.map((elem, index) => (
                            <div className="carousel" key={index}  onClick={() => {swichCarousel(index)}}>
                                <div className={classNames("carousel_but",{"but_active": (index === showItemPic)} )}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
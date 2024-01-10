import Link from "next/link";

import '@/style/attrebute/navProducts.scss'

import { useState, useEffect,useCallback } from "react";
import classNames from "classnames";


export default function NavProducts(){

    const [showNav, setShowNav] = useState<boolean>(false);

    const handleScroll = useCallback(() => {
        if (window.scrollY > 40) {
            setShowNav(true)
        } else {
            setShowNav(false)
        };
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return(
        <>
        {!showNav &&  <div className="header_block__bottom">
            <div className="container">
                <div className="header_bottom_nav">
                    <div className="bottom_nav_a">
                        <Link href="/bicycles?sort=rating&page=1">велосипеды</Link>
                    </div>
                    <div className="bottom_nav_a">
                        <Link href="/scooters?sort=rating&page=1">самокаты</Link>
                    </div>
                    <div className="bottom_nav_a">
                        <Link href="/skateboards?sort=rating&page=1">скейтборды</Link>
                    </div>
                </div>
            </div>
        </div>}
        <div className={classNames('border_down', { 'border_scroll': showNav })} > </div>
        </>
    )
}
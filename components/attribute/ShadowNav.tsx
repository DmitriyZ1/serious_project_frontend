'use client';

import { useState, useCallback, useEffect } from 'react';


export default function ShadowNav(){

    const [shadowNav, setShadowNav] = useState<boolean>(false);
    const handleScroll = useCallback(() => {
        if (window.scrollY > 40) {
            setShadowNav(true)
        } else {
            setShadowNav(false)
        };
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [handleScroll]);
    

    return (
        <>
        {shadowNav && <div className="shadow_nav"></div>}
        </>
    )
}
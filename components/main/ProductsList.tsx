'use client';

import axios from 'axios';
import { URL } from '@/options'

import '@/style/main/productsList.scss';
import {ArrowBack, ProductItem, NavProducts} from '@/components/';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'

import {ProductItemType, FiltObjType,FiltParseType, FilterListType} from '@/interfaces';


export default function ProductsList({filtData, tittle, url}:{
    filtData: FilterListType,
    tittle: string,
    url: string
}){
    const par = useSearchParams(); 
    const [filtProduct, setFiltProduct] = useState<FiltObjType>({category:[], brand:[], price:[], sort: "", page: ""})
    const [inpPrice, setInpPrice] = useState<string[]>(['1000','2000'])
    const [selectionProducts, setSelectionProducts] = useState<ProductItemType[]>([]);
    const router = useRouter();
    
    useEffect(() => {
        const parse = Object.fromEntries(par.entries());
        if(Object.keys(parse).length !== 0){
            const obj:FiltParseType  = {}
            if(parse.category && parse.category.length !== 0){
                obj.category = parse.category.split(',')
            }
            if(parse.brand && parse.brand.length !== 0){
                obj.brand = parse.brand.split(',')
            }
            if(parse.price && parse.price.length !== 0){
                obj.price = parse.price.split(',')
                setInpPrice([obj.price[0], obj.price[1]])
            }
            if(parse.sort){
                if(parse.sort === ''){
                    obj.sort = "rating" 
                } else {
                    obj.sort = parse.sort
                }
            }
            if(parse.page){
                if(parse.page === ''){
                    obj.page = '1'
                } else {
                    obj.page = parse.page
                }
            }
            setFiltProduct(e => {return {... e, ...obj}})
        }

        (async function(){
            try{
                const response = await axios.get(URL + '/filter/' + url, {params: parse});
                setSelectionProducts(response.data);
            } catch(err){
                console.error(err)
            }
        })()
    },[par])

    const parsingUrl = (obj:FiltObjType | any):string => {
        let paramUrl = '?';
        for(let key in obj){
            if(obj[key].length > 0){
                let str = `${key}=${Array.isArray(obj[key]) ? obj[key].join(',') : obj[key]}&`
                paramUrl += str;
            }
        }
        paramUrl = paramUrl.substring(0, paramUrl.length - 1);
        return paramUrl;
    }

    useEffect(() => {
        const newParam = parsingUrl(filtProduct)
        router.push(`/${url}${newParam}`,{ scroll: false })
    }, [filtProduct])
    
    const checkedBox = (a:string, key:string):boolean => {
        if(filtProduct[key as keyof FiltObjType].includes(a)) return true 
        else return false
    }
   
    const inpCheckedCategory= (e:React.ChangeEvent<HTMLInputElement>):void => {
        let inp:string = e.target.value;
        if (e.target.checked) {
            setFiltProduct(obj => {return {...obj, category:[...obj.category, inp]}})
        } else {
            setFiltProduct(obj => {return {...obj, category: obj.category.filter(e => e !== inp)}})
        }
    }
    
    const inpCheckedBrand = (e:React.ChangeEvent<HTMLInputElement>):void => {
        let inp:string = e.target.value;
        if (e.target.checked) {
            setFiltProduct(obj => {return {...obj, brand:[...obj.brand, inp]}})
        } else {
            setFiltProduct(obj => {return {...obj, brand: obj.brand.filter(e => e !== inp)}})
        }
    }
    
    const inpCheckedSort = (e:React.ChangeEvent<HTMLInputElement>):void => {
        let inp:string = e.target.value;
        if (e.target.checked) {
           setFiltProduct(obj => {return {...obj, sort: inp}})
        } 
    }

    const inpPriceValid = (e:React.ChangeEvent<HTMLInputElement>, key:number):void => {
        let inp:string = e.target.value;
        if(inp === '' || inp.match(/[0-9]+/) && +inp < 1000000){
            if(key === 0){setInpPrice((pr) => [e.target.value, pr[1]])}
            else if(key === 1){setInpPrice((pr) => [pr[0],e.target.value]) }
        }
    }

    const pageLimit = ():void => { 
        setFiltProduct(obj => {return {...obj, page: String(+obj.page + 1)}} )
    }

    return (
        <div className="products_list_page">
            <NavProducts/>
            <div className="container">
                <ArrowBack patch={"/"} />
                <div className="products_list_page_category">
                    <h2>{tittle}</h2>
                </div>
                <div className="products_list_page_content">
                    <div className="b_filter">
                        <div className="filter_block">
                            <div className="filter_title">Категория</div>
                            <div className="filter_content">
                                {filtData.category.map(elem => (
                                    <div className='filter_item' key={elem.id}>
                                        <input 
                                            type="checkbox" 
                                            id={elem.id} 
                                            onChange={(e) => {inpCheckedCategory(e)}} 
                                            value={elem.value} 
                                            checked={checkedBox(elem.value, 'category')}
                                        />
                                        <label htmlFor={elem.id}>{elem.name}</label>
                                    </div> 
                                ))}
                            </div>
                        </div>
                        <div className="filter_block">
                            <div className="filter_title">Бренд</div>
                            <div className="filter_content">
                                {filtData.brand.map(elem => (
                                    <div className='filter_item' key={elem.id}>
                                        <input 
                                            type="checkbox" 
                                            id={elem.id} 
                                            onChange={(e) => {inpCheckedBrand(e)}}  
                                            value={elem.value} 
                                            checked={checkedBox(elem.value, 'brand')}
                                        />
                                        <label htmlFor={elem.id}>{elem.name}</label>
                                    </div> 
                                ))}
                            </div>
                        </div>
                        <div className="filter_block">
                            <div className="filter_title">Цена</div>
                            <div className="filter_content">
                                <div className='filter_item_price'>
                                    <div className="inp_price_block">
                                        <div className="inp_price_to">от</div>
                                        <input 
                                            type="text" 
                                            className='inp_price_inp' 
                                            value={inpPrice[0]} 
                                            onChange={(e) => {inpPriceValid(e, 0)}} 
                                            onBlur={() => {setFiltProduct((obj) => {return {...obj, price: inpPrice}})}} 
                                        /> 

                                    </div>
                                    <div className="inp_price_block">
                                        <div className="inp_price_to">до</div>
                                        <input 
                                            type="text" 
                                            className='inp_price_inp' 
                                            value={inpPrice[1]}
                                            onChange={(e) => {inpPriceValid(e, 1)}} 
                                            onBlur={() => {setFiltProduct((obj) => {return {...obj, price: inpPrice}})}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="b_list">
                        <div className="b_sorted">
                            {filtData.sort.map(elem => (
                                <div className="b_sorted_item" key={elem.id}>
                                    <input 
                                        type="radio" 
                                        id={elem.id} 
                                        name='sor' 
                                        value={elem.value} 
                                        checked={checkedBox(elem.value, "sort")} 
                                        onChange={(e) => {inpCheckedSort(e)}}  
                                    />
                                    <label htmlFor={elem.id}>{elem.name}</label>
                                </div> 
                            ))}
                        </div> 

                        <div className="list_filter_sort">
                            <div className="list_filter_border"></div>
                            <div className="list_filter_items">
                                {selectionProducts.map(item => <ProductItem key={item._id} product={item} />)}
                            </div>
                            <div className="show_more">
                                <button className='show_more_button' onClick={() => {pageLimit()}}>Показать еще</button>
                            </div>
                        </div>      
                    </div>
                </div>
            </div>
        </div>
    )
}
export interface ProductItemType{
    id: string,
    _id: string,
    text: string,
    category: string,
    price: number,
    label: string,
    model: string,
    description: string,
    rating: number,
    popularity: number,
    photos:string[],
    characteristic:{
        dia: number,
        gender: string,
        color: string,
        helm : string,
        frame: string,
        mass: number
    },
    coments: {
        id: number,
        name: string,
        text: string,
        estimation: number,
        date: string
    }[]
}

export interface CartFaceType{
    id: string,
    count: number,
    status: string
}

export interface InCartStateType{
    id: string,
    name: string,
    photos: string[]
}

export interface OrderingType {
    products: Ptype[],
}

export interface Ptype {
    name?:string, 
    count?:number, 
    price?:number  
}

export interface RoutingParams {
    params: {
        id: string
    }
};

export interface CommentItem{
    id : number,
    date: string,
    estimation: number,
    name: string,
    text: string 
}

export interface ShopType{
    name: string,
    address: string,
    _id: string, 
    regime: string,
    reting: number
}

export interface UserType{
    name: string,
    tel:string,
    mail:string,
    discounts:Object[],
    orders:[],
    bonuses:number
}

export interface  SityType {
    name: string, 
    id: number,
}  

export interface CatalogMenuType{
    name: string
    link: string
    id: string
}

export interface FiltObjType{
    category: string[],
    brand: string[],
    price: string[],
    sort: string,
    page: string
}

export interface FiltParseType{
    category?: string[],
    brand?: string[],
    price?: string[],
    sort?: string,
    page?: string
}

export interface FilterListType{
    category: {id: string, value: string, name: string}[],
    brand: {id: string, value: string, name: string}[],
    sort: {id:string, value: string, name: string }[]
}

export interface PropsPLType{
    filtData: FilterListType,
    tittle: string,
    url: string
}
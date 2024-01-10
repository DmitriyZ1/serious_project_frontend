interface FilterList{
    category: {id: string, value: string, name: string}[],
    brand: {id: string, value: string, name: string}[],
    sort: {id:string, value: string, name: string }[]
}


export const listFilterSkate:FilterList = {
    category:[
        { id: 'filt_categ_man',value:'man',name: 'Мужские'},
        { id: 'filt_categ_woman',value:'woman',name: 'Женские'},
        { id: 'filt_categ_child',value:'child',name: 'Детские'}
    ],
    brand:[
        { id: 'filt_brand_Termit',value:'Termit',name: 'Termit'},
        { id: 'filt_brand_Element',value:'Element',name: 'Element'},
        { id: 'filt_brand_Roces',value:'Roces',name: 'Roces'},
        { id: 'filt_brand_CRUZADE',value:'CRUZADE',name: 'CRUZADE'},
        { id: 'filt_brand_ZOO_YORK',value:'ZOO YORK',name: 'ZOO YORK'},
    ],
    sort:[
        { id: 'sor_rating',value:'rating',name: 'по рэйтингу'},
        { id: 'sor_popular',value:'popular',name: 'по популярности'},
        { id: 'sor_price',value:'price',name: 'по цене'},
    ]
}

export const listFilterScootesr:FilterList = {
    category:[
        { id: 'filt_categ_man',value:'man',name: 'Мужские'},
        { id: 'filt_categ_woman',value:'woman',name: 'Женские'},
        { id: 'filt_categ_child',value:'child',name: 'Детские'}
    ],
    brand:[
        { id: 'filt_brand_Reaction',value:'Reaction',name: 'Reaction'},
        { id: 'filt_brand_Roces',value:'Roces',name: 'Roces'},
        { id: 'filt_brand_StreetSurfing',value:'Street Surfing',name: 'Street Surfing'},
        { id: 'filt_brand_Globber',value:'Globber',name: 'Globber'},
        { id: 'filt_brand_Grit',value:'Grit',name: 'Grit'},
        { id: 'filt_brand_HUDORA',value:'HUDORA',name: 'HUDORA'},
        { id: 'filt_brand_Dominator',value:'Dominator',name: 'Dominator'},
    ],
    sort:[
        { id: 'sor_rating',value:'rating',name: 'по рэйтингу'},
        { id: 'sor_popular',value:'popular',name: 'по популярности'},
        { id: 'sor_price',value:'price',name: 'по цене'},
    ]
}

export const listFilterBic:FilterList = {
    category:[
        { id: 'filt_categ_man',value:'man',name: 'Мужские'},
        { id: 'filt_categ_woman',value:'woman',name: 'Женские'},
        { id: 'filt_categ_child',value:'child',name: 'Детские'}
    ],
    brand:[
        { id: 'filt_brand_Denton',value:'Denton',name: 'Denton'},
        { id: 'filt_brand_Stern',value:'Stern',name: 'Stern'},
        { id: 'filt_brand_Roces',value:'Roces',name: 'Roces'},
        { id: 'filt_brand_Ghost',value:'Ghost',name: 'Ghost'},
        { id: 'filt_brand_Merida',value:'Merida',name: 'Merida'},
        { id: 'filt_brand_Bear_Bike',value:'Bear Bike',name: 'Bear Bike'},
        { id: 'filt_brand_Scott',value:'Scott',name: 'Scott'},
        { id: 'filt_brand_Haro',value:'Haro',name: 'Haro'},
        { id: 'filt_brand_FORMAT',value:'FORMAT',name: 'FORMAT'},
        { id: 'filt_brand_Trek',value:'Trek',name: 'Trek'},
        { id: 'filt_brand_RoyalBaby',value:'RoyalBaby',name: 'RoyalBaby'},
    ],
    sort:[
        { id: 'sor_rating',value:'rating',name: 'по рэйтингу'},
        { id: 'sor_popular',value:'popular',name: 'по популярности'},
        { id: 'sor_price',value:'price',name: 'по цене'},
    ]
}


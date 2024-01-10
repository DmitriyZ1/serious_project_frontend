
interface CatalogMenuRight{
    name: string
    link: string
    id: string
}

interface CatalogMenuLeft{
    id: string,
    name: string,
    list: CatalogMenuRight[]
}


export const catalogObj:CatalogMenuLeft[] = [
    {
        name: 'Велосипеды',
        id: '01',
        list: [
            {
                id: '11',
                name: 'Denton',
                link: '/bicycles?brand=Denton&sort=rating'
            },
            {
                id: '12',
                name: 'Stern',
                link: '/bicycles?brand=Stern&sort=rating'
            },
            {
                id: '13',
                name: 'Roces',
                link: '/bicycles?brand=Roces&sort=rating'
            },
            {
                id: '14',
                name: 'Ghost',
                link: '/bicycles?brand=Ghost&sort=rating'
            },
            {
                id: '15',
                name: 'Merida',
                link: '/bicycles?brand=Merida&sort=rating'
            },
            {
                id: '16',
                name: 'Bear Bike',
                link: '/bicycles?brand=Bear Bike&sort=rating'
            },
            {
                id: '17',
                name: 'Scott',
                link: '/bicycles?brand=Scott&sort=rating'
            },
            {
                id: '18',
                name: 'Haro',
                link: '/bicycles?brand=Haro&sort=rating'
            },
            {
                id: '19',
                name: 'FORMAT',
                link: '/bicycles?brand=FORMAT&sort=rating'
            },
            {
                id: '20',
                name: 'Trek',
                link: '/bicycles?brand=Trek&sort=rating'
            },
            {
                id: '21',
                name: 'RoyalBaby',
                link: '/bicycles?brand=RoyalBaby&sort=rating'
            },
           
        ]
    },
    {
        name: 'Самокаты',
        id: '02',
        list: [
            {
                id: '11',
                name: 'Reaction',
                link: '/scooters?brand=Reaction&sort=rating'
            },
            {
                id: '12',
                name: 'Roces',
                link: '/scooters?brand=Roces&sort=rating'
            },
            {
                id: '13',
                name: 'Street Surfing',
                link: '/scooters?brand=Street Surfing&sort=rating'
            },
            {
                id: '14',
                name: 'Globber',
                link: '/scooters?brand=Globber&sort=rating'
            },
            {
                id: '15',
                name: 'Grit',
                link: '/scooters?brand=Grit&sort=rating'
            },
            {
                id: '16',
                name: 'HUDORA',
                link: '/scooters?brand=HUDORA&sort=rating'
            },
            {
                id: '17',
                name: 'Dominator',
                link: '/scooters?brand=Dominator&sort=rating'
            },
           
        ]
    },
    {
        name: 'Скейтборды',
        id: '03',
        list: [
            {
                id: '11',
                name: 'Termit',
                link: '/skateboards?brand=Termit&sort=rating'
            },
            {
                id: '12',
                name: 'Roces',
                link: '/skateboards?brand=Roces&sort=rating'
            },
            {
                id: '13',
                name: 'Element',
                link: '/skateboards?brand=Element&sort=rating'
            },
            {
                id: '14',
                name: 'CRUZADE',
                link: '/skateboards?brand=CRUZADE&sort=rating'
            },
            {
                id: '15',
                name: 'ZOO YORK',
                link: '/skateboards?brand=ZOO YORK&sort=rating'
            },
        ]
    },
    {
        name: 'Акции',
        id: '04',
        list: [
            {
                id: '41',
                name: 'Акций пока нету',
                link: '/'
            },
        ]
    },
    {
        name: 'Скидки',
        id: '05',
        list: [
            {
                id: '51',
                name: 'Скидок пока нету',
                link: '/'
            },
        ]
    },
    
]
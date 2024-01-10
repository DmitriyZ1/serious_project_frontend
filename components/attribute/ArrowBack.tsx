import Link from 'next/link';
import '@/style/attrebute/arrow.scss'

export default function ArrowBack({patch}:{patch: string}){
    return (
        <div className="arrow_back">
            <Link href={patch}>&#8592; назад</Link>
        </div>
    )

}
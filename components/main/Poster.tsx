
import '@/style/main/poster.scss'


export default function Poster({picPuth} : {picPuth: string}){

    return (
        <div className="poster">
            <div className="poster_content">
                <img src={picPuth} alt="" className="poster_img"/>
            </div>
        </div>
    )
}


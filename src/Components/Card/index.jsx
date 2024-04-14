import './style.module.scss';


// import { HttpApiMethods } from '../utils/FetchUtils';

// const httpApiMethods = new HttpApiMethods()
// function extractDateTime(dateString) {
//     const dateTime = new Date(dateString);
//     const date = dateTime.toLocaleDateString();
//     const time = dateTime.toLocaleTimeString();
    
//     return { date, time };
// }



// const Card = (item) => {

//     console.log(item);
//     return (
//         <>
//             <div className='event_card' >
//                 <div className="event-card__photo"><img className='img' src={httpApiMethods.APIURL_FILES + item.speackerImage} alt="{item.speackerImage}" /></div>
//                     <div className="taggs">
//                         <div className='tagged'>{item.tags}</div>
//                         <div className="feautures">{item.type}</div>
//                     </div>
//                 <h4 className="event-card__title">{item.title}</h4>
//                 <p className="event-card__date">{extractDateTime(item.time).date}, в {extractDateTime(item.time).time} по Московскому времени</p>
//             </div>
//         </>
//     )
// }
// export default Card;

const Card = (item) => {
    return (
        <>
            <div className='event_card' >
                <div className="event-card__photo"><img className='img'  alt="{item.speackerImage}" /></div>
                    <div className="taggs">
                        <div className='tagged'>first</div>
                        <div className="feautures">second</div>
                    </div>
                <h4 className="event-card__title">title</h4>
                <p className="event-card__date"> по Московскому времени</p>
            </div>
        </>
    )
}
export default Card;
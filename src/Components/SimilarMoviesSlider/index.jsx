import React, { useState, useEffect } from 'react';
import './style.scss';
import { useParams, useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = ({ filmSimilarMovies, image }) => {
    const pageWidth = document.documentElement.scrollWidth;
    const [current, setCurrent] = useState(0);
    const [length, setLength] = useState(4);
    const [secondLength, setSecondLength] = useState(3);
    const navigate = useNavigate();
    useEffect(() => {
        if (pageWidth < 1200) {
            setLength(2)
            setSecondLength(2)
        }
        if (pageWidth < 780) {
            setLength(1)
            setSecondLength(1)
        }
        console.log(pageWidth)
    }, [pageWidth])
    const [displayedMovies, setDisplayedMovies] = useState([]);

    useEffect(() => {
        // При изменении film.similarMovies или current обновляем отображаемые слайды
        if (filmSimilarMovies) {
            const startIndex = current;
            const endIndex = startIndex + length > filmSimilarMovies.length ? filmSimilarMovies.length : startIndex + length;
            setDisplayedMovies(filmSimilarMovies.slice(startIndex, endIndex));
        }
        if (image && image.filter(item => item.height > item.width).length > 4) {
            const startIndex = current;
            const endIndex = startIndex + length > image.filter(item => item.height > item.width).length ? image.filter(item => item.height > item.width).length : startIndex + length;
            setDisplayedMovies(image.filter(item => item.height > item.width).slice(startIndex, endIndex));
        }
        if (image && image.filter(item => item.height > item.width).length < 4) {
            const startIndex = current;
            const endIndex = startIndex + secondLength > image.filter(item => item.height > item.width).length ? image.filter(item => item.height > item.width).length : startIndex + secondLength;
            setDisplayedMovies(image.filter(item => item.height > item.width).slice(startIndex, endIndex));
        }
       
    }, [filmSimilarMovies, current, image]);

    const nextSlide = () => {
        if (filmSimilarMovies) {
            setCurrent(current === filmSimilarMovies.length - length ? 0 : current + 1);
        }
        if (image && image.filter(item => item.height > item.width).length > 4) {
            setCurrent(current === image.filter(item => item.height > item.width).length - length ? 0 : current + 1);
        }
        if (image && image.filter(item => item.height > item.width).length < 4) {
            setCurrent(current === image.filter(item => item.height > item.width).length - secondLength ? 0 : current + 1);
        }
        
        
        
       
    };

    const prevSlide = () => {
        if (filmSimilarMovies) {
            setCurrent(current === 0 ? filmSimilarMovies.length - length : current - 1);
        }
        if (image && image.filter(item => item.height > item.width).length > 4) {
            setCurrent(current === 0 ? image.filter(item => item.height > item.width).length - length : current - 1);
        }
        if (image && image.filter(item => item.height > item.width).length < 4) {
            setCurrent(current === 0 ? image.filter(item => item.height > item.width).length - secondLength : current - 1);
        }
       
       
    };

    return (
        <section className="slider">
            <button className="slider__button slider__button--left" onClick={prevSlide}>&#10094;</button>
            <button className="slider__button slider__button--right" onClick={nextSlide}>&#10095;</button>
            <div className="slider__wrapper">
                
                {filmSimilarMovies ? displayedMovies.map((item, index) => (
                    <div key={index} onClick={() => navigate(`/meet/${item.id}`)} className='event_card'>
                        <div className="event-card__photo">
                            <img className='img' src={item.poster.previewUrl} alt={item.speackerImage} />
                        </div>
                        <div className="taggs">
                            {(item.rating !== undefined && item.rating.kp !== null && item.rating.kp !== undefined) ? <div className='tagged'>{item.rating.kp.toFixed(1)}</div> : <div className='tagged'>N\A</div>}
                            <div className="feautures">{item.type}</div>
                        </div>
                        <h4 className="event-card__title">{item.name}</h4>
                    </div>
                )) : displayedMovies.map((item, index) => (
                    <div key={index} className='event_card_poster'>
                        <div className="event-card__photo">
                            <img className='img' src={item.previewUrl} alt={item.type} />
                        </div>
                       
                    </div>))}
            </div>
        </section>
    );
};

export default Slider;
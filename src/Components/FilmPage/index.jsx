import Header from "../Header";
import styles from './style.module.scss';
import clock from '../../img/MeetPage/Clock.png';
import globe from '../../img/MeetPage/Globe.png';
import avatar from '../../img/MeetPage/avatar.png';
import SimilarMoviesSlider from "../SimilarMoviesSlider";
import Pagination from '@mui/material/Pagination';
import { HttpApiMethods } from '../utils/FetchUtils';
import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { style } from "@mui/system";
// import Card from "../Card";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
const httpApiMethods = new HttpApiMethods()



function truncateString(str, length, ending = '...') {
    if (str.length > length) {
       return str.substring(0, length - ending.length) + ending;
    } else {
       return str;
    }
   }
   
const FilmPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [film, setFilm] = useState(null);
    const [sesson, setSesson] = useState(null);
    const [sessonNumber, setSessonNumber] = useState(null);
    const [sessonPage, setSessonPage] = useState(1);
    const [actorPage, setActorPage] = useState(1);
    const [siriesPage, setSiriesPage] = useState(1);
    const [commentsPage, setCommentsPage] = useState(1);
    const [comments, setComments] = useState(1);
    const [trailers, setTrailers] = useState(null);
    const [filmImages, setFilmImages] = useState(null);
    const [actorsToShow, setActorsToShow] = useState(null);
    const [sessonToshow, setSessonToShow] = useState(null);
    const [siriesToShow, setSiriesToShow] = useState(null);
    const [siriesLength, setSiriesLength] = useState(null);
    const [length, setLength] = useState(4);
    const navigate = useNavigate()
   
    const [current, setCurrent] = useState(0);
    const pageWidth = document.documentElement.scrollWidth;
    
    useEffect(() => {
        if (pageWidth < 1200) {
            setLength(2)
        }
        if (pageWidth < 780) {
            setLength(1)
        }
        console.log(pageWidth)
    }, [pageWidth])

  
    const nextSlide = () => {
        setCurrent(current === film.videos.trailers.length - length ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? film.videos.trailers.length - length : current - 1);
    };
    
    const handleActorPageChange = (event, value) => {
        setActorPage(value);
    };
    const handleSessonPageChange = (event, value) => {
        setSessonPage(value);
    };
    const handleSiriesPageChange = (event, value) => {
        setSiriesPage(value);
    };
    const handleCommentsPageChange = (event, value) => {
        setCommentsPage(value);
    };

    useEffect(() => {
        
        setLoading(true);
          
       
        const fetchFilm = async () => {
       
        const response = await httpApiMethods.GetByID(id);
        setFilm(response);
        
        console.log(film)
        };
        const fetchFilmImage = async (page, limit, id) => {
       
            const response = await httpApiMethods.SearchFilmImage(page, limit, id);
            setFilmImages(response);
            setLoading(false);
           
            };
        fetchFilm();
        fetchFilmImage(1, 100, id)
        
        window.scrollTo({
            top: 0,
           
           });
    }, [id]); // Зависимость от id, чтобы повторно загружать данные при изменении ID
    useEffect(() => {
        const fetchSesson = async () => {
            setLoading(true);
            const newResponse = await httpApiMethods.GetInfoAboutSesons(id)
            setSesson(newResponse);
          
            
            }
            if (film !== null && film.seasonsInfo !== undefined && film.seasonsInfo.length > 0) {
          
                fetchSesson();
            }
            console.log(filmImages)
            setLoading(false);
    }, [ film, filmImages])
    useEffect(() => {
        
        if (film) {
            setActorsToShow(film.persons.filter(person => person.profession === 'актеры').slice((actorPage - 1) * 4, actorPage * 4)) 
            
        }
       
       
       }, [film, actorPage, sesson]);
    useEffect(() => {
     if (sesson) {
        setSessonToShow(sesson.docs.slice((sessonPage - 1) * 4, sessonPage * 4)) 
       
     }
    
    }, [sessonPage, sesson]);
    useEffect(() => {
        if (sesson && sessonNumber) {
            setSiriesToShow(sesson.docs.filter(item => item.name === sessonNumber)[0].episodes.slice((siriesPage - 1) * 4, siriesPage * 4)) 
            setSiriesLength(sesson.docs.filter(item => item.name === sessonNumber)[0].episodes.length)
          
        }
       
       }, [film, siriesPage, sesson, sessonNumber]);
    useEffect(() => {
     if (film) {
        setLoading(true);
        const fetchComments = async () => {
            const intId = parseInt(id)
       
            const response = await httpApiMethods.SearchComments(commentsPage, 4, intId);
            setComments(response);
           

        };
        fetchComments();
        setLoading(false);
        document.querySelector(`.${styles.comments__all_container}`).scrollTo({
            top: 0,
           
           });
     }
    
       }, [film, commentsPage]);
       useEffect(() => {
        // При изменении film.similarMovies или current обновляем отображаемые слайды
        if (film) {
            const startIndex = current;
            const endIndex = startIndex + length > film.videos.trailers.length ? film.videos.trailers.length : startIndex + length;
            setTrailers(film.videos.trailers.slice(startIndex, endIndex));
        }
        
    }, [film, current]);

    return (
        <>
        {film &&
        <>
            <Header></Header>
            <div className={styles.firstContainer}>
                <div className={styles.secondContainer}>
                    <section className={styles.meets}>
                        {loading || !film ? (
                            <>
                            <div className={styles.meets__mainInfo_container}>
                            <Skeleton width="500px" height="35px" variant="rectangular"  />
                            <Skeleton sx={{marginTop: '25px'}} width="112px" height="40px" variant="rectangular"  />
                            <Skeleton sx={{marginTop: '40px'}} width="120px" height="30px" variant="rectangular"  />
                            <Skeleton sx={{marginTop: '40px'}} width="80px" height="30px" variant="rectangular"  />
                            </div>
                            <Skeleton width="400px" height="600px" variant="rectangular"  />
                            </>
                        ) : 
                        (<>
                            <div className={styles.meets__mainInfo_container}>
                                <span className={styles.meets__mainInfo_descr}>{film.name}</span>
                                <span className={styles.meets__mainInfo_type}>{film.genres[0].name}</span>
                                <span className={styles.meets__mainInfo_type}>Рейтинг: {film.rating.kp.toFixed(1)}</span>
                                <div className={styles.meets__mainInfo_status}><img className={styles.meets__mainInfo_status_img} src={clock} alt="clock"></img> <span>{film.movieLength} минут</span> </div>
                                <div className={styles.meets__mainInfo_time}><img className={styles.meets__mainInfo_status_img} src={globe} alt="globe"></img> <span>{film.year}</span> </div>
                            </div>
                            <div className={styles.meets__img}><img src={film.poster.previewUrl}></img></div>
                        </>) }
                        
                    
                    </section>
                    
                    <section className={styles.aboutMeet}>
                        <div className={styles.aboutMeet__title}>О фильме</div>
                        <div className={styles.aboutMeet__descr}>{film.description}</div>
                    </section>
                    {filmImages && filmImages.docs && (
                           <section className={styles.aboutMeet}>
                           <div className={styles.aboutMeet__title}>Постеры</div>
                           <SimilarMoviesSlider image={filmImages.docs} />
                       </section>
                    )}
                    {film && trailers && film.videos.trailers.length > 0  && (
                        <section className={styles.aboutMeet}>
                        <div className={styles.aboutMeet__title}>Трейлеры</div>
                        <section className="slider">
                            {film && trailers && film.videos.trailers.length > 2 ? <>
                            <button className="slider__button slider__button--left" onClick={prevSlide}>&#10094;</button>
                            <button className="slider__button slider__button--right" onClick={nextSlide}>&#10095;</button></>
                            : null}
                          
                            <div className="slider__wrapper">
                                {trailers && trailers.map((item, index) => (
                                    <div key={index} className='event_card_trailer'>
                                        <div className="event-card__photo">
                                        <iframe  className="img_trailer" src={item.url} frameborder="0" allowfullscreen></iframe>
                                        </div>
                                        <div className="taggs">
                                          
                                            <div className="feautures">{item.type}</div>
                                        </div>
                                        <h4 className="event-card__title">{item.name}</h4>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </section>
                    )}
                    
                    
                    <section className={styles.expert}>
                        <div className={styles.expert__title}>Актёры</div>
                        <div className={styles.expert__container}>
                        
                           {!loading && actorsToShow ? actorsToShow.map(actor => (
                            <Grid sx={{marginBottom: '30px', width: '300px'}} item sm={6} xl={3} md={6} lg={4} key={actor.id}>
                               
                            <div className={styles.expert__img_container}>
                            <img className={styles.expert__img} src={actor.photo} alt="avatar"></img>
                            </div>
                            <div className={styles.expert__descr_container}>
                            <div className={styles.expert__descr_fullname}>{actor.name}</div>
                            <div className={styles.expert__descr_speciality}>{actor.description}</div>
                          
                            </div>
                           
                            </Grid>
                            
                        )) : Array.from({ length: 4 }).map((_, index) => (
                            <Grid item sm={6} xl={3} md={6} lg={4} key={index}>
                                <div className={styles.expert__img_container}>
                                    <Skeleton width="292px" height="240px" variant="rectangular"  />
                                </div>
                                <div className={styles.expert__descr_container}>
                                    <Skeleton width="30%" />
                                    <Skeleton width="30%" />
                            
                                </div>
                               
                                
                            </Grid>
                        ))}
                         
                            
                        </div>
                        { film && film.persons.length > 4 ? <div className={styles.pagination}>
                            <Pagination count={Math.ceil(film.persons.filter(person => person.profession === 'актеры').length / 4)} page={actorPage} onChange={handleActorPageChange} variant="outlined" />
                        </div> : null}
                        
                        
                    
                    </section>
                    {film && film.seasonsInfo.length !== 0 ? 
                    <section className={styles.expert}>
                    <div className={styles.expert__title}>Сезоны сериала</div>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems:'center'}}>
                    <Grid container sx={{width: '96%', justifyContent: 'center'}} >

                
                    {loading || ((sesson && sesson.docs) && !Array.isArray(sesson.docs))  ? (
                        
                        Array.from({ length: 4 }).map((_, index) => (
                            <Grid item sm={6} xl={3} md={6} lg={4} key={index}>
                                <div  className='event_card'>
                                    <div className="event-card__photo">
                                    <Skeleton width="292px" height="340px" variant="rectangular"  />
                                    </div>
                                    <div className="taggs">
                                   
                                        <Skeleton width="30%" />
                                        <Skeleton width="30%" />
                                   
                                    </div>
                                    <Box sx={{ pt: 0.5 }}>
                                        <Skeleton width="60%"/>
                                        <Skeleton  />
                                    </Box>
                                </div>
                                
                            </Grid>
                        ))
                        
                    ) : (
                        <>
                        {sesson && sesson.docs && sessonToshow && sessonToshow.map((item, index) => (
                            <Grid sx={{height: '500px'}} item sm={6} xl={3} md={6} lg={4} key={index}>
                                <div onClick={() => setSessonNumber(item.name)} className='event_card'>
                                    <div className="event-card__photo">
                                        <img className='img' src={item.poster && item.poster.previewUrl !== undefined ? item.poster.previewUrl : null} alt={item.name} />
                                    </div>
                                    <div className="taggs">
                                    {<div className='tagged'>{item.episodes.length} эпизодов</div>}
                                   
                                        <div className="feautures">{item.duration ? item.duration : '0 '} минут</div>
                                    </div>
                                    <h4 className="event-card__title">{item.name}</h4>
                                    
                                </div>
                            </Grid>
                        ))}
                     
                        </>
                        
                    )}
                    {/* <EditForm></EditForm> */}
                    </Grid>
                  
                </Box>
                {sesson && sesson.docs && sesson.docs.length > 4 ? <div className={styles.pagination_sesson}>
                            <Pagination count={Math.ceil(sesson.docs.length / 4)} page={sessonPage} onChange={handleSessonPageChange} variant="outlined" />
                        </div> : null}
                
                   <div className={styles.expert__titleSesson}>Выбранный сезон</div>
                   <Box sx={{ height: '100%', flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems:'center', flexWrap: 'wrap'}}>
                    
                   {sessonNumber  &&  sesson && sesson.docs && siriesToShow && siriesToShow.map((item, index) => (
                        <Grid sx={{height: '300px'}} item sm={6} xl={3} md={6} lg={4} key={index}>
                            <div className='event_card_series'>
                                <div className="event-card__photo_series">
                                    <img className='img_series' src={item.still && item.still.previewUrl !== undefined ? item.still.previewUrl : null} alt={item.name} />
                                </div>
                                <div className="taggs">
                                {/* {<div className='tagged'>{item.episodes.length} эпизодов</div>}
                               
                                    <div className="feautures">{item.duration ? item.duration : '0 '} минут</div> */}
                                </div>
                                <h4 className="event-card__title">{item.name}</h4>
                                
                            </div>
                        </Grid>
                    ))} 
                    {sessonNumber === null ? <div className={styles.sessonChose}>Выберите сезон сериала</div> : null}
                   </Box>
                   {sesson && sesson.docs && siriesLength > 4 ? <div className={styles.pagination_siries}>
                            <Pagination count={Math.ceil(siriesLength / 4)} page={siriesPage} onChange={handleSiriesPageChange} variant="outlined" />
                        </div> : null}
                </section>  : null}
                    
                {comments ? 
                    <section className={styles.comments}>
                    <div className={styles.comments__title}>Комментарии</div>
                    <div className={styles.newInputContainer}>
                        <div className={styles.comments__number}>{comments.total} КОММЕНТАРИЯ</div>
                        <div className={styles.comments__input_container}>
                            <div className={styles.comments__input_img_container}>
                                
                                <textarea placeholder="Оставьте отзыв" className={styles.comments__input}></textarea>
                            </div>
                            <div className={styles.comments__button_container}>
                                <button className={styles.comments__button}>ОТПРАВИТЬ</button>
                            </div>
                        </div>
                        <div className={styles.comments__all_container}>
                            {comments.docs && comments.docs.map((item, index) => (
                                <div className={styles.oneComment__container} key={index}>
                                
                                <div className={styles.oneComment__descr_container}>
                                    <div className={styles.oneComment__descr_title_container}>
                                        <div className={styles.oneComment__descr_name}><span className={styles.yellowSpan}>{item.author[0]}</span>{item.author.slice(1)}</div>
                                        <div className={styles.oneComment__descr_time}>{item.date.slice(0, 10) + ' ' + item.date.slice(11, 16)} </div>
                                        <div className={item.type === 'Негативный' ?  styles.oneComment__descr_type_red : styles.oneComment__descr_type_green}>{item.type}</div>
                                    </div>
                                    <div className={styles.oneComment__descr_title}>{item.title}</div>
                                    <div className={styles.oneComment__descr} dangerouslySetInnerHTML={{__html: item.review}}>
                                        
                                    </div>
                                </div>
                            </div>
                            ))}
                            
                            
                        </div>
                    </div>
                    {comments && comments.docs && comments.total > 4 ? <div className={styles.pagination_siries}>
                            <Pagination count={comments.pages} page={commentsPage} onChange={handleCommentsPageChange} variant="outlined" />
                        </div> : null}
                </section> : null}
                    <section className={styles.someMeetings}>
                    <div className={styles.someMeetings__title}>Похожие фильмы</div>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems:'center'}}>
                        <Grid container sx={{width: '96%'}}>

                    
                        {loading || !Array.isArray(film.similarMovies) ? (
                            
                            Array.from({ length: 4 }).map((_, index) => (
                                <Grid item sm={6} xl={3} md={6} lg={4} key={index}>
                                    <div  className='event_card'>
                                        <div className="event-card__photo">
                                        <Skeleton width="292px" height="340px" variant="rectangular"  />
                                        </div>
                                        <div className="taggs">
                                       
                                            <Skeleton width="30%" />
                                            <Skeleton width="30%" />
                                       
                                        </div>
                                        <Box sx={{ pt: 0.5 }}>
                                            <Skeleton width="60%"/>
                                            <Skeleton  />
                                        </Box>
                                    </div>
                                    
                                </Grid>
                            ))
                            
                        ) : (
                            <SimilarMoviesSlider filmSimilarMovies={film.similarMovies} />
                        )}
                        {/* <EditForm></EditForm> */}
                        </Grid>
                    </Box>
                    </section>
                    
                    
                </div>
            </div>
            
            
        </>
            }
            </>
    )


}
export default FilmPage;
import React from 'react';
import './style.scss'
import { HttpApiMethods } from '../utils/FetchUtils';
import {useState, useEffect, useRef} from 'react'
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
const useDebounce = (callback, delay) => {
 const timeoutRef = useRef(null);

 useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
 }, []);

 const debouncedCallback = (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
 };

 return debouncedCallback;
};

function extractDateTime(dateString) {
    const dateTime = new Date(dateString);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    
    return { date, time };
}

const httpApiMethods = new HttpApiMethods()

const firstMeets = await httpApiMethods.GetByID(400)


function truncateString(str, length, ending = '...') {
    if (str) {
    if (str.length > length) {
       return str.substring(0, length - ending.length) + ending;
    } else {
       return str;
    }
   
   } else {
    return 'Описание не найдено';
    }
}
   
const Home = ({country, age, genres, year, limit, searchFilm, clear, setClear}) => {
    console.log(searchFilm)
    const [storedCountry, setStoredCountry] = useState(() => localStorage.getItem('country') || null);
    const [storedAge, setStoredAge] = useState(() => localStorage.getItem('age') || null);
    const [storedGenres, setStoredGenres] = useState(() => localStorage.getItem('genres') || null);
    const [storedYear, setStoredYear] = useState(() => localStorage.getItem('year') || null);
    const [storedLimit, setStoredLimit] = useState(() => localStorage.getItem('limit') || null);
    const [storedSearchFilm, setStoredSearchFilm] = useState(() => localStorage.getItem('searchFilm') || null);
    
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(parseInt(searchParams.get("page") || "1", 10));
    const [storedPage, setStoredPage] = useState(() => localStorage.getItem('page') || page);
    const [totalPages, setTotalPages] = useState(0); // Общее количество страниц
    const [films, setFilms] = useState([]); // Данные фильмов
    

    // Функция для загрузки данных с сервера
    const fetchSearchFilms = async (page, limit, searchFilm) => {
        setLoading(true);
        if (searchFilm) {
            const response = await httpApiMethods.SearchFilm(page, limit, searchFilm);
            setFilms(response);
            setTotalPages(response.pages); // Расчет общего количества страниц
            setLoading(false);
        }
        
    }
    const fetchFilms = async (page, limit, country, age, genres, year) => {
        setLoading(true);
        const response = await httpApiMethods.GetByAllFilters(page, limit, true, true, true, false, true, false, false, true, false, false, false, true, country, age, genres, year);
        setFilms(response);
        setTotalPages(response.pages); // Расчет общего количества страниц
        setLoading(false);
    };
    
    
    // Использование useEffect для загрузки данных при монтировании и при изменении страницы, лимита и тд
    useEffect(() => {
        if (searchFilm === false ) {
            fetchFilms(page, limit, country, age, genres, year);
        }
        
        
    }, [page, limit, country, age, genres, year, searchFilm]);
    useEffect(() => {
        // Извлекаем параметры из URL
        
        const country = searchParams.get('country');
        const age = searchParams.get('age');
        const genres = searchParams.get('genres');
        const year = searchParams.get('year');
        const limit = searchParams.get('limit');
        const searchFilm = searchParams.get('searchFilm');
        const page = searchParams.get('page');
        // Если параметры есть, добавляем их в localStorage
        if (country) localStorage.setItem('country', country);
        if (age) localStorage.setItem('age', age);
        if (genres) localStorage.setItem('genres', genres);
        if (year) localStorage.setItem('year', year);
        if (limit) localStorage.setItem('limit', limit);
        if (searchFilm) localStorage.setItem('searchFilm', searchFilm);
        if (page) localStorage.setItem('page', page);

      
    }, [location]);
    const updateSearchParamsAndNavigate = (country, age, genres, year, limit, searchFilm) => {
        // Переходим на новую страницу с обновленными параметрами
        if (clear) {
            navigate('/')
            localStorage.removeItem('country');
            localStorage.removeItem('age');
            localStorage.removeItem('genres');
            localStorage.removeItem('year');
            localStorage.removeItem('limit');
            localStorage.removeItem('searchFilm');
            setStoredCountry(null)
            setStoredAge(null)
            setStoredGenres(null)
            setStoredYear(null)
            setStoredLimit(null)
            setStoredSearchFilm(null)
            country = null;
            genres = null;
            year = null;
            limit = null;
            searchFilm = null;
            age = null;
            setPage(1)
            setClear(false)
            
           
        }
        navigate(`/?${limit ? `limit=${limit}` : ''}${page && page !== 'false' ? `&page=${page}` : ''}${country && country !== 'false' ? `&country=${country}` : ''}${age && age !== 'false' ? `&age=${age}` : ''}${genres && genres !== 'false'  ? `&genres=${genres}` : ''}${year && year !== 'false' ? `&year=${year}` : ''}${searchFilm && searchFilm !== 'false' ? `&searchFilm=${searchFilm}` : ''} `);
    };
    useEffect(() => {
        
        if (country)  localStorage.setItem('country', country);
        if (age) localStorage.setItem('age', age);
        if (genres) localStorage.setItem('genres', genres);
        if (year) localStorage.setItem('year', year);
        if (limit) localStorage.setItem('limit', limit);
        if (searchFilm) localStorage.setItem('searchFilm', searchFilm);
        if (page) localStorage.setItem('page', page);
        if (country) setStoredCountry(country)
        if (age) setStoredAge(age)
        if (genres) setStoredGenres(genres)
        if (year) setStoredYear(year)
        if (limit) setStoredLimit(limit)
        if (searchFilm) setStoredSearchFilm(searchFilm)
       
      
        console.log(searchFilm)
        updateSearchParamsAndNavigate(storedCountry, storedAge, storedGenres, storedYear, storedLimit, storedSearchFilm);
    }, [country, age, genres, year, limit, searchFilm, storedCountry, storedAge, storedGenres, storedYear, storedLimit, storedSearchFilm, page])
    const debouncedFetchSearchFilms = useDebounce((page, limit, searchFilm) => {
        if ((localStorage.getItem('searchFilm') !== 'false' && localStorage.getItem('searchFilm')) || (searchFilm !== 'false' && searchFilm)) {
       
          localStorage.removeItem('country');
          localStorage.removeItem('age');
          localStorage.removeItem('genres');
          localStorage.removeItem('year');
          localStorage.removeItem('limit');
          localStorage.removeItem('countryValue');
    
          if (localStorage.getItem('searchFilm').length === 1) {
            localStorage.setItem('searchFilm', '');
            searchFilm = ''
            updateSearchParamsAndNavigate(storedCountry, storedAge, storedGenres, storedYear, storedLimit, searchFilm);
          }
          if (searchFilm) {
            fetchSearchFilms(page, limit, searchFilm);
          }
         
        
         
        }
     }, 1000); // 1000 milliseconds = 1 second
     useEffect(() => {
        debouncedFetchSearchFilms(page, limit, searchFilm);
     }, [searchFilm, storedSearchFilm, page, limit]);
    // Обработчик изменения страницы в пагинации
    const handlePageChange = (event, value) => {
        setPage(value);
        
    };


   
    return (
        <>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems:'center'}}>
                <Grid container sx={{width: '96%', display: 'flex', justifyContent:'center'}}>

               
                {loading || !Array.isArray(films.docs) ? (
                    Array.from({ length: limit }).map((_, index) => (
                        <Grid item sm={6} xl={3} md={6} lg={4} key={index}>
                            <div  className='event_card'>
                                <div className="event-card__photo">
                                <Skeleton width="100%" height="100%" variant="rectangular"  />
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
                    films.docs.map((item, index) => (
                        <Grid item justifyContent="center" sx={{display: 'flex'}}  sm={12} xl={3} md={6} lg={4} key={index}>
                            <div onClick={() => navigate(`/meet/${item.id}`)} className='event_card'>
                                <div className="event-card__photo">
                                    <img className='img' src={item.poster.previewUrl} alt={item.speackerImage} />
                                </div>
                                <div className="taggs">
                                    <div className='tagged'>{item.rating.kp.toFixed(1)}</div>
                                    <div className="feautures">{item.type}</div>
                                </div>
                                <h4 className="event-card__title">{item.name}</h4>
                                <p className="event-card__date">{truncateString(item.description, 80)}</p>
                            </div>
                        </Grid>
                    ))
                )}
                {/* <EditForm></EditForm> */}
                </Grid>
            </Box>
            <div className='allButton__container'>
                
            <Pagination count={totalPages} page={page} onChange={handlePageChange} variant="outlined" />
                
            </div>
        </>
        
        
    );
}

export default Home;

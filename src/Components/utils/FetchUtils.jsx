/* eslint-disable no-unused-vars */
import axios from "axios"
import { useState } from "react"

import './style.css'
import { Cookie } from "@mui/icons-material"




export class HttpApiMethods {

  token;
   // Конструктор класса, где вы устанавливаете значение токена
 constructor(token) {
  this.token = token;

}
  // URL`s
  APIURL = "https://api.kinopoisk.dev/v1.4"
  API_KEY = process.env.REACT_APP_TOKEN;
  
  // получение фмльма по ID
  GetByID = async (id) => {
    
    let innerUrl = this.APIURL + `/movie/${id}`

    
    try {
      const response = await axios.get(innerUrl, {
        headers: {
          'X-API-KEY': this.API_KEY
        }
      });
      // console.log(response.data);
      return response.data; // Возвращаем данные из ответа
   } catch (error) {
      console.error(error);
   }
  }
  GetInfoAboutSesons = async (id) => {
    let innerUrl = this.APIURL + `/season?page=${1}&limit=${50}&selectFields=poster&selectFields=number&selectFields=name&selectFields=duration&selectFields=description&selectFields=episodesCount&selectFields=episodes&movieId=${id}`;
   
    // Функция для добавления параметра в URL, если он предоставлен
   


 try {
   const response = await axios.get(innerUrl, {
     headers: {
       'X-API-KEY': this.API_KEY
     }
   });
   // console.log(response.data);
   return response.data; // Возвращаем данные из ответа
} catch (error) {
   console.error(error);
}
  }
  SearchFilm = async (page, limit, film) => {
    if (film) {
      let innerUrl = this.APIURL + `/movie/search?page=${page}&limit=${limit}&query=${encodeURIComponent(film)}`

      try {
        const response = await axios.get(innerUrl, {
          headers: {
            'X-API-KEY': this.API_KEY
          }
        });
        // console.log(response.data);
        return response.data; // Возвращаем данные из ответа
     } catch (error) {
        console.error(error);
     }
    }
   
  }
  SearchFilmImage = async (page, limit, id) => {
    if (id) {
      let innerUrl = this.APIURL + `/image?page=${page}&limit=${limit}&movieId=${id}`

      try {
        const response = await axios.get(innerUrl, {
          headers: {
            'X-API-KEY': this.API_KEY
          }
        });
        // console.log(response.data);
        return response.data; // Возвращаем данные из ответа
     } catch (error) {
        console.error(error);
     }
    }
   
  }
  SearchComments = async (page, limit, id) => {
    if (id) {
      let innerUrl = this.APIURL + `/review?page=${page}&limit=${limit}&movieId=${id}`

      try {
        const response = await axios.get(innerUrl, {
          headers: {
            'X-API-KEY': this.API_KEY
          }
        });
        // console.log(response.data);
        return response.data; // Возвращаем данные из ответа
     } catch (error) {
        console.error(error);
     }
    }
   
  }
  // Получение нужного количества фильмов по нужным полям
  GetByAllFilters = async (page, limit, id, name, description, shortDescription, type, status, year, rating, ageRating, votes, budget, poster, Country=false, Age=false, Genres=false, Year=false, logo, alternativeName, isSeries, releaseYears, audience, movieLength, seriesLength, totalSeriesLength, genres, countries, backdrop, ticketsOnSale, videos, networks, persons, fees, similarMovies, lists, top10, top250, updatedAt, createdAt) => {

    let innerUrl = this.APIURL + `/movie?page=${page}&limit=${limit}`;
   
     // Функция для добавления параметра в URL, если он предоставлен
     const addParam = (paramName, value) => {
      if (value) innerUrl += `&selectFields=${paramName}`;
  };

  // Добавляем каждый параметр в URL, если он предоставлен
  addParam('id', id);
  addParam('name', name);
  addParam('description', description);
  addParam('shortDescription', shortDescription);
  addParam('type', type);
  addParam('status', status);
  addParam('year', year);
  addParam('rating', rating);
  addParam('ageRating', ageRating);
  addParam('votes', votes);
  addParam('budget', budget);
  addParam('poster', poster);
  addParam('logo', logo);
  addParam('alternativeName', alternativeName);
  addParam('isSeries', isSeries);
  addParam('releaseYears', releaseYears);
  addParam('audience', audience);
  addParam('movieLength', movieLength);
  addParam('seriesLength', seriesLength);
  addParam('totalSeriesLength', totalSeriesLength);
  addParam('genres', genres);
  addParam('countries', countries);
  addParam('backdrop', backdrop);
  addParam('ticketsOnSale', ticketsOnSale);
  addParam('videos', videos);
  addParam('networks', networks);
  addParam('persons', persons);
  addParam('fees', fees);
  addParam('similarMovies', similarMovies);
  addParam('lists', lists);
  addParam('top10', top10);
  addParam('top250', top250);
  addParam('updatedAt', updatedAt);
  addParam('createdAt', createdAt);
  if (Country) {
    const country = encodeURIComponent(Country)
    innerUrl += `&countries.name=${country}`
  }
  if (Age >= 0 && Age !== false) {
    console.log(Age)
    innerUrl += `&ageRating=${Age}`
  }
  if (Genres) {
    const genres = encodeURIComponent(Genres)
    innerUrl += `&genres.name=${genres}`
  }
  if (Year) {
    
    innerUrl += `&year=${Year}`

  }
  console.log(innerUrl)
  try {
    const response = await axios.get(innerUrl, {
      headers: {
        'X-API-KEY': this.API_KEY
      }
    });
    // console.log(response.data);
    return response.data; // Возвращаем данные из ответа
 } catch (error) {
    console.error(error);
 }
  }


  
  // 
  // Users
  // 
  PostUsers = async (data) => {
    let innerUrl = this.APIURL + `/users`
    const responce = await axios.postForm(innerUrl, data)
    return responce.data
  }
  EditUsers = async (data) => {
    let innerUrl = this.APIURL + `/users`
    const responce = await axios.putForm(innerUrl, data, { headers: {"Authorization" : `Bearer ${this.token}`} }) // 
    return responce.data.id
  }
  GetUsers = async (id) => {
    let innerUrl = this.APIURL + `/users?id=${id}`

    const responce = await axios.get(innerUrl) //

    return responce.data
  }



}






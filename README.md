# Чтобы запустить проект вместе с токеном необходимо ввести команду


set REACT_APP_TOKEN=yourTocken && npm start





# Использование сайта
Можно переходить по фильмам, использовать фильтры, которые не сбрасываются и отображаются в ссылке, для того чтобы с информации о фильме\сериале перейти назад, необходимо нажать на слово муза в хедере

# Запросы к серверу
## Запрос на получение фильма по id
![image](https://github.com/vsevolod22/AvitoKino/assets/96574851/9074f333-2ff1-4b45-b95b-47b35696c057)
## ответ
![image](https://github.com/vsevolod22/AvitoKino/assets/96574851/5c20b0a5-099d-4f73-bafb-3e2fcca52d33)


 ## Получение нужного количества фильмов по нужным полям\
```js
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
```
## ответ при запросе с определёнными полями
```js
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
```
![image](https://github.com/vsevolod22/AvitoKino/assets/96574851/dcdee4c1-1c9d-4600-9ee2-b519d9444112)


## Получение постеров
![image](https://github.com/vsevolod22/AvitoKino/assets/96574851/a4754ac6-7b27-438e-b84d-87f473ed3eba)
## В результате приходит нужное количество постеров, которые далее фильтруются по размерам
![image](https://github.com/vsevolod22/AvitoKino/assets/96574851/086e7368-5188-4eba-a7cb-1429035d7cf6)

## Запрос на получание коментариев (отзывов)
![image](https://github.com/vsevolod22/AvitoKino/assets/96574851/e0b73c4a-4438-4bf3-b3d7-6ea9a0675644)

## Ответ
![image](https://github.com/vsevolod22/AvitoKino/assets/96574851/5d58dfa9-15fa-409d-ae13-afdbc095dba4)

## Получение информации о сезонах 
```js
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

```
## Ответ
![image](https://github.com/vsevolod22/AvitoKino/assets/96574851/b461ed4b-b5b0-4a43-8167-6cc3d5e399df)
### При нажатии на выбранный сезон с него достаются эпизоды без повторных запросов

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

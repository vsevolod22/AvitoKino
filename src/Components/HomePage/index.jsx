import Header from "../Header";
import styles from "./style.module.scss";
// import TableMeets from '../TableMeets/TableMeets'
// import EditForm from "../edit/EditMeetsForm";
// import PostForm from "../post/Meets";
// import Users from "../post/Users";
// import User from "../get/User";
// import Questions from "../post/Questions";
// import { GetQuestions } from "../get/Questions";

import { useState, useEffect } from "react";
import muza from '../../img/homePage/muza.png';
import Home from "../Home/Home";
import { useNavigate } from "react-router-dom";
const APIURL = ''


const HomePage = () => {
   
    const [selectedType, setSelectedType] = useState('');
    const [clearStorageValue, setClearStorageValue] = useState(false);
    const [selectedCount, setSelectedCount] = useState(localStorage.getItem('limit') || '10');
    const [selectedCountry, setSelectedCountry] = useState(localStorage.getItem('countryValue') || '');
    const [selectedAgeRating, setSelectedAgeRating] = useState(localStorage.getItem('age') || '');
    const [countryValue, setCountryValue] = useState(localStorage.getItem('country') || '');
    const [genresValue, setGenresValue] = useState(localStorage.getItem('genres') || '');
    const [searchYear, setSearchYear] = useState(localStorage.getItem('year') || '');
    const [searchFilm, setSearchFilm] = useState(localStorage.getItem('searchFilm') || '');
    const navigate = useNavigate();
    const clearStorage = () => {
        navigate('/')
        localStorage.removeItem('country');
        localStorage.removeItem('age');
        localStorage.removeItem('genres');
        localStorage.removeItem('year');
        localStorage.removeItem('limit');
        localStorage.removeItem('searchFilm');
        setSelectedCountry('')
        setSelectedCount('10')
        setSelectedAgeRating('')
        setCountryValue('')
        setSearchYear('')
        setGenresValue('')
        setSearchFilm('')
        setClearStorageValue(true)
        navigate('/')




    }

    const handleInputChangeYear = (event) => {
       setSearchYear(event.target.value);
    };
    const handleInputChangeFilm = (event) => {
        setSearchFilm(event.target.value);
        setSelectedCountry('')
        setSelectedCount('10')
        setSelectedAgeRating('')
        setCountryValue('')
        setSearchYear('')
        setGenresValue('')
        localStorage.removeItem('country');
        localStorage.removeItem('age');
        localStorage.removeItem('genres');
        localStorage.removeItem('year');
        localStorage.removeItem('limit');
     };
    const handleChangeCountry = (event) => {
       const selectedOption = event.target.options[event.target.selectedIndex];

       const selectedText = selectedOption.textContent;
       localStorage.setItem('countryValue', event.target.value);
       setSelectedCountry(selectedOption)
       console.log(selectedText); // Выводит текст выбранной опции
       setCountryValue(selectedText);
       setSelectedCountry(event.target.value);
    };
   
    const handleChangeAgeRating = (event) => {
       setSelectedAgeRating(event.target.value);
       
    };
    const handleChangeCount = (event) => {
       setSelectedCount(event.target.value);
    };
    const handleChangeType = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
       const selectedText = selectedOption.textContent;
       console.log(selectedText); // Выводит текст выбранной опции
       setGenresValue(selectedText);
       setSelectedType(event.target.value);
    };
    
    return (
    <>

        <Header></Header>
        <div className={styles.muza_firstContainer}>
            <div className={styles.muza_secondContainer}>
                
                <div className={styles.muza_img_container}><img src={muza} alt='muza' className={styles.muza_img}></img></div>
                <section className={styles.muza__container}>
                    
                    <div className={styles.muza__title}>МУЗА</div>
                    <div className={styles.muza__descr_container}>
                        <div className={styles.muza__descr}>Найди кино по своему настроению!</div>
                    </div>
                    
                </section>
                <section className={styles.meeting__container}>
                    <input
                        className={styles.meeting__inputs}
                        placeholder="Найти кино"
                        value={searchFilm}
                        onChange={handleInputChangeFilm}
                    />
                 
                    <div className={styles.container}>
                        <div className={styles.select__container}>
                        <input
                            className={styles.meeting__inputs_small}
                            placeholder="Поиск по году (прим: 1990-2024)"
                            value={searchYear}
                            onChange={handleInputChangeYear}
                        />
                       
                            <select
                                className={styles.select}
                                name="time__meeting"
                                value={selectedCountry}
                                onChange={handleChangeCountry}
                                >
                               
                                {selectedCountry === '' && <option value="">Страна</option>}
                               <option value="2">Россия</option><option value="1">США</option><option value="13">СССР</option><option value="25">Австралия</option><option value="57">Австрия</option><option value="136">Азербайджан</option><option value="120">Албания</option><option value="20">Алжир</option><option value="1062">Американское Самоа</option><option value="139">Ангола</option><option value="159">Андорра</option><option value="1044">Антарктида</option><option value="1030">Антигуа и Барбуда</option><option value="1009">Антильские Острова</option><option value="24">Аргентина</option><option value="89">Армения</option><option value="175">Аруба</option><option value="113">Афганистан</option><option value="124">Багамы</option><option value="75">Бангладеш</option><option value="105">Барбадос</option><option value="164">Бахрейн</option><option value="69">Беларусь</option><option value="173">Белиз</option><option value="41">Бельгия</option><option value="140">Бенин</option><option value="109">Берег Слоновой кости</option><option value="1004">Бермуды</option><option value="148">Бирма</option><option value="63">Болгария</option><option value="118">Боливия</option><option value="178">Босния</option><option value="39">Босния и Герцеговина</option><option value="145">Ботсвана</option><option value="10">Бразилия</option><option value="1066">Бруней-Даруссалам</option><option value="92">Буркина-Фасо</option><option value="162">Бурунди</option><option value="114">Бутан</option><option value="1059">Вануату</option><option value="1076">Ватикан</option><option value="11">Великобритания</option><option value="49">Венгрия</option><option value="72">Венесуэла</option><option value="1077">Виргинские Острова (Великобритания)</option><option value="1026">Виргинские Острова (США)</option><option value="1064">Внешние малые острова США</option><option value="52">Вьетнам</option><option value="170">Вьетнам Северный</option><option value="127">Габон</option><option value="99">Гаити</option><option value="165">Гайана</option><option value="1040">Гамбия</option><option value="144">Гана</option><option value="142">Гваделупа</option><option value="135">Гватемала</option><option value="129">Гвинея</option><option value="116">Гвинея-Бисау</option><option value="3">Германия</option><option value="60">Германия (ГДР)</option><option value="18">Германия (ФРГ)</option><option value="1022">Гибралтар</option><option value="112">Гондурас</option><option value="28">Гонконг</option><option value="1060">Гренада</option><option value="117">Гренландия</option><option value="55">Греция</option><option value="61">Грузия</option><option value="1045">Гуам</option><option value="4">Дания</option><option value="1028">Джибути</option><option value="1031">Доминика</option><option value="128">Доминикана</option><option value="101">Египет</option><option value="155">Заир</option><option value="133">Замбия</option><option value="1043">Западная Сахара</option><option value="104">Зимбабве</option><option value="42">Израиль</option><option value="29">Индия</option><option value="73">Индонезия</option><option value="154">Иордания</option><option value="90">Ирак</option><option value="48">Иран</option><option value="38">Ирландия</option><option value="37">Исландия</option><option value="15">Испания</option><option value="14">Италия</option><option value="169">Йемен</option><option value="146">Кабо-Верде</option><option value="122">Казахстан</option><option value="1051">Каймановы острова</option><option value="84">Камбоджа</option><option value="95">Камерун</option><option value="6">Канада</option><option value="1002">Катар</option><option value="100">Кения</option><option value="64">Кипр</option><option value="1024">Кирибати</option><option value="31">Китай</option><option value="56">Колумбия</option><option value="1058">Коморы</option><option value="134">Конго</option><option value="1014">Конго (ДРК)</option><option value="156">Корея</option><option value="137">Корея Северная</option><option value="26">Корея Южная</option><option value="1013">Косово</option><option value="131">Коста-Рика</option><option value="1074">Кот-д’Ивуар</option><option value="76">Куба</option><option value="147">Кувейт</option><option value="86">Кыргызстан</option><option value="149">Лаос</option><option value="54">Латвия</option><option value="1015">Лесото</option><option value="176">Либерия</option><option value="97">Ливан</option><option value="126">Ливия</option><option value="123">Литва</option><option value="125">Лихтенштейн</option><option value="59">Люксембург</option><option value="115">Маврикий</option><option value="67">Мавритания</option><option value="150">Мадагаскар</option><option value="153">Макао</option><option value="80">Македония</option><option value="1025">Малави</option><option value="83">Малайзия</option><option value="151">Мали</option><option value="1050">Мальдивы</option><option value="111">Мальта</option><option value="43">Марокко</option><option value="102">Мартиника</option><option value="1067">Маршалловы острова</option><option value="1042">Масаи</option><option value="17">Мексика</option><option value="1041">Мелкие отдаленные острова США</option><option value="81">Мозамбик</option><option value="58">Молдова</option><option value="22">Монако</option><option value="132">Монголия</option><option value="1065">Монтсеррат</option><option value="1034">Мьянма</option><option value="91">Намибия</option><option value="106">Непал</option><option value="157">Нигер</option><option value="110">Нигерия</option><option value="12">Нидерланды</option><option value="138">Никарагуа</option><option value="35">Новая Зеландия</option><option value="1006">Новая Каледония</option><option value="33">Норвегия</option><option value="119">ОАЭ</option><option value="1019">Оккупированная Палестинская территория</option><option value="1003">Оман</option><option value="1052">Остров Мэн</option><option value="1047">Остров Святой Елены</option><option value="1063">Острова Кука</option><option value="1007">острова Теркс и Кайкос</option><option value="74">Пакистан</option><option value="1057">Палау</option><option value="78">Палестина</option><option value="107">Панама</option><option value="163">Папуа - Новая Гвинея</option><option value="143">Парагвай</option><option value="23">Перу</option><option value="32">Польша</option><option value="36">Португалия</option><option value="82">Пуэрто Рико</option><option value="1036">Реюньон</option><option value="1033">Российская империя</option><option value="2">Россия</option><option value="103">Руанда</option><option value="46">Румыния</option><option value="121">Сальвадор</option><option value="1039">Самоа</option><option value="1011">Сан-Марино</option><option value="1072">Сан-Томе и Принсипи</option><option value="158">Саудовская Аравия</option><option value="1029">Свазиленд</option><option value="1078">Северная Македония</option><option value="1010">Сейшельские острова</option><option value="65">Сенегал</option><option value="1055">Сент-Винсент и Гренадины</option><option value="1071">Сент-Китс и Невис</option><option value="1049">Сент-Люсия </option><option value="177">Сербия</option><option value="174">Сербия и Черногория</option><option value="1021">Сиам</option><option value="45">Сингапур</option><option value="98">Сирия</option><option value="94">Словакия</option><option value="40">Словения</option><option value="1069">Соломоновы Острова</option><option value="160">Сомали</option><option value="13">СССР</option><option value="167">Судан</option><option value="171">Суринам</option><option value="1">США</option><option value="1023">Сьерра-Леоне</option><option value="70">Таджикистан</option><option value="44">Таиланд</option><option value="27">Тайвань</option><option value="130">Танзания</option><option value="1068">Тимор-Лесте</option><option value="161">Того</option><option value="1012">Тонга</option><option value="88">Тринидад и Тобаго</option><option value="1053">Тувалу</option><option value="50">Тунис</option><option value="152">Туркменистан</option><option value="68">Турция</option><option value="172">Уганда</option><option value="71">Узбекистан</option><option value="62">Украина</option><option value="1073">Уоллис и Футуна</option><option value="79">Уругвай</option><option value="1008">Фарерские острова</option><option value="1038">Федеративные Штаты Микронезии</option><option value="166">Фиджи</option><option value="47">Филиппины</option><option value="7">Финляндия</option><option value="1075">Фолклендские острова</option><option value="8">Франция</option><option value="1032">Французская Гвиана</option><option value="1046">Французская Полинезия</option><option value="85">Хорватия</option><option value="141">ЦАР</option><option value="77">Чад</option><option value="1020">Черногория</option><option value="34">Чехия</option><option value="16">Чехословакия</option><option value="51">Чили</option><option value="21">Швейцария</option><option value="5">Швеция</option><option value="1070">Шпицберген и Ян-Майен</option><option value="108">Шри-Ланка</option><option value="96">Эквадор</option><option value="1061">Экваториальная Гвинея</option><option value="87">Эритрея</option><option value="53">Эстония</option><option value="168">Эфиопия</option><option value="30">ЮАР</option><option value="19">Югославия</option><option value="66">Югославия (ФР)</option><option value="93">Ямайка</option><option value="9">Япония</option>
                            </select>
                            <select
                                className={styles.select}
                                name="type__meeting"
                                value={selectedAgeRating}
                                onChange={handleChangeAgeRating}
                                >
                        
                                {selectedAgeRating === '' && <option value="">Возрастной рейтинг</option>}
                                <option value="0">0+</option>
                                <option value="6">6+</option>
                                <option value="12">12+</option>
                                <option value="16">16+</option>
                                <option value="18">18+</option>
                               
                               
                            </select>
                            <button style={{marginRight: '0px', width: '80px'}} onClick={clearStorage} className={styles.select_count}>Сбросить фильтры</button>
                        </div>
                    </div>
                    <div className={styles.NewContainer}>
                        <div className={styles.search_container}>
                            <div className={styles.search__descr}>
                            <select
                                className={styles.select_count}
                                name="count"
                                value={selectedCount}
                                onChange={handleChangeCount}
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select> элементов</div>
                            <select
                                className={styles.select}
                                name="type__meeting"
                                value={selectedType}
                                onChange={handleChangeType}
                            >
                                {selectedType === '' && <option value="">Выберите жанр</option>}
                                <option value="1750">аниме</option><option value="22">биография</option><option value="3">боевик</option><option value="13">вестерн</option><option value="19">военный</option><option value="17">детектив</option><option value="456">детский</option><option value="20">для взрослых</option><option value="12">документальный</option><option value="8">драма</option><option value="27">игра</option><option value="23">история</option><option value="6">комедия</option><option value="1747">концерт</option><option value="15">короткометражка</option><option value="16">криминал</option><option value="7">мелодрама</option><option value="21">музыка</option><option value="14">мультфильм</option><option value="9">мюзикл</option><option value="28">новости</option><option value="10">приключения</option><option value="25">реальное ТВ</option><option value="11">семейный</option><option value="24">спорт</option><option value="26">ток-шоу</option><option value="4">триллер</option><option value="1">ужасы</option><option value="2">фантастика</option><option value="18">фильм-нуар</option><option value="5">фэнтези</option><option value="1751">церемония</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.cards__container}>
                        <div className={styles.card}></div>
                    </div>
                    {/* <Questions></Questions> */}
                    <Home clear={clearStorageValue} setClear={setClearStorageValue} country={countryValue ? countryValue : false} age={selectedAgeRating !== '' ? selectedAgeRating : false} genres={genresValue ? genresValue : false} year={ searchYear > 1875 && searchYear < 2051 ? searchYear : false} limit={selectedCount} searchFilm={searchFilm ? searchFilm : false}></Home>
                    
                    
                    {/* <Users></Users> */}
                    
                    {/* <GetQuestions></GetQuestions> */}
                    {/* <Users></Users> */}

                </section>
            </div>
        </div>
        
       
        


        
    </>
    

    )
}
export default HomePage;
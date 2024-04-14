
import styles from './style.module.scss';
import logo from '../../img/headerImg/header.png';
import google from '../../img/headerImg/google.png';

import icon from '../../img/headerImg/Icon.png';
import Menu from '../Menu'
import { useNavigate } from "react-router-dom";


import { useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
    }
    const isAuth = useState(true)[0];
    console.log(isAuth)


    return (
        <>
            {(isAuth ? (
            <div className={styles.header__container}>
            <header className={styles.header}>
                <div className={styles.header__logo} onClick={handleHome} ><img onClick={handleHome} src={logo} alt="logo"></img></div>
                <div className={styles.header_img_container}>  <Menu></Menu></div>
            </header>
        </div>
        ) :
        (
            <div className={styles.header__container}>
                <header className={styles.header}>
                    <div className={styles.header__logo} onClick={handleHome} ><img onClick={handleHome} src={logo} alt="logo"></img></div>
                    <button className={styles.header__button}>ВХОД <img className={styles.header__button_img} src={google}></img></button>
                </header>
            </div>
        ))
            }
       

        </>
        
    )

}
export default Header;
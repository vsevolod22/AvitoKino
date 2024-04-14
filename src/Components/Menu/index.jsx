import * as React from 'react';
import styles from './style.module.scss';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import avatar from '../../img/headerImg/avatar.png'
import { useNavigate } from "react-router-dom";;

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
        setAnchorEl(null);
    }
    const handleProfile = () => {
        navigate('/profile');
        setAnchorEl(null);
    }
    const handleAtchive = () => {
        navigate('/achievements');
        setAnchorEl(null);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
  return (
    <>
      <img
        src={avatar}
        className={styles.header_img}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      </img>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleProfile}>Профиль</MenuItem>
        <MenuItem onClick={handleAtchive}>Достижения</MenuItem>
        <MenuItem onClick={handleHome}>Выйти</MenuItem>
      </Menu>
    </>
  );
}

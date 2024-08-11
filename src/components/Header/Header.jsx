import React from 'react';
import s from './header.module.css'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <Link className='link' to='/'><img className={s.logo} src={logo} alt="logo" /></Link>
        </>
    );
};

export default Header;
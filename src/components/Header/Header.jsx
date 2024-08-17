import React from 'react';
import s from './header.module.css'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <Link className='link' to='/'>
                <div className={s.container}>
                    <img className={s.logo} src={logo} alt="logo" />
                    <span className={s.span}>online</span>
                </div>
            </Link> 
        </>
    );
};

export default Header;
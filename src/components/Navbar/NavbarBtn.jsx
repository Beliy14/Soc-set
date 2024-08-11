import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavbarBtn = ({ to, title, styleClass }) => {
    const location = useLocation();

    const btnClass = location.pathname === to ? `${styleClass.link} ${styleClass.active}` : styleClass.link;

    return (
        <Link className={btnClass} to={to}>{title}</Link>
    );
};

export default NavbarBtn;
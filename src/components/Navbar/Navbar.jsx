import React from 'react';
import s from './navbar.module.css';
import NavbarBtn from './NavbarBtn';

const Navbar = () => {
    return (
        <>
            <div className={s.nav}>
                <h2 className={s.title}>Menu</h2>
                <NavbarBtn to="/profile" title="Profile" styleClass={s} />
                <NavbarBtn to="/messages" title="Messages" styleClass={s} />
                <NavbarBtn to="/users" title="Users" styleClass={s} />
                <NavbarBtn to="/news" title="News" styleClass={s} />
                <NavbarBtn to="/music" title="Music" styleClass={s} />
            </div>
            <NavbarBtn to="/settings" title="Settings" styleClass={s} />
        </>
    );
};

export default Navbar;
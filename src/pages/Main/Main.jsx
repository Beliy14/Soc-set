import React from 'react';
import s from './main.module.css';

const Main = () => {
    return (
        <div className={s.container}>
            <h1 className={s.title}>Soc Set <span className={s.span}>online</span></h1>
        </div>
    );
};

export default Main;
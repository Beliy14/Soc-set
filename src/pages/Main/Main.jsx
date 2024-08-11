import React from 'react';
import s from './main.module.css';

const Main = () => {
    return (
        <div className={s.container}>
            <h1 className={s.title}>Soc Set</h1>
            <p className={s.description}>Almost a social (no) network where you can create posts, communicate in messages, watch the news, listen to music. If only you weren't the only user of it...</p>
        </div>
    );
};

export default Main;
import React from 'react';
import Accordion from '../../components/Accordion/Accordion';
import ProfileContainer from './components/ProfileContainer/ProfileContainer';

const Settings = () => {

    return (
        <div>
            <Accordion title="Profile" content={<ProfileContainer/>} />
            <Accordion title="Messages" content="" />
            <Accordion title="News" content="" />
            <Accordion title="Music" content="" />
        </div>
    );
};

export default Settings;
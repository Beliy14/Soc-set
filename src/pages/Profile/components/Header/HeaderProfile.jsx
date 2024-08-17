import React from "react"
import s from "./headerProfile.module.css"
import { CiSettings } from "react-icons/ci";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const HeaderProfile = ({avatar, name, aboutMe}) => {

  return (
    <header className={s.header}>
      {avatar 
            ? <img src={avatar} alt={name} className={s.avatar} /> 
            : <img src={`https://placehold.co/200x200?text=${name}`} className={s.avatar} alt={name} />
      }
      <section>
        <h2>{name}</h2>
        <p>{aboutMe}</p>
      </section>
      <IconContext.Provider value={{size: '2em', color: '#0b0e13ff'}}>
        <Link to='/settings'><CiSettings className={s.setting} /></Link>
      </IconContext.Provider>
    </header>
  )
}

export default HeaderProfile

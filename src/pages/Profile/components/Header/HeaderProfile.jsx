import React from "react"
import s from "./headerProfile.module.css"
import { CiSettings } from "react-icons/ci";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderProfile = () => {

  const {name, dateBirth} = useSelector(state => state.dataProfile)

  return (
    <header className={s.header}>
      <img className={s.avatar} src="https://avatars.mds.yandex.net/i?id=7042a3cae62e904b8591a6ec485ed22d-3553023-images-thumbs&n=13" alt="" />
      <section>
        <h2>{name || 'The name is not specified'}</h2>
        <p>Birthday: {dateBirth || 'Not specified'}</p>
      </section>
      <IconContext.Provider value={{size: '2em', color: '#0b0e13ff'}}>
        <Link to='/settings'><CiSettings className={s.setting} /></Link>
      </IconContext.Provider>
    </header>
  )
}

export default HeaderProfile

import React from "react"
import s from "./headerProfile.module.css"
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import { useSelector } from "react-redux"

const HeaderProfile = React.memo(({ avatar, name, aboutMe, userId }) => {
  const { id } = useSelector((state) => state.auth)

  return (
    <header className={s.header}>
      {avatar ? <img src={avatar} alt={name} className={s.avatar} /> : <img src={`https://placehold.co/200x200?text=${name}`} className={s.avatar} alt={name} />}
      <section>
        <h2>{name}</h2>
        {id !== userId ? <p>{aboutMe}</p> : <ProfileStatus id={id}/>}
      </section>
    </header>
  )
})

export default HeaderProfile




// может нужно убрать memo!?
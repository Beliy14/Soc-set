import React from "react"
import s from "../Header/headerProfile.module.css"

const ProfilePhoto = ({ avatar, name, setIsBackdrop }) => {
  return <img onClick={() => setIsBackdrop(true)} src={avatar || `https://placehold.co/200x200?text=${name}`} alt={name} className={s.avatar} />
}

export default ProfilePhoto

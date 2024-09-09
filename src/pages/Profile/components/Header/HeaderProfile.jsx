import React, { useState } from "react"
import s from "./headerProfile.module.css"
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import { useSelector } from "react-redux"
import Backdrop from "../Backdrop/Backdrop"
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto"

const HeaderProfile = React.memo(({ avatar, name, aboutMe, refetch, owner }) => {
  const { id } = useSelector((state) => state.auth)

  const [isBackdrop, setIsBackdrop] = useState(false)

  return (
    <>
      {isBackdrop && avatar && <Backdrop owner={owner} setIsBackdrop={setIsBackdrop} photo={avatar} name={name} refetch={refetch} />}

      <header className={s.header}>
        <ProfilePhoto setIsBackdrop={setIsBackdrop} avatar={avatar} name={name} />
        <section>
          <h2>{name}</h2>
          {owner ? <ProfileStatus id={id} /> : <p>{aboutMe}</p>}
        </section>
      </header>
    </>
  )
})

export default HeaderProfile

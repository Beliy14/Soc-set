import React from "react"
import s from "./headerProfile.module.css"
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import { useSelector } from "react-redux"
import { useUpdateProfilePhotoMutation } from "../../../../store/queryApi/profileApi"

const HeaderProfile = React.memo(({ avatar, name, aboutMe, userId, refetch }) => {
  const { id } = useSelector((state) => state.auth)
  const [updatePhoto] = useUpdateProfilePhotoMutation()

  const onPhotoSelected = async (e) => {
    if (e.target.files.length) {
      try {
        const res = await updatePhoto(e.target.files[0])
        if (res.data.resultCode === 0) {
          refetch()
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  return id !== userId ? ( // позже вынести проверку в Profile, чтобы передавать это и в MainProfile
    // his
    <header className={s.header}>
      {avatar ? <img src={avatar} alt={name} className={s.avatar} /> : <img src={`https://placehold.co/200x200?text=${name}`} className={s.avatar} alt={name} />}
      <section>
        <h2>{name}</h2>
        <p>{aboutMe}</p>
      </section>
    </header>
  ) : (
    // my
    <header className={s.header}>
      {avatar ? <img src={avatar} alt={name} className={s.avatar} /> : <img src={`https://placehold.co/200x200?text=${name}`} className={s.avatar} alt={name} />}
      <input type="file" accept=".jpg, .jpeg, .png" onChange={onPhotoSelected} />
      <section>
        <h2>{name}</h2>
        <ProfileStatus id={id} />
      </section>
    </header>
  )
})

export default HeaderProfile

import React from "react"
import s from "./profileInfo.module.css"
import { useSelector } from "react-redux"

const ProfileStaticInfo = ({ props, onEdit, owner }) => {
  const language = useSelector((state) => state.language.language)

  return (
    <>
      <div className={s.infoBlock}>
        <b>{language === "en" ? "Looking for a job:" : "Ищу работу:"}</b>
        <p>{props?.lookingForAJob ? (language === "en" ? "Yes" : "Да") : language === "en" ? "No" : "Нет"}</p>
      </div>
      <div className={s.infoBlock}>
        <b>{language === "en" ? "Professional skills:" : "Профессиональные навыки:"}</b>
        <p>{props?.lookingForAJobDescription ?? "No skills"}</p>
      </div>
      <b>{language === "en" ? "Contacts:" : "Контакты:"}</b>

      {Object.keys(props?.contacts).map((contact) => (
        <div key={contact} className={s.infoBlock}>
          <p>
            {contact}:{" "}
            <a className={s.link} target="_blank" rel="noreferrer" href={props.contacts[contact]}>
              {props.contacts[contact] ?? "..."}
            </a>
          </p>
        </div>
      ))}

      {owner && (
        <div className={s.centerBlock}>
          <button className={s.editBtn} onClick={onEdit}>
            {language === "en" ? "Edit" : "Изменить"}
          </button>
        </div>
      )}
    </>
  )
}

export default ProfileStaticInfo

import React from 'react';
import s from "./profileInfo.module.css"


const ProfileStaticInfo = ({ props, onEdit, owner }) => {
    return (
      <>
        <div className={s.infoBlock}>
          <b>Looking for a job:</b> <p>{props?.lookingForAJob ? "Yes" : "No"}</p>
        </div>
        <div className={s.infoBlock}>
          <b>Professional skills:</b> <p>{props?.lookingForAJobDescription ?? "No skills"}</p>
        </div>
        <b>Contacts:</b>
  
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
              Edit
            </button>
          </div>
        )}
      </>
    )
  }

export default ProfileStaticInfo;
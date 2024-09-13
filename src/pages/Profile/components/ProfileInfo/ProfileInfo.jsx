import React, { useEffect, useState } from "react"
import s from "./profileInfo.module.css"
import { useLocation } from "react-router-dom"
import ProfileStaticInfo from "./ProfileStaticInfo"
import ProfileEditInfo from "./ProfileEditInfo"

const ProfileInfo = ({ onInfoBlock, props, owner, refetch }) => {
  const [editMode, setEditMode] = useState(false)

  const location = useLocation()

  const onEdit = () => {
    if (editMode) {
      setEditMode(false)
    } else {
      setEditMode(true)
    }
  }

  useEffect(() => {
    setEditMode(false)
  }, [location.pathname])

  return (
    <div className={s.block} onClick={onInfoBlock}>
      {editMode ? <ProfileEditInfo refetch={refetch} props={props} onEdit={onEdit} /> : <ProfileStaticInfo owner={owner} props={props} onEdit={onEdit} />}
    </div>
  )
}

export default ProfileInfo

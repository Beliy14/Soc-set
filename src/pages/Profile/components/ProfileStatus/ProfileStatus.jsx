import React, { useState, useEffect } from "react"
import { useUpdateProfileStatusMutation, useGetProfileStatusQuery } from "../../../../store/queryApi/profileApi"
import { useDispatch, useSelector } from "react-redux"
import { setAlertVisible } from "../../../../store/slices/alertSlice"
import s from "./profileStatus.module.css"

const ProfileStatus = ({ id }) => {
  const { data: status, refetch } = useGetProfileStatusQuery(id)
  const [updateStatus] = useUpdateProfileStatusMutation()
  const [editMode, setEditMode] = useState(false)
  const [newStatus, setNewStatus] = useState(status)
  const alertVisible = useSelector((state) => state.alert.alertVisible)
  const language = useSelector((state) => state.language.language)
  const dispatch = useDispatch()

  useEffect(() => {
    if (status) {
      setNewStatus(status)
    }
  }, [status])

  const handleEdit = async () => {
    try {
      if (editMode) {
        const res = await updateStatus(newStatus)
        if (res?.data?.resultCode === 0) {
          refetch()
        }
        if (res?.error?.status === 403 && !alertVisible) {
          dispatch(setAlertVisible(true))
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setEditMode(!editMode)
    }
  }

  const onStatusChange = (e) => {
    setNewStatus(e.currentTarget.value)
  }

  return (
    <>
      {!editMode ? (
        <span onClick={handleEdit} className={s.status}>
          {newStatus ?? <span className={s.statusNull}>{language === "en" ? "Status" : "Статус"}</span>}
        </span>
      ) : (
        <div>
          <input autoFocus={true} onBlur={handleEdit} onChange={onStatusChange} type="text" value={newStatus} className={s.statusInput} />
        </div>
      )}
    </>
  )
}

export default ProfileStatus

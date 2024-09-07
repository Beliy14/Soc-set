import React, { useState, useEffect } from "react"
import s from "./profileStatus.module.css"
import { useUpdateProfileStatusMutation, useGetProfileStatusQuery } from "../../../../store/queryApi/profileApi"

const ProfileStatus = ({ id }) => {
  const { data: status, refetch } = useGetProfileStatusQuery(id)
  const [updateStatus] = useUpdateProfileStatusMutation()
  const [editMode, setEditMode] = useState(false)
  const [newStatus, setNewStatus] = useState(status)

  useEffect(() => {
    if (status) {
      setNewStatus(status)
    }
  }, [status])

  const handleEdit = async () => {
    try {
      if (editMode) {
        const res = await updateStatus(newStatus)
        if (res.data.resultCode === 0) {
          refetch()
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
        <div>
          <span onClick={handleEdit} className={s.status}>{newStatus ?? <span className={s.statusNull}>Status</span>}</span>
        </div>
      ) : (
        <div>
          <input autoFocus={true} onBlur={handleEdit} onChange={onStatusChange} type="text" value={newStatus} className={s.statusInput} />
        </div>
      )}
    </>
  )
}

export default ProfileStatus
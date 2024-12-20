import React, { useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MdDriveFolderUpload } from "react-icons/md"
import { IconContext } from "react-icons"
import s from "./backdrop.module.css"
import { useUpdateProfilePhotoMutation } from "../../../../store/queryApi/profileApi"
import { setAlertVisible } from "../../../../store/slices/alertSlice"

const Backdrop = ({ owner, setIsBackdrop, photo, name, refetch }) => {
  const [updatePhoto] = useUpdateProfilePhotoMutation()
  const fileInputRef = useRef(null)
  const modalOverlayRef = useRef(null)
  const alertVisible = useSelector((state) => state.alert.alertVisible)

  const dispatch = useDispatch()

  const handlePhoto = () => {
    fileInputRef.current.click()
  }

  const handleKeyDownClose = (e) => {
    if (e.key === "Escape") {
      setIsBackdrop(false)
    }
  }

  const onPhotoSelected = async (e) => {
    if (e.target.files.length) {
      const res = await updatePhoto(e.target.files[0])
      if (res?.data?.resultCode === 0) {
        refetch()
      }
      if (res?.error?.status === 403) {
        if (!alertVisible) dispatch(setAlertVisible(true))
        setIsBackdrop(false)
      }
    }
  }

  useEffect(() => {
    if (modalOverlayRef.current) {
      modalOverlayRef.current.focus()
    }
  }, [])

  return (
    <div className={s.modalOverlay} onKeyDown={handleKeyDownClose} onClick={() => setIsBackdrop(false)} tabIndex="0" ref={modalOverlayRef}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src={photo} alt={name} className={s.photo} />

        {owner && (
          <IconContext.Provider value={{ color: "#555555", size: "2em" }}>
            <MdDriveFolderUpload className={s.button} onClick={handlePhoto} />
            <input type="file" accept=".jpg, .jpeg, .png" onChange={onPhotoSelected} ref={fileInputRef} />
          </IconContext.Provider>
        )}
      </div>
    </div>
  )
}

export default Backdrop

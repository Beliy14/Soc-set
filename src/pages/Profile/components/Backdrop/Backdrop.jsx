import React, { useRef } from "react"
import { MdDriveFolderUpload } from "react-icons/md"
import { IconContext } from "react-icons"
import s from "./backdrop.module.css"
import { useUpdateProfilePhotoMutation } from "../../../../store/queryApi/profileApi"

const Backdrop = ({ owner, setIsBackdrop, photo, name, refetch }) => {
  const [updatePhoto] = useUpdateProfilePhotoMutation()
  const fileInputRef = useRef(null);

  const handlePhoto = () => {
    fileInputRef.current.click();
  };

  const onPhotoSelected = async (e) => {
    if (e.target.files.length) {
      const res = await updatePhoto(e.target.files[0])
      if (res.data.resultCode === 0) {
        refetch()
      }
    }
  }

  return (
    <div className={s.modalOverlay} onClick={() => setIsBackdrop(false)}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>

        <img src={photo} alt={name} className={s.photo} />

        {owner && (
          <IconContext.Provider value={{ color: "#555555", size: "2em" }}>
            <MdDriveFolderUpload className={s.button} onClick={handlePhoto} />
            <input type="file" accept=".jpg, .jpeg, .png" onChange={onPhotoSelected} ref={fileInputRef}/>
          </IconContext.Provider>
        )}

      </div>
    </div>
  )
}

export default Backdrop

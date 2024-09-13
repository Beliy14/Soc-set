import React, { useState } from "react"
import s from "./headerProfile.module.css"
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import { useSelector } from "react-redux"
import Backdrop from "../Backdrop/Backdrop"
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto"
import ProfileInfo from "../ProfileInfo/ProfileInfo"
import { MdKeyboardDoubleArrowRight } from "react-icons/md"
import { IconContext } from "react-icons"

const HeaderProfile = React.memo(({ props, refetch, owner }) => {
  const { id } = useSelector((state) => state.auth)

  const [isBackdrop, setIsBackdrop] = useState(false)
  const [isOpenJobBlock, setIsOpenJobBlock] = useState(false)

  const onInfoBlock = (e) => {
    e.stopPropagation()
    setIsOpenJobBlock(true)
  }

  return (
    <>
      {isBackdrop && props?.photos?.large && <Backdrop owner={owner} setIsBackdrop={setIsBackdrop} photo={props?.photos?.large} name={props?.fullName} refetch={refetch} />}

      <header className={s.header} onClick={() => setIsOpenJobBlock(false)}>
        <ProfilePhoto setIsBackdrop={setIsBackdrop} avatar={props?.photos?.large} name={props?.fullName} />
        <section>
          <h2>{props?.fullName}</h2>
          {owner ? <ProfileStatus id={id} /> : <p>{props?.aboutMe}</p>}

          {isOpenJobBlock ? (
            <ProfileInfo refetch={refetch} onInfoBlock={onInfoBlock} props={props} owner={owner} />
          ) : (
            <div className={s.infoBlock} onClick={onInfoBlock}>
              <p>Info...</p>
              <IconContext.Provider value={{ size: "20px", color: "#636363" }}>
                <MdKeyboardDoubleArrowRight />
              </IconContext.Provider>
            </div>
          )}
        </section>
      </header>
    </>
  )
})

export default HeaderProfile

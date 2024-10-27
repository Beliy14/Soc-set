import React, { useState, useEffect, useRef } from "react"
import s from "./headerProfile.module.css"
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import { useSelector } from "react-redux"
import Backdrop from "../Backdrop/Backdrop"
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto"
import ProfileInfo from "../ProfileInfo/ProfileInfo"
import FollowingButton from "../../../../components/FollowingButton/FollowingButton"
import { useGetFollowedUserQuery } from "../../../../store/queryApi/usersApi"

const HeaderProfile = React.memo(({ props, refetch, owner, userId }) => {
  const [isBackdrop, setIsBackdrop] = useState(false)
  const [isOpenJobBlock, setIsOpenJobBlock] = useState(false)
  const infoRef = useRef(null)

  const { id } = useSelector((state) => state.auth)
  const { isFollowingProgress } = useSelector((state) => state.users)
  const language = useSelector((state) => state.language.language)

  const { data: userFollowed, refetch: refetchFollowed } = useGetFollowedUserQuery(userId)

  useEffect(() => {
    const documentClick = (e) => {
      if (e.target !== infoRef.current) {
        setIsOpenJobBlock(false)
      }
    }

    document.addEventListener("click", documentClick)

    return () => {
      document.removeEventListener("click", documentClick)
    }
  }, [])

  const onInfoBlock = (e) => {
    e.stopPropagation()
    setIsOpenJobBlock(true)
  }

  return (
    <>
      {isBackdrop && (
        <Backdrop owner={owner} setIsBackdrop={setIsBackdrop} photo={props?.photos?.large || `https://placehold.co/200x200?text=${props?.fullName}`} name={props?.fullName} refetch={refetch} />
      )}

      <header className={s.header}>
        <div className={s.photoBlock}>
          <ProfilePhoto setIsBackdrop={setIsBackdrop} avatar={props?.photos?.large} name={props?.fullName} />
          {isOpenJobBlock && !owner && <FollowingButton isFollowingProgress={isFollowingProgress} userId={userId} userFollowed={userFollowed} inProfile={true} refetchFollowed={refetchFollowed} />}
        </div>
        <section className={s.section}>
          <h2>{props?.fullName}</h2>
          {owner ? <ProfileStatus id={id} /> : <p>{props?.aboutMe}</p>}

          {isOpenJobBlock ? (
            <ProfileInfo ref={infoRef} refetch={refetch} onInfoBlock={onInfoBlock} props={props} owner={owner} />
          ) : (
            <button className={s.moreInfoBtn} onClick={onInfoBlock}>
              {language === "en" ? "More..." : "Подробнее..."}
            </button>
          )}

          {!isOpenJobBlock && !owner && <FollowingButton isFollowingProgress={isFollowingProgress} userId={userId} userFollowed={userFollowed} inProfile={true} refetchFollowed={refetchFollowed} />}
        </section>
      </header>
    </>
  )
})

export default HeaderProfile

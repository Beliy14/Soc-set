import React, { useState } from "react"
import s from "./headerProfile.module.css"
import ProfileStatus from "../ProfileStatus/ProfileStatus"
import { useSelector } from "react-redux"
import Backdrop from "../Backdrop/Backdrop"
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto"
import ProfileInfo from "../ProfileInfo/ProfileInfo"
import { MdKeyboardDoubleArrowRight } from "react-icons/md"
import { IconContext } from "react-icons"
import FollowingButton from "../../../../components/FollowingButton/FollowingButton"
import { useGetFollowedUserQuery } from "../../../../store/queryApi/usersApi"

const HeaderProfile = React.memo(({ props, refetch, owner, userId }) => {
  const [isBackdrop, setIsBackdrop] = useState(false)
  const [isOpenJobBlock, setIsOpenJobBlock] = useState(false)

  const { id } = useSelector((state) => state.auth)
  const { isFollowingProgress } = useSelector((state) => state.users)

  const { data: userFollowed, refetch: refetchFollowed } = useGetFollowedUserQuery(userId)

  const onInfoBlock = (e) => {
    e.stopPropagation()
    setIsOpenJobBlock(true)
  }

  return (
    <>
      {isBackdrop && <Backdrop owner={owner} setIsBackdrop={setIsBackdrop} photo={props?.photos?.large || `https://placehold.co/200x200?text=${props?.fullName}`} name={props?.fullName} refetch={refetch} />}

      <header className={s.header} onClick={() => setIsOpenJobBlock(false)}>
        <div className={s.photoBlock}>
          <ProfilePhoto setIsBackdrop={setIsBackdrop} avatar={props?.photos?.large} name={props?.fullName} />
          {isOpenJobBlock && !owner && <FollowingButton isFollowingProgress={isFollowingProgress} userId={userId} userFollowed={userFollowed} inProfile={true} refetchFollowed={refetchFollowed} />}
        </div>
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

          {!isOpenJobBlock && !owner && <FollowingButton isFollowingProgress={isFollowingProgress} userId={userId} userFollowed={userFollowed} inProfile={true} refetchFollowed={refetchFollowed} />}

        </section>
      </header>
    </>
  )
})

export default HeaderProfile

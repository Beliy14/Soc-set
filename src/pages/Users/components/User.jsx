import React from "react"
import s from "../users.module.css"
import { Link } from "react-router-dom"
import { setUserProfile } from "../../../store/slices/profileSlice"
import { useDispatch, useSelector } from "react-redux"
import FollowingButton from "../../../components/FollowingButton/FollowingButton"

const User = React.memo(() => {
  const { users, isFollowingProgress } = useSelector((state) => state.users)
  const { isAuth, id } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const onUserDate = (id) => {
    dispatch(setUserProfile(id))
  }

  if (!users?.length) return <h3 className={s.noUsersFound}>No users found</h3>
  
  return users?.map((user) => (
    <Link to={`/profile/${user.id}`} onClick={() => onUserDate(user.id)} key={user.id} className={`${s.user} link`}>
      <div className={s.userInfo}>
        {user?.photos?.large ? <img src={user.photos.large} alt={user.name} className={s.photo} /> : <img src={`https://placehold.co/200x200?text=${user.name}`} className={s.photo} alt={user.name} />}
        <div>
          <h2>{user.name}</h2>
          <p>{user?.status}</p>
        </div>
      </div>
      {isAuth && (
        <div className={s.followContainer}>
          {isAuth && id !== user.id ? (
            <FollowingButton isFollowingProgress={isFollowingProgress} userId={user.id} userFollowed={user.followed} inProfile={false} />
          ) : (
            <p className={s.you}>You</p>
          )}
        </div>
      )}
    </Link>
  ))
})

export default User

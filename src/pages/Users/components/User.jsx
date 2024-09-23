import React from "react"
import s from "../users.module.css"
import { Link } from "react-router-dom"
import { setIsFollowingProgress, toggleFollowUser } from "../../../store/slices/usersSlice"
import { useFollowUserMutation, useUnFollowUserMutation } from "../../../store/queryApi/usersApi"
import { setUserProfile } from "../../../store/slices/profileSlice"
import { useDispatch, useSelector } from "react-redux"

const User = React.memo(() => {
  const { users, isFollowingProgress } = useSelector((state) => state.users)
  const { isAuth, id } = useSelector((state) => state.auth)

  const [followUser] = useFollowUserMutation()
  const [unFollowUser] = useUnFollowUserMutation()

  const dispatch = useDispatch()

  const handleFollow = async (ev, userId, followed) => {
    ev.preventDefault()
    ev.stopPropagation()

    dispatch(setIsFollowingProgress({ isFetching: true, userId }))
    try {
      if (!followed) {
        const res = await followUser(userId)
        if (res.data.resultCode === 0) {
          dispatch(toggleFollowUser(userId))
        }
      } else {
        const res = await unFollowUser(userId)
        if (res.data.resultCode === 0) {
          dispatch(toggleFollowUser(userId))
        }
      }
    } finally {
      dispatch(setIsFollowingProgress({ isFetching: false, userId }))
    }
  }

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
            <button disabled={isFollowingProgress.includes(user.id)} onClick={(ev) => handleFollow(ev, user.id, user.followed)} className={!user.followed ? s.btn : s.btnUnFollow}>
              {!user.followed ? "Follow" : "Unfollow"}
            </button>
          ) : (
            <p className={s.you}>You</p>
          )}
        </div>
      )}
    </Link>
  ))
})

export default User

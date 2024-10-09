import React from "react"
import { useDispatch } from "react-redux"
import { setIsFollowingProgress, toggleFollowUser } from "../../store/slices/usersSlice"
import { useFollowUserMutation, useUnFollowUserMutation } from "../../store/queryApi/usersApi"
import "./followingButton.css"

const FollowingButton = ({ isFollowingProgress, userId, userFollowed, inProfile, refetchFollowed }) => {
  const dispatch = useDispatch()

  const [followUser] = useFollowUserMutation()
  const [unFollowUser] = useUnFollowUserMutation()

  const handleFollow = async (ev, userId, followed) => {
    ev.preventDefault()
    ev.stopPropagation()

    dispatch(setIsFollowingProgress({ isFetching: true, userId }))
    try {
      if (!followed) {
        const res = await followUser(userId)
        if (res.data.resultCode === 0) {
          dispatch(toggleFollowUser(userId))
          refetchFollowed && refetchFollowed()
          debugger
        }
      } else {
        const res = await unFollowUser(userId)
        if (res.data.resultCode === 0) {
          dispatch(toggleFollowUser(userId))
          refetchFollowed && refetchFollowed()
        }
      }
    } finally {
      dispatch(setIsFollowingProgress({ isFetching: false, userId }))
    }
  }

  let styles

  if (!userFollowed && inProfile) {
    styles = "followingButtonInProfile"
  } else if (userFollowed && inProfile) {
    styles = "unfollowingButtonInProfile"
  } else if (!userFollowed && !inProfile) {
    styles = "followingButton"
  } else if (userFollowed && !inProfile) {
    styles = "unfollowingButton"
  } 

  return (
    <button disabled={isFollowingProgress && isFollowingProgress.includes(userId)} onClick={(ev) => handleFollow(ev, userId, userFollowed)} className={styles}>
      {!userFollowed ? "Follow" : "Unfollow"}
    </button>
  )
}

export default FollowingButton

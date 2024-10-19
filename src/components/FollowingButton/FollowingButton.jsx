import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setIsFollowingProgress, toggleFollowUser } from "../../store/slices/usersSlice"
import { useFollowUserMutation, useUnFollowUserMutation } from "../../store/queryApi/usersApi"
import "./followingButton.css"
import { setAlertVisible } from "../../store/slices/alertSlice"

const FollowingButton = ({ isFollowingProgress, userId, userFollowed, inProfile, refetchFollowed }) => {
  const dispatch = useDispatch()

  const alertVisible = useSelector((state) => state.alert.alertVisible)
  const language = useSelector((state) => state.language.language)

  const [followUser] = useFollowUserMutation()
  const [unFollowUser] = useUnFollowUserMutation()

  const responseFunc = (res) => {
    if (res?.data?.resultCode === 0) {
      dispatch(toggleFollowUser(userId))
      refetchFollowed && refetchFollowed()
    }
    if (res?.error?.status === 403 && !alertVisible) {
      dispatch(setAlertVisible(true))
    }
  }

  const handleFollow = async (ev, userId, followed) => {
    ev.preventDefault()
    ev.stopPropagation()

    dispatch(setIsFollowingProgress({ isFetching: true, userId }))
    if (!followed) {
      const res = await followUser(userId)
      responseFunc(res)
    } else {
      const res = await unFollowUser(userId)
      responseFunc(res)
    }
    dispatch(setIsFollowingProgress({ isFetching: false, userId }))
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
      {!userFollowed ? language === "en" ? "Follow" : "Подписаться" : language === "en" ? "Unfollow" : "Отписаться"}
    </button>
  )
}

export default FollowingButton

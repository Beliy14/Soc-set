import React from "react"
import s from "../chat.module.css"
import { setUserProfile } from "../../../store/slices/profileSlice"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

const Message = ({ message, avatar, name, userId }) => {
  const dispatch = useDispatch()

  const handleUser = (id) => {
    dispatch(setUserProfile(id))
  }

  return (
    <div className={s.messageContainer}>
      <Link to={`/profile/${userId}`} onClick={() => handleUser(userId)}>
        <img src={avatar || `https://placehold.co/200x200?text=${name}`} alt={name} />
      </Link>

      <div>
        <h6>
          <Link to={`/profile/${userId}`} onClick={() => handleUser(userId)}>
            {name}
          </Link>
        </h6>

        <p>{message}</p>
      </div>
    </div>
  )
}

export default Message

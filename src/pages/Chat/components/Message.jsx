import React, { useState, useEffect, useRef } from "react"
import s from "../chat.module.css"
import { setUserProfile } from "../../../store/slices/profileSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ContextMenu from "./ContextMenu/ContextMenu"

const Message = ({ message, avatar, name, userId, texteriaRef}) => {
  const dispatch = useDispatch()
  const ownerId = useSelector((state) => state.auth.id)
  const [showMenu, setShowMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const menuRef = useRef(null)

  const handleUser = (id) => {
    dispatch(setUserProfile(id))
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    const x = e.pageX
    const y = e.pageY
    setMenuPosition({ x, y })
    setShowMenu(true)
  }

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={s.messageContainer} onContextMenu={handleContextMenu}>
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

      {showMenu && (
        <div ref={menuRef}>
          <ContextMenu pageX={menuPosition.x} pageY={menuPosition.y} name={name} owner={ownerId === userId} setShowMenu={setShowMenu} texteriaRef={texteriaRef} message={message} />
        </div>
      )}
    </div>
  )
}

export default Message

import React from "react"
import s from './contextMenu.module.css'
import { useDispatch } from "react-redux"
import { changeMessage } from "../../../../store/slices/chatSlice"

const ContextMenu = ({ pageX, pageY, name, owner, setShowMenu, texteriaRef, message }) => {
  const stylesContextMenu = () => ({
    padding: '10px 15px',
    backgroundColor: '#6e7777',
    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',
    borderRadius: 5,
    position: "absolute",
    top: pageY,
    left: pageX,
  })

  const replyMessage = () => {
    dispatch(changeMessage(name + ', '))
    setShowMenu(false)
    texteriaRef.current.focus()
  }

  const copyMessageText = async () => {
    await navigator.clipboard.writeText(message.trim());
    setShowMenu(false)
  }

  const dispatch = useDispatch()

  return (
    <div style={stylesContextMenu()}>
      <h6>{name}</h6>
      {!owner && <button onClick={replyMessage} className={s.btn}>Reply</button>}
      <button onClick={copyMessageText} className={s.btn}>Copy</button>
    </div>
  )
}

export default ContextMenu
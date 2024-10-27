import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeMessage } from "../../../../store/slices/chatSlice"
import s from "./contextMenu.module.css"

const ContextMenu = ({ pageX, pageY, name, owner, setShowMenu, texteriaRef, message }) => {
  const language = useSelector((state) => state.language.language)

  const stylesContextMenu = () => ({
    padding: "10px 15px",
    backgroundColor: "#6e7777",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 5,
    position: "absolute",
    top: pageY,
    left: pageX,
    zIndex: 200,
  })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientX < pageX - 200 || e.clientX > pageX + 200 || e.clientY < pageY - 200 || e.clientY > pageY + 200) {
        setShowMenu(false)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [pageX, pageY, setShowMenu])

  const replyMessage = () => {
    dispatch(changeMessage(name + ", "))
    setShowMenu(false)
    texteriaRef.current.focus()
  }

  const copyMessageText = async () => {
    await navigator.clipboard.writeText(message.trim())
    setShowMenu(false)
  }

  const dispatch = useDispatch()

  return (
    <div style={stylesContextMenu()}>
      <h6>{name}</h6>
      {!owner && (
        <button onClick={replyMessage} className={s.btn}>
          {language === "en" ? "Reply" : "Ответить"}
        </button>
      )}
      <button onClick={copyMessageText} className={s.btn}>
        {language === "en" ? "Copy" : "Копировать"}
      </button>
    </div>
  )
}

export default ContextMenu

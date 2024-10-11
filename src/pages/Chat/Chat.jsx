import React, { useEffect, useRef, useState, useCallback } from "react"
import s from "./chat.module.css"
import Message from "./components/Message"
import Redirect from "../../hoc/Redirect"
import { VscSend } from "react-icons/vsc"
import { IconContext } from "react-icons"
import { useSelector, useDispatch } from "react-redux"
import { changeMessage } from "../../store/slices/chatSlice"
import Loader from "../../components/Loader/Loader"
import ErrorBlock from "../../components/ErrorBlock/ErrorBlock"

const Chat = () => {
  const dispatch = useDispatch()
  const { textMessage } = useSelector((state) => state.chat)

  const texteriaRef = useRef(null)
  const messagesAnchorRef = useRef(null)

  const [messages, setMessages] = useState([])
  const [readyStatus, setReadyStatus] = useState("pending")
  const [wsChat, setWsChat] = useState(null)
  const [wsError, setWsError] = useState("")
  const [isAutoScroll, setIsAutoScroll] = useState(false)

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      setIsAutoScroll(true)
    }, 200);
  
    return () => {
      clearTimeout(scrollTimeout)
    }
  }, [])

  const createWsChat = useCallback(() => {
    const newWsChat = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    setWsChat(newWsChat)

    newWsChat.onopen = () => {
      setReadyStatus("ready")
    }

    newWsChat.onmessage = (e) => {
      const newMessages = JSON.parse(e.data)
      setMessages((prevMessages) => [...prevMessages, ...newMessages])
    }

    newWsChat.onerror = () => {
      setReadyStatus("error")
      setWsError("WebSocket connection to 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx' failed. Check your internet connection.")
    }

    newWsChat.onclose = () => {
      setReadyStatus("error")

      setTimeout(() => {
        createWsChat()
      }, 3000)
    }

    return newWsChat
  }, [])

  useEffect(() => {
    const newWsChat = createWsChat()

    return () => {
      if (newWsChat) {
        newWsChat.close()
      }
    }
  }, [createWsChat])

  const sendMessage = useCallback(() => {
    if (!textMessage.trim() || !wsChat) return
    wsChat.send(textMessage.trim())
    dispatch(changeMessage(""))
  }, [textMessage, wsChat, dispatch])

  const handleTexterea = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey && readyStatus === "ready") {
        e.preventDefault()
        sendMessage()
      }
    },
    [readyStatus, sendMessage]
  )

  const scrollHandler = useCallback((e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget
    const isAtBottom = scrollHeight - scrollTop === clientHeight
    setIsAutoScroll(isAtBottom)
  }, [])

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isAutoScroll])

  return (
    <Redirect>
      <div className={s.block}>
        {readyStatus === "pending" && <Loader />}
        {readyStatus === "error" && <ErrorBlock message={wsError} />}

        <div className={s.messages} onScroll={scrollHandler}>
          {messages.map((m, index) => (
            <Message key={index} message={m.message} avatar={m?.photo} name={m.userName} userId={m.userId} texteriaRef={texteriaRef} />
          ))}
          <div ref={messagesAnchorRef} />
        </div>

        <div className={s.inputArea}>
          <textarea
            ref={texteriaRef}
            value={textMessage}
            onKeyDown={handleTexterea}
            onChange={(e) => dispatch(changeMessage(e.currentTarget.value))}
            placeholder="Enter a message..."
            aria-label="Enter a message"
            autoFocus={true}
          />
          <button disabled={readyStatus !== "ready"} onClick={sendMessage}>
            <IconContext.Provider value={{ size: "2em" }}>
              <VscSend />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    </Redirect>
  )
}

export default Chat






/* 
do:
  если пишу сообщеие я, то листать вниз

*/
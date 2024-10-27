import React, { useEffect, useRef, useState, useCallback } from "react"
import Message from "./components/Message"
import Redirect from "../../hoc/Redirect"
import { IconContext } from "react-icons"
import { VscSend } from "react-icons/vsc"
import { FaArrowDown } from "react-icons/fa6"
import { useSelector, useDispatch } from "react-redux"
import { changeMessage } from "../../store/slices/chatSlice"
import Loader from "../../components/Loader/Loader"
import ErrorBlock from "../../components/ErrorBlock/ErrorBlock"
import s from "./chat.module.css"

const Chat = React.memo(({ miniChat }) => {
  const dispatch = useDispatch()
  const { textMessage } = useSelector((state) => state.chat)
  const authId = useSelector((state) => state.auth.id)
  const language = useSelector((state) => state.language.language)

  const texteriaRef = useRef(null)
  const messagesAnchorRef = useRef(null)

  const [messages, setMessages] = useState([])
  const [readyStatus, setReadyStatus] = useState("pending")
  const [wsChat, setWsChat] = useState(null)
  const [wsError, setWsError] = useState("")
  const [isAutoScroll, setIsAutoScroll] = useState(false)
  const [newMessage, setNewMessage] = useState(null)
  const [unreadMessage, setUnreadMessage] = useState(0)

  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      setIsAutoScroll(true)
    }, 200)

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
      const _newMessages = JSON.parse(e.data)
      setMessages((prevMessages) => [...prevMessages, ..._newMessages])
      if (_newMessages.length === 1) {
        setNewMessage(_newMessages[0])
        setUnreadMessage((prev) => prev + 1)
      }
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
    texteriaRef.current.focus()
    setTimeout(() => {
      messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
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
      setNewMessage(null)
      setUnreadMessage(0)
    }
  }, [messages, isAutoScroll])

  return (
    <Redirect>
      <div className={miniChat ? `${s.block} ${s.miniBlock}` : s.block}>
        {readyStatus === "error" && wsError && (
          <div className={s.errorContainer}>
            <ErrorBlock message={wsError} />
          </div>
        )}
        {readyStatus === "pending" ? (
          <Loader />
        ) : (
          <>
            <div className={s.messages} onScroll={scrollHandler}>
              {messages.map((m, index) => (
                <Message key={index} message={m.message} avatar={m?.photo} name={m.userName} userId={m.userId} texteriaRef={texteriaRef} />
              ))}
              <div ref={messagesAnchorRef} />
            </div>

            <div
              onClick={() => setIsAutoScroll(true)}
              className={newMessage && newMessage.userId !== authId && !isAutoScroll ? `${s.arrowDownContainer} ${s.arrowDownContainerActive}` : s.arrowDownContainer}
            >
              <div className={s.arrowDownBlock}>
                <IconContext.Provider value={{ className: s.arrowDown }}>
                  <FaArrowDown />
                </IconContext.Provider>
                <div className={s.unreadMessage}>{unreadMessage > 1 && unreadMessage}</div>
              </div>
            </div>

            <div className={s.inputArea}>
              <textarea
                ref={texteriaRef}
                value={textMessage}
                onKeyDown={handleTexterea}
                onChange={(e) => dispatch(changeMessage(e.currentTarget.value))}
                placeholder={language === "en" ? "Enter a message..." : "Введите сообщение..."}
                autoFocus={true}
              />
              <button disabled={readyStatus !== "ready"} onClick={sendMessage}>
                <IconContext.Provider value={{ size: "2em" }}>
                  <VscSend />
                </IconContext.Provider>
              </button>
            </div>
          </>
        )}
      </div>
    </Redirect>
  )
})

export default Chat

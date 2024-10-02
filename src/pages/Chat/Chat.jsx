import React, { useEffect, useState } from "react"
import s from "./chat.module.css"
import Message from "./components/Message"
import Redirect from "../../hoc/Redirect"
import { VscSend } from "react-icons/vsc"
import { IconContext } from "react-icons"

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")

  const wsChat = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

  useEffect(() => {
    wsChat.onmessage = (e) => {
      const newMessages = JSON.parse(e.data)
      setMessages((prevMessages) => [...prevMessages, ...newMessages])
    }

    return () => {
      wsChat.close()
      setMessages([])
    }
  }, [])

  const sendMessage = () => {
    if (!inputMessage.trim()) return
    wsChat.send(inputMessage)
    setInputMessage("")
  }

  const handleTexterea = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <Redirect>
      <div className={s.block}>
        <div className={s.messages}>
          {messages.map((m, index) => (
            <Message key={index} message={m.message} avatar={m?.photo} name={m.userName} userId={m.userId} />
          ))}
        </div>

        <div className={s.inputArea}>
          <textarea value={inputMessage} onKeyDown={handleTexterea} onChange={(e) => setInputMessage(e.currentTarget.value)} placeholder="Enter a message..." />
          <button onClick={sendMessage}>
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

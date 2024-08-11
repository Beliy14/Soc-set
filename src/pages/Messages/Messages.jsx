import React from "react"
import s from './messages.module.css'
import MessageLink from "./components/MessageLink"
import Message from "./components/Message"

const Messages = () => {

  const $items = [
    {id: 1, name: 'Вася'},
    {id: 2, name: 'Саша'},
    {id: 3, name: 'Петя'}
  ]
  
  const $messages = [
    {id: 1, text: "Hi!"},
    {id: 2, text: "Yo!"},
    {id: 3, text: "BlablaBlabla.."},
  ]

  return (
    <div>
      <div className={s.messages}>
        <div className={s.items}>
          {$items.map(item => 
              <MessageLink key={item.id} to={`/messages/${item.id}`} name={item.name} styleClass={s} />
            )}
        </div>
        <div className={s.messageBlock}>
          {$messages.map(m => 
            <Message key={m.id} message={m.text}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages

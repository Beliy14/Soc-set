import React from "react"
import { Link, useLocation } from "react-router-dom"
import s from "../messages.module.css"

const MessageLink = ({to, name, styleClass}) => {

    const location = useLocation()

    const btnClass = location.pathname === to ? `${styleClass.dialog} ${styleClass.active}` : `${styleClass.dialog}`

  return (
    <Link className={s.link} to={to}>
      <div className={btnClass}>{name}</div>{" "}
    </Link>
  )
}

export default MessageLink

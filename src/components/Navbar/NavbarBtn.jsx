import React from "react"
import { Link, useLocation } from "react-router-dom"

const NavbarBtn = ({ to, title, styleClass, btnToSettings }) => {
  const location = useLocation()

  const btnClass = location.pathname.includes(to) ? `${styleClass.link} ${styleClass.active} ${btnToSettings && styleClass.btnToSettings}` : `${styleClass.link} ${btnToSettings && styleClass.btnToSettings}`

  return (
    <Link className={btnClass} to={to}>
      {title}
    </Link>
  )
}

export default NavbarBtn

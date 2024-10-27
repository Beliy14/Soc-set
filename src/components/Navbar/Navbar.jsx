import React from "react"
import s from "./navbar.module.css"
import NavbarBtn from "./NavbarBtn"
import { useSelector } from "react-redux"

const Navbar = () => {
  const language = useSelector((state) => state.language.language)

  return (
    <>
      <div className={s.nav}>
        <h2 className={s.title}>{language === "en" ? "Menu" : "Меню"}</h2>
        <NavbarBtn to="/profile" title={language === "en" ? "Profile" : "Профиль"} styleClass={s} />
        <NavbarBtn to="/users" title={language === "en" ? "Users" : "Пользователи"} styleClass={s} />
        <NavbarBtn to="/chat" title={language === "en" ? "Chat" : "Чат"} styleClass={s} />
      </div>
      <NavbarBtn to="/settings" title={language === "en" ? "Settings" : "Наcтройки"} styleClass={s} btnToSettings={true} />
    </>
  )
}

export default Navbar

import React from "react"
import { useSelector } from "react-redux"
import s from "./noFoundPage.module.css"

const NotFoundPage = () => {
  const language = useSelector((state) => state.language.language)

  return (
    <div className={s.block}>
      <h2 className={s.numberCode}>404</h2>
      <p className={s.title}>{language === "en" ? "The page was not found." : "Страницы не обнаружено."}</p>
    </div>
  )
}

export default NotFoundPage

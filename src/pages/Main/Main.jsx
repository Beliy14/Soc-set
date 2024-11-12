import React from "react"
import { useSelector } from "react-redux"
import s from "./main.module.css"

const Main = () => {
  const language = useSelector((state) => state.language.language)

  return (
    <div className={s.container}>
      <h1 className={s.title}>Soc Set</h1>
      <p className={s.description}>
        {language === "en"
          ? `This is a small social network that was created thanks to the course "The Way of the Samurai", which is posted on the IT-Kamasutra channel. It is developed using technologies such as React, Redux Toolkit and RTK Query.`
          : `Это небольшая социальная сеть, которая создана благодаря курсу "Путь самурая", который выложен на канале IT-Kamasutra. Разработана на таких технологиях, как React, Redux Toolkit и RTK Query.`}
      </p>
      <p className={s.description}>
        {language === "en"
          ? "If you are not registered on the site, then follow the link and register there: "
          : "Если вы не зарегистрированы на сайте, то перейдите по ссылке и зарегистрируйтесь там: "}
        <a target="_blank" rel="noreferrer" href="https://social-network.samuraijs.com/signUp">
          social-network.samuraijs.com
        </a>
      </p>
    </div>
  )
}

export default Main

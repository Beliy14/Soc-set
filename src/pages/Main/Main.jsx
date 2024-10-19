import React from "react"
import s from "./main.module.css"
import { useSelector } from "react-redux"

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
    </div>
  )
}

export default Main

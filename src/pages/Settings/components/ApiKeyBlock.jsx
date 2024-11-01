import React, { useState } from "react"
import { IoIosCheckmarkCircleOutline } from "react-icons/io"
import { IconContext } from "react-icons"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import s from "../settings.module.css"

const ApiKeyBlock = () => {
  const location = useLocation()

  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || "")
  const [isSaved, setIsSaved] = useState(false)
  const [requiredApiKey, setRequiredApiKey] = useState(location.state?.requiredApiKey)
  const [isCorrectApiKey, setIsCorrectApiKey] = useState(true)

  const language = useSelector((state) => state.language.language)

  const saveApiKey = () => {
    if (apiKey !== localStorage?.getItem("apiKey")) {
      if (apiKey?.length === 36) {
        localStorage.setItem("apiKey", apiKey)
        setIsSaved(true)
        setIsCorrectApiKey(true)
        setRequiredApiKey(false)
        setTimeout(() => {
          setIsSaved(false)
        }, 2000)
      } else {
        setIsCorrectApiKey(false)
      }
    } else {
      setIsCorrectApiKey(true)
    }
  }

  return (
    <div className={s.container}>
      <h3 className={s.title}> {language === "en" ? "API KEY" : "API-ключ"}</h3>
      {requiredApiKey && <h4 className={s.requiredApiKey}>{language === "en" ? "To continue, enter the API KEY!" : "Чтобы продолжить, введите API-ключ!"}</h4>}
      <p className={s.description}>
        {language === "en"
          ? "Enter your API KEY to unlock some functionality. You can get it on the website:"
          : "Введите свой API-ключ, чтобы разблокировать некоторые функции. Вы можете получить его на веб-сайте:"}{" "}
        <a target="_blank" rel="noreferrer" className={s.link} href="https://social-network.samuraijs.com/account">
          social-network.samuraijs.com
        </a>
      </p>
      <div className={s.inputContainer}>
        <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} type="text" className={s.input} placeholder="Enter API KEY" />
        <IconContext.Provider value={{ className: `${s.checkMark} ${isSaved ? s.active : ""}` }}>
          <IoIosCheckmarkCircleOutline />
        </IconContext.Provider>
      </div>
      {!isCorrectApiKey && <h4 className={s.requiredApiKey}>{language === "en" ? "Make sure that the key is correct!" : "Убедитесь что ключ корректный!"}</h4>}

      <p className={s.description}>{language === "en" ? "When you log out of your account, your API KEY will be reset!" : "При выходе с аккаунта ваш API-ключ будет обнулён!"}</p>

      <button onClick={saveApiKey} className={s.buttonSave}>
        {language === "en" ? "Save" : "Сохранить"}
      </button>
    </div>
  )
}

export default ApiKeyBlock

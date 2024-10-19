import React from "react"
import s from "../settings.module.css"
import { useDispatch, useSelector } from "react-redux"
import { setLanguage } from "../../../store/slices/languageSlice"

const LanguageBlock = () => {
  const language = useSelector((state) => state.language.language)
  const dispatch = useDispatch()

  const handleLanguageSelect = (language) => {
    dispatch(setLanguage(language))
    localStorage.setItem("language", language)
  }

  return (
    <div className={s.container}>
      <h3 className={s.title}>{language === "en" ? "Language" : "Язык"}</h3>

      <div className={s.languageBlock}>
        <button className={s.buttonLanguage} onClick={() => handleLanguageSelect("ru")} disabled={language === "ru"}>
          {language === "en" ? "Russian" : "Русский"}
        </button>
        <button className={s.buttonLanguage} onClick={() => handleLanguageSelect("en")} disabled={language === "en"}>
          {language === "en" ? "English" : "Английский"}
        </button>
      </div>
    </div>
  )
}

export default LanguageBlock

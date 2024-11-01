import React from "react"
import { IconContext } from "react-icons"
import { IoClose } from "react-icons/io5"
import s from "./alert.module.css"
import { useDispatch, useSelector } from "react-redux"
import { setAlertVisible } from "../../store/slices/alertSlice"
import { Link } from "react-router-dom"

const Alert = () => {
  const dispatch = useDispatch()

  const language = useSelector((state) => state.language.language)

  return (
    <div className={s.alertContainer}>
      <h3 className={s.alertTitle}>{language === "en" ? "Attention!" : "Внимание!"}</h3>
      <p className={s.alertText}>
        {language === "en" ? (
          <>
            If some functions do not work for you, go to the{" "}
            <Link className={s.link} to="/settings">
              Settings
            </Link>{" "}
            section and enter the correct <b>API KEY</b>.
          </>
        ) : (
          <>
            Если у вас не работают некоторые функции, перейдите в раздел{" "}
            <Link className={s.link} to="/settings">
              Настройки
            </Link>{" "}
            и введите правильный <b>API-ключ</b>.
          </>
        )}
      </p>
      <IconContext.Provider value={{ className: s.closeIcon }}>
        <IoClose onClick={() => dispatch(setAlertVisible(false))} />
      </IconContext.Provider>
    </div>
  )
}

export default Alert

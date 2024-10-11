import React from "react"
import { IconContext } from "react-icons"
import { IoClose } from "react-icons/io5"
import s from "./alert.module.css"
import { useDispatch } from "react-redux"
import { setAlertVisible } from "../../store/slices/alertSlice"
import { Link } from "react-router-dom"

const Alert = () => {
  const dispatch = useDispatch()

  return (
    <div className={s.alertContainer}>
      <h3 className={s.alertTitle}>Attention!</h3>
      <p className={s.alertText}>If some functions do not work for you, go to the <Link className={s.link} to='/settings'>Settings</Link> section and enter your <b>API KEY</b>.</p>
      <IconContext.Provider value={{ className: s.closeIcon }}>
        <IoClose onClick={() => dispatch(setAlertVisible(false))} />
      </IconContext.Provider>
    </div>
  )
}

export default Alert

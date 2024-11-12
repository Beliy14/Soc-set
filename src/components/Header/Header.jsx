import React, { useEffect } from "react"
import logo from "../../assets/logo.svg"
import { Link, useLocation } from "react-router-dom"
import { useAuthMeQuery, useLogOutMutation } from "../../store/queryApi/authApi"
import { useDispatch, useSelector } from "react-redux"
import { setAuthUserData } from "../../store/slices/authSlice"
import s from "./header.module.css"

const Header = () => {
  const { data, refetch } = useAuthMeQuery()
  const { isAuth, login, id } = useSelector((state) => state.auth)
  const language = useSelector((state) => state.language.language)

  const location = useLocation()
  const dispatch = useDispatch()
  const [logOut] = useLogOutMutation()

  useEffect(() => {
    refetch()
  }, [id, refetch])

  useEffect(() => {
    if (data?.resultCode === 0) {
      dispatch(setAuthUserData({ id: data.data.id, isAuth: true, email: data.data.email, login: data.data.login }))
    }
  }, [data, dispatch])

  const onLogout = async () => {
    const res = await logOut()
    if (res.data.resultCode === 0) {
      dispatch(setAuthUserData({ id: null, isAuth: false, login: null, email: null, token: null }))
    }
  }

  return (
    <>
      <Link className="link" to="/">
        <img className={s.logo} src={logo} alt="logo" />
      </Link>

      <div className={s.loginBlock}>
        {isAuth && data?.resultCode === 0 ? (
          <>
            <span>{login}</span>
            <button className={s.log} onClick={onLogout}>
              {language === "en" ? "Log out" : "Выйти"}
            </button>
          </>
        ) : (
          location.pathname !== "/login" && (
            <Link to="/login" className={s.log}>
              {language === "en" ? "Log in" : "Войти"}
            </Link>
          )
        )}
      </div>
    </>
  )
}

export default Header

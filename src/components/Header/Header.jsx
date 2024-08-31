import React, { useEffect } from "react"
import s from "./header.module.css"
import logo from "../../assets/logo.svg"
import { Link } from "react-router-dom"
import { useAuthMeQuery, useLogOutMutation } from "../../store/queryApi/authApi"
import { useDispatch, useSelector } from "react-redux"
import { setAuthUserData } from "../../store/slices/authSlice"

const Header = () => {
  const { data, refetch } = useAuthMeQuery()
  const { isAuth, login, id } = useSelector((state) => state.auth)

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
        <div className={s.container}>
          <img className={s.logo} src={logo} alt="logo" />
          <span className={s.span}>online</span>
        </div>
      </Link>

      <div className={s.loginBlock}>
        {isAuth && data?.resultCode === 0 ? (
          <>
            {login}
            <button className={s.log} onClick={onLogout}>
              Log out
            </button>
          </>
        ) : (
          <Link to="/login" className={s.log}>
            Log in
          </Link>
        )}
      </div>
    </>
  )
}

export default Header

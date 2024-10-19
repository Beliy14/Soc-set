import React, { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import loginFormSchema from "./FormValidation/loginFormSchema"
import { useLogInMutation } from "../../store/queryApi/authApi"
import { useDispatch, useSelector } from "react-redux"
import { setAuthUserData } from "../../store/slices/authSlice"
import { Navigate } from "react-router-dom"
import s from "./login.module.css"

const Login = () => {
  const dispatch = useDispatch()

  const [logIn] = useLogInMutation()
  const { isAuth } = useSelector((state) => state.auth)
  const language = useSelector((state) => state.language.language)

  const [redirect, setRedirect] = useState(false)
  const [errorEmailOrPassword, setErrorEmailOrPassword] = useState("")
  const [isCaptcha, setIsCaptcha] = useState(false)
  const [hasReloaded, setHasReloaded] = useState(false)

  useEffect(() => {
    if (isAuth) setRedirect(true)
  }, [isAuth])

  useEffect(() => {
    if (!isAuth) {
      localStorage.removeItem("apiKey")
    }
  }, [isAuth])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !hasReloaded) {
        window.location.reload()
        setHasReloaded(true)
      }
    }

    window.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [hasReloaded])

  if (redirect) {
    return <Navigate to="/profile" />
  }

  return (
    <div>
      <h1 className={s.title}>{language === "en" ? "Login" : "Вход"}</h1>
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false, captcha: "" }}
        validationSchema={loginFormSchema(isCaptcha)}
        onSubmit={async (values) => {
          const res = await logIn({ email: values.email, password: values.password, rememberMe: values.rememberMe, captcha: values.captcha })
          if (res.data.resultCode === 0) {
            dispatch(setAuthUserData({ id: res.data.data.userId, isAuth: true, token: res.data.data.token }))
            setErrorEmailOrPassword("")
          } else {
            setErrorEmailOrPassword(res.data.messages[0])
            if (res.data.resultCode === 10) {
              setIsCaptcha(true)
            }
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form className={s.container}>
              <Field className={s.input} type="text" name="email" placeholder="E-mail" />
              <ErrorMessage name="email" component="div" className={s.errorMessage} />

              <Field className={s.input} type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className={s.errorMessage} />

              <div className={s.block}>
                <Field className={s.checkbox} type="checkbox" name="rememberMe" />
                <p>{language === "en" ? "Remember me" : "Запомнить меня"}</p>
              </div>

              {errorEmailOrPassword && (
                <div className={s.block}>
                  <span className={s.errorMessage}>{errorEmailOrPassword}</span>
                </div>
              )}

              {isCaptcha && (
                <div className={s.blockCol}>
                  <p className={s.capthaMessage}>
                    If you can't log in, go to the website{" "}
                    <a target="_blank" rel="noreferrer" href="https://social-network.samuraijs.com/login">
                      social-network.samuraijs.com
                    </a>{" "}
                    and enter from there. Refresh the page after logging in.
                  </p>
                </div>
              )}

              <div className={s.block}>
                <button type="submit" className={s.button} disabled={isSubmitting}>
                  {language === "en" ? "Log in" : "Войти"}
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default Login

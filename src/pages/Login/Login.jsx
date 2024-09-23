import React, { useEffect, useState } from "react"
import s from "./login.module.css"
import { Formik, Form, Field, ErrorMessage } from "formik"
import loginFormSchema from "./FormValidation/loginFormSchema"
import { useLogInMutation } from "../../store/queryApi/authApi"
import { useDispatch, useSelector } from "react-redux"
import { setAuthUserData } from "../../store/slices/authSlice"
import { Navigate } from "react-router-dom"
// import { useGetCaptchaUrlQuery } from "../../store/queryApi/securityApi"

const Login = () => {
  const dispatch = useDispatch()

  const [logIn] = useLogInMutation()
  // const { data: captcha, refetch: refetchCaptcha } = useGetCaptchaUrlQuery()
  const { isAuth } = useSelector((state) => state.auth)

  const [redirect, setRedirect] = useState(false)
  const [errorEmailOrPassword, setErrorEmailOrPassword] = useState("")
  const [isCaptcha, setIsCaptcha] = useState(false)

  useEffect(() => {
    if (isAuth) setRedirect(true)
  }, [isAuth])

  if (redirect) {
    return <Navigate to="/profile" />
  }

  return (
    <div className={s.container}>
      <h1>Login</h1>
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
              // await refetchCaptcha()
            }
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <Field className={s.input} type="text" name="email" placeholder="E-mail" />
              <ErrorMessage name="email" component="div" className={s.errorMessage} />

              <Field className={s.input} type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className={s.errorMessage} />

              <div className={s.block}>
                <Field className={s.checkbox} type="checkbox" name="rememberMe" />
                <p>Remember me</p>
              </div>

              {errorEmailOrPassword && (
                <div className={s.block}>
                  <span className={s.errorMessage}>{errorEmailOrPassword}</span>
                </div>
              )}

              {/* {isCaptcha && captcha && (
                <div className={s.blockCol}>
                  <img className={s.captcha} src={captcha.url} alt="Captcha" />
                  <Field className={s.inputCaptcha} type="text" name="captcha" placeholder="Enter captcha" />
                  <ErrorMessage name="captcha" component="div" className={s.errorMessage} />
                </div>
              )} */}

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
                  Log in
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

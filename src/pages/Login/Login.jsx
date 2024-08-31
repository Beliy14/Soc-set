import React, { useEffect, useState } from "react"
import s from "./login.module.css"
import { Formik, Form, Field, ErrorMessage } from "formik"
import loginFormSchema from "./FormValidation/LoginFormSchema"
import { useLogInMutation } from "../../store/queryApi/authApi"
import { useDispatch, useSelector } from "react-redux"
import { setAuthUserData } from "../../store/slices/authSlice"
import { Navigate } from "react-router-dom"

const Login = () => {
  const dispatch = useDispatch()
  const [logIn] = useLogInMutation()
  const { isAuth } = useSelector((state) => state.auth)
  const [redirect, setRedirect] = useState(false)
  const [errorEmailOrPassword, setErrorEmailOrPassword] = useState("")

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
        initialValues={{ email: "", password: "", rememberMe: false }}
        validationSchema={loginFormSchema}
        onSubmit={async (values) => {
          const res = await logIn({ email: values.email, password: values.password, rememberMe: values.rememberMe })
          if (res.data.resultCode === 0) {
            dispatch(setAuthUserData({ id: res.data.data.userId, isAuth: true, token: res.data.data.token }))
            setErrorEmailOrPassword("")
          } else {
            setErrorEmailOrPassword(res.data.messages[0])
          }
        }}
      >
        {() => (
          <Form>
            <Field className={s.input} type="text" name="email" placeholder="E-mail" />
            <ErrorMessage name="email" component="div" className={s.errorMessage} />

            <Field className={s.input} type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" className={s.errorMessage} />

            {errorEmailOrPassword && (
              <div className={s.block}>
                <span className={s.errorMessage}>{errorEmailOrPassword}</span>
              </div>
            )}

            <div className={s.block}>
              <Field className={s.checkbox} type="checkbox" name="rememberMe" />
              <p>Remember me</p>
            </div>

            <div className={s.block}>
              <button type="submit" className={s.button}>
                Log in
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login

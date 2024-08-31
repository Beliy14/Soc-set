import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { useAuthMeQuery } from "../store/queryApi/authApi"

const Redirect = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth)
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const { data } = useAuthMeQuery()

  useEffect(() => {
    if (!isAuth && (data?.resultCode === 0 || data?.messages[0])) {
      setShouldRedirect(true)
    }
  }, [isAuth, data])

  if (!isAuth && shouldRedirect) {
    return <Navigate to="/login" replace={true} />
  } else if (isAuth || data?.resultCode !== 0) {
    return children
  }
}

export default Redirect

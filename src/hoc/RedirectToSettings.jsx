import React from "react"
import { Navigate } from "react-router-dom"

const RedirectToSettings = ({ children }) => {
  if (localStorage.getItem("apiKey")?.length !== 36) {
    return <Navigate to="/settings" replace={true} state={{ requiredApiKey: true }} />
  } else {
    return children
  }
}

export default RedirectToSettings

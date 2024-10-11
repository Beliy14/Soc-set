import React from "react"
import ApiKeyBlock from "./components/ApiKeyBlock/ApiKeyBlock"
import Redirect from "../../hoc/Redirect"

const Settings = () => {
  return (
    <Redirect>
      <ApiKeyBlock />
    </Redirect>
  )
}

export default Settings

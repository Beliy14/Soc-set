import React from "react"
import LanguageBlock from "./components/LanguageBlock"
import ApiKeyBlock from "./components/ApiKeyBlock"
import Redirect from "../../hoc/Redirect"

const Settings = () => {
  return (
    <Redirect>
      <ApiKeyBlock />
      <LanguageBlock />
    </Redirect>
  )
}

export default Settings

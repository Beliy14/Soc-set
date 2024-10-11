import React, { useState } from "react"
import s from "./apiKeyBlock.module.css"

const ApiKeyBlock = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey"))

  const saveApiKey = () => {
    if (apiKey) {
      localStorage.setItem("apiKey", apiKey)
    }
  }

  return (
    <div className={s.container}>
      <h3 className={s.title}>API KEY</h3>
      <p className={s.description}>
        Enter your API KEY to unlock some functionality. You can get it on the website: {" "}
        <a target="_blank" rel="noreferrer" className={s.link} href="https://social-network.samuraijs.com/account">
          social-network.samuraijs.com
        </a>
      </p>
      <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} type="text" className={s.input} placeholder="Enter API KEY" />
      <button onClick={saveApiKey} className={s.button}>
        Save
      </button>
    </div>
  )
}

export default ApiKeyBlock

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/store"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <HashRouter basename="/Beliy14/Soc-set">
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
)

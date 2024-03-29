import { OpenAPI } from "@awex-api"
import * as React from "react"
import ReactDOM from "react-dom/client"
import { HelmetProvider } from "react-helmet-async"
import reportWebVitals from "./reportWebVitals"
import { App } from "./app"
import store from "./store"
import { Provider } from "react-redux"
import "./scss/style.scss"
import "./scss/custom.sass"
import { getUser } from "./services/user.service"


const user = getUser()
if (user) {
  OpenAPI.TOKEN = user.token
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)

root.render(
  <HelmetProvider>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </HelmetProvider>
)

reportWebVitals()
import React from "react"
import { createRoot, Root } from "react-dom/client"
import { store } from "./redux/store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import App from "./App"

const container = document.getElementById("root")

if (container) {
    const root = createRoot(container)

    root.render(
        // <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
        // </React.StrictMode>
    )
}

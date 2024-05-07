import App from "./app.jsx"
import React from "./react"
import "./global.css"

function render(app) {
  let root = document.querySelector("#root")
  app = app.render()

  root.appendChild(app)
}


window.onload = function () {
  render(<App />)
}

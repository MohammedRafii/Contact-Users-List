import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import axios from "axios";
import App from "./App";

axios.defaults.baseURL = 'https://nodejs-contactusers-api.onrender.com/api/v1'

export const Context = createContext()

const AppWrapper = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState([])
  const [totalContacts, setTotalContacts] = useState(0)
  window.addEventListener('contextmenu',(e)=>e.preventDefault())
  return (
    <Context.Provider value={{totalContacts,setTotalContacts, isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser }}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
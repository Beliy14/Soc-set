import { Route, Routes, useLocation } from "react-router-dom"
import Profile from "./pages/Profile/Profile"
import Navbar from "./components/Navbar/Navbar"
import Header from "./components/Header/Header"
import Settings from "./pages/Settings/Settings"
import Main from "./pages/Main/Main"
import Users from "./pages/Users/Users"
import Login from "./pages/Login/Login"
import Chat from "./pages/Chat/Chat"
import NotFoundPage from "./pages/NoFoundPage/NoFoundPage"
import { useSelector } from "react-redux"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { HiMenu } from "react-icons/hi"
import { IconContext } from "react-icons"
import { useState } from "react"
import "./App.css"

function App() {
  const [isOpenChat, setIsOpenChat] = useState(false)
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const { isAuth } = useSelector((state) => state.auth)
  const language = useSelector((state) => state.language.language)
  const location = useLocation()

  return (
    <div className="app">
      <div className="app-wrapper">
        <header className="header">
          <Header />
          <IconContext.Provider value={{ className: "btnMenu" }}>
            <HiMenu onClick={() => setIsOpenMenu(true)} />
          </IconContext.Provider>
        </header>

        <nav className="nav">
          <Navbar />
        </nav>

        <div className={isOpenMenu ? "mini-nav active" : "mini-nav"} onClick={() => setIsOpenMenu(false)}>
          <Navbar />
          <div className={isOpenMenu ? "blur active" : "blur"} />
        </div>

        <main className="main">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/chat" element={<Chat miniChat={false} />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {isAuth && location.pathname !== "/chat" && (
            <div className={isOpenChat ? "chatBlock" : "chatBlock chatBlockClose"}>
              <div className="headerChatBlock" onClick={() => setIsOpenChat(!isOpenChat)}>
                <IconContext.Provider value={{ className: "toggleChatBlock" }}>{isOpenChat ? <IoIosArrowDown /> : <IoIosArrowUp />}</IconContext.Provider>
                <h3 onClick={(e) => e.stopPropagation()}>{language === "en" ? "Chat" : "Чат"}</h3>
              </div>

              {isOpenChat && <Chat miniChat={true} />}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App

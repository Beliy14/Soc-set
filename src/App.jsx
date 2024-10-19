import { Route, Routes } from "react-router-dom"
import "./App.css"
import Profile from "./pages/Profile/Profile"
import Navbar from "./components/Navbar/Navbar"
import Header from "./components/Header/Header"
import Settings from "./pages/Settings/Settings"
import Main from "./pages/Main/Main"
import Users from "./pages/Users/Users"
import Login from "./pages/Login/Login"
import Chat from "./pages/Chat/Chat"
import NotFoundPage from "./pages/NoFoundPage/NoFoundPage"

function App() {
  return (
    <div className="app">
      <div className="app-wrapper">
        <header className="header">
          <Header />
        </header>

        <nav className="nav">
          <Navbar />
        </nav>

        <main className="main">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App

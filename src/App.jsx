import { Route, Routes } from "react-router-dom"
import "./App.css"
import Profile from "./pages/Profile/Profile"
import Navbar from "./components/Navbar/Navbar"
import Music from "./pages/Music/Music"
import News from "./pages/News/News"
import Header from "./components/Header/Header"
import Settings from "./pages/Settings/Settings"
import Main from "./pages/Main/Main"
import Users from "./pages/Users/Users"
import Login from "./pages/Login/Login"
import Chat from "./pages/Chat/Chat"

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
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App

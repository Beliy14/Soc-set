import { Route, Routes } from "react-router-dom"
import "./App.css"
import Profile from "./pages/Profile/Profile"
import Navbar from "./components/Navbar/Navbar"
import Messages from "./pages/Messages/Messages"
import Music from "./pages/Music/Music"
import News from "./pages/News/News"
import Header from "./components/Header/Header"
import Settings from "./pages/Settings/Settings"
import Main from "./pages/Main/Main"



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
            <Route path="/profile" element={<Profile />} />
            <Route path="/messages/*" element={<Messages/>} />
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

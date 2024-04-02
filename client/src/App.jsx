import { useState, useEffect } from "react";
import "./App.css"
import NavUser from "./components/navUser/NavUser"
import Menu from "./components/menu/Menu"
import MenuProfe from "./components/menuProfe/MenuProfe"
import { validateLogin } from "./functions";
import { socketInit } from "./socket"

const App = () => {

  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [user, setUser] = useState({
    userName: "",
    password: 0
  })
  const rol = validateLogin(user.userName, user.password)
  const socket = socketInit

  useEffect(() => {
    socket?.emit("newUser", user.userName, rol)
  }, [socket, user.userName, rol])

  return (
    <main>
      {rol === "Teacher" ? (
        <>
          <NavUser user={user.userName} rol={rol} />
          <MenuProfe user={user.userName} rol={rol} />
        </>
      ) : rol === "Student" ? (
        <>
          <NavUser user={user.userName} rol={rol} />
          <Menu user={user.userName} rol={rol} />
        </>
      ) : (
        <div className="container">
          <div className="login">
            <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => setUser({ ...user, userName: username, password: parseInt(password) })}>Login</button>
          </div>
        </div>
      )}
    </main>
  )
}

export default App;

/*
*/
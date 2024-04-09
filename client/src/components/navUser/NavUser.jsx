import { useState, useEffect } from "react"
import "./navUser.css"
import Notification from "../../img/notification.jpg"
import { deleteNoti, getIdNoti, senderUser, receiveNotis, receiveNewNoti } from '../../socket'

const NavUser = ({ user, rol }) => {

    const [open, setOpen] = useState(false)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        receiveNewNoti(noti=>{
            notifications.push(noti)
        })

        senderUser(user, rol)
        // Función para cargar datos desde el servidor
        receiveNotis(data => {
            setNotifications(data)
        })
    }, [user, rol, notifications]) // Ejecutar solo una vez al montar el componente

    console.log(notifications)

    const displayNotifications = ({ senderName, text }) => {
        return (
            <span className="notification">{`${senderName} ${text}`}</span>
        )
    }

    const handleRead = () => {
        notifications.forEach((n,) => {
            deleteNoti(getIdNoti(n))
        })
        setNotifications([])
        setOpen(false)
    }

    return (
        <div className="username">
            <div className="barra">
                <div className="icon" onClick={() => setOpen(!open)}>
                    <img src={Notification} className="icoImg" alt="" />
                    {notifications.length > 0 &&
                        <div className="counter">{notifications.length}</div>
                    }
                </div>
                <div>
                    El usurario es: {user}
                </div>
            </div>
            {open && (
                <div className="notifications">
                    {notifications.map((n, index) => (
                        <div className="notification" key={index}>{displayNotifications(n)}</div>
                    ))}
                    <button className="nButton" onClick={handleRead}>Mark as read</button>
                </div>
            )}
        </div>
    )
}

export default NavUser
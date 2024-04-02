import { useState, useEffect } from "react"
import "./navUser.css"
import Notification from "../../img/notification.jpg"
import { deleteNoti, getIdNoti, loadNotis } from '../../socket'
import { filNotis } from "../../functions"

const NavUser = ({ user, rol }) => {

    const [open, setOpen] = useState(false)
    const [notifications, setNotifications] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        // Función para cargar datos desde el servidor
        loadNotis(data => {
            setData(data)
        })
    }, []) // Ejecutar solo una vez al montar el componente

    useEffect(() => {
        setNotifications(filNotis(data, user, rol));
    }, [data, user, rol]); // Dependencia vacía para ejecutar el efecto solo una vez al montar

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
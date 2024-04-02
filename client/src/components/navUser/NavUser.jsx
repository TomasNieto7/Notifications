import { useState, useEffect } from "react"
import "./navUser.css"
import Notification from "../../img/notification.jpg"
import { deleteNoti, getIdNoti } from '../../socket'
import { filNotis } from "../../functions"

const NavUser = ({ user, data, rol }) => {

    const [open, setOpen] = useState(false)
    const [notifications, setNotifications] = useState([]);
    const [notisSF, setNotiSF] = useState([])

    useEffect(() => {
        setNotifications(filNotis(notisSF, user, rol));
    }, [notisSF, user, rol]); // Dependencia vacía para ejecutar el efecto solo una vez al montar

    useEffect(()=>{
        setNotiSF(data)
    }, [data])
    console.log(notifications);
    console.log(notisSF);
    console.log(data);

    const displayNotifications = ({ senderName, text }) => {
        return (
            <span className="notification">{`${senderName} ${text}`}</span>
        )
    }

    const handleRead = () => {
        notifications.forEach((n,) => {
            deleteNoti(getIdNoti(n))
        })
        setNotiSF([])
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
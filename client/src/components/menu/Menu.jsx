import { useState } from "react"
import "./menu.css"
import { saveNoti, getNoti, getIdNoti, deleteNoti } from "../../socket"


const Menu = ({ user, rol, data }) => {
    const [marcar, setMarcar] = useState(false)

    const handleMarcar = () => {
        setMarcar(!marcar)
        saveNoti(user, rol, 'Juan', 'Teacher', 'termino')
    }
    const handleCancelar = () => {
        setMarcar(!marcar)
        const noti = getNoti(data,user,rol,'Juan')
        noti && 
        deleteNoti(getIdNoti(getNoti(data,user,rol,'Juan')))
    }

    return (
        <div className="menuCal">
            <div className="curso">
                <h2>Curso 1</h2>
                <h3>Juan</h3>
            </div>
            <div className="interMenu">
                {marcar ? (
                    <button className="termiMenu" onClick={handleCancelar}>Cancelar</button>
                )
                    : (
                        <button className="termiMenu" onClick={handleMarcar}>Marcar como completado</button>
                    )}
            </div>
        </div>
    )
}

export default Menu
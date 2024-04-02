import { useState } from "react"
import "./card.css"
import { saveNoti, getNoti, getIdNoti, deleteNoti } from "../../socket"

const Card = ({ username, user, rol, data }) => {

    const [grade, setGrade] = useState("")
    const [cal, setCal] = useState(-1)
    const handleGrade = (grade) => {
        const parsedGrade = parseInt(grade);
        if (!isNaN(parsedGrade)) {
            setCal(parsedGrade)
            saveNoti(user, rol, username, 'Student', 'te califico')
        }
    }

    const reload = () => {
        setCal(-1)
        const noti = getNoti(data, user, rol, username)
        noti &&
            deleteNoti(getIdNoti(getNoti(data, user, rol, username)))
    }


    return (
        <div className="inter">
            <div className="Alumno">
                <h2>{username}</h2>
            </div>
            {cal !== -1 ? (
                <>
                    <div className="cal">{cal}</div>
                    <button className="termi" onClick={reload}>Cancelar</button>
                </>
            ) : (
                <>

                    <input type="number" className="calific" placeholder="Calificacion" onChange={(e) => setGrade(e.target.value)} />
                    <button className="termi" onClick={() => handleGrade(grade)}>Enviar</button>
                </>
            )
            }

        </div >
    )
}

export default Card
import "./menuProfe.css"
import Card from "../cards/Card"
import users from "../../data"

const MenuProfe = ({user, rol, data}) => {

    const participantes = (users, cursoSearch) => {
        return users.filter((user) => user.rol === "Student" && user.cursos.find((curso) => curso === cursoSearch))
    }

    return (
        <div className="menuCal">
            <div className="curso">
                <h2>Curso 1</h2>
                <h3>Juan</h3>
            </div>
            <>
            {participantes(users, "Curso1").map(user_ => (
                    <Card key={user_.userName} username={user_.userName} user={user} rol={rol} data={data} />
                ))}
            </>
        </div>
    )
}

export default MenuProfe
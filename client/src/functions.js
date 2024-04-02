import users from "./data"

export const validateLogin = (name, password) => {
    const usuarioEncontrado = users.find(usuario => usuario.userName === name && usuario.password === password);
    return usuarioEncontrado ? usuarioEncontrado.rol : null;
}

export const renderNotis = notis => {
    return notis
}

export const filNotis = (data, user, rol) => {
    return data.filter(noti => noti.receiverName === user && noti.receiverRol === rol )
}

export const reloadData = (data, newdata) => {
    data.push(newdata)
}

export const deleteVoid = (data) =>{
    data.filter(noti=>Object.keys(noti).length !== 0)
}
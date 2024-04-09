export let onlineUsers = []

export const addNewUser = (username, rol, socketId) => {
    !onlineUsers.some((user) => user.username === username && user.rol === rol) &&
        onlineUsers.push({
            username,
            rol,
            socketId
        })
}

export const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socketId)
}

export const getUser = (username, rol) => {
    return onlineUsers.find(user => user.username === username && user.rol === rol)
} //No esta en funcionamiento pero la deje por si sirve a futuro
import {
    io
} from "socket.io-client";
import {
    feathers
} from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'

export const socketInit = io('http://localhost:5000')
const app = feathers()

// Set up Socket.io client with the socket
app.configure(socketio(socketInit))

export const loadNotis = (callback) => {
    socketInit.on('server:loadnotis', callback)
}


export const saveNoti = (senderName, senderRol, receiverName, receiverRol, text) => {
    socketInit.emit("client:newNotification", {
        senderName,
        senderRol,
        receiverName,
        receiverRol,
        text
    })
}

export const deleteNoti = (id) => {
    return socketInit.emit("client:deletenoti", id);
}

export const getNoti = (data, userS, rol, userR) => {
    return data.find(noti => noti.senderName === userS && noti.senderRol === rol && noti.receiverName === userR)
}

export const getIdNoti = (data) => {
    return data._id
}

export const onNewNoti = (callback) => {
    socketInit.on("server:newNoti", callback)
}

export const senderUser = (user, rol) => {
    socketInit.emit('client:senderUser', {user, rol})
}

export const receiveNotis = (callback) => {
    socketInit.on('server:sendNotifications', callback)
}

export const receiveNewNoti = (callback) => {
    socketInit.on('server:newNotification', callback)
}
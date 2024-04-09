import {
  feathers
} from '@feathersjs/feathers'
import express from '@feathersjs/express'
import socketio from '@feathersjs/socketio';
import {
  connectDB
} from './db.js';
import Noti from './models/Noti.js'
import {
  addNewUser,
  removeUser,
  getUser
} from './functions.js';

connectDB()

const app = express(feathers())
const port = 5000;

// Maneja las conexiones de Socket.io
app.configure(

  socketio({
      cors: {
        origin: 'http://localhost:3000',
      }
    },
    (io) => {
      io.on("connection", (socket) => {

        const emitNotes = async () => {
          const notis = await Noti.find();
          io.emit("server:loadnotis", notis);
        }
        emitNotes()

        socket.on("newUser", (username, rol) => {
          addNewUser(username, rol, socket.id)
        })

        socket.on('client:newNotification', async data => {
          const newNoti = new Noti(data)
          const noti = await newNoti.save()
          socket.emit('server:newNotification', noti)
        })

        socket.on('client:deletenoti', async id => {
          await Noti.findByIdAndDelete(id)
          emitNotes()
        })

        socket.on('client:senderUser', async (data) => {
          const notis = await Noti.find();
          const notisUser = notis.filter(noti => noti.receiverName === data.user && noti.receiverRol === data.rol)
          socket.emit('server:sendNotifications', notisUser)
        })

        socket.on("disconnect", () => {
          removeUser(socket.id)
        })

      })
    }
  )

)

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
})

/*
 * socket.on("sendNotification", ({ senderName, receiverName, receiverRol, text }) => {
          const receiver = getUser(receiverName, receiverRol);
          if (receiver && receiver.socketId) {
            io.to(receiver.socketId).emit("getNotification", {
              senderName,
              text
            });
          } else {
            console.error("Receiver or receiver.socketId is undefined.");
          }
        })
 * 
*/
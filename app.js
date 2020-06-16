//Require the express moule
const express = require('express');
const cors = require('cors')
const config = require('config')
const connect = require('./dbconnection');
const Chat = require('./models/ChatSchema');
const bodyParser = require("body-parser");
const chatRoute = require('./routes/chat');
const app = express()


require('./prod')(app)

//bodyparser middleware
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET', 'PUT', 'POST', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/chats', chatRoute)



//require the http module
const http = require('http').Server(app)

// require the socket.io module
const io = require('socket.io');


const socket = io(http);
//create an event listener

//To listen to messages
socket.on("connection", socket => {
    console.log("user connected");
    socket.on("disconnect", function () {
        console.log("user disconnected");
    });
    socket.on("typing", data => {
        socket.broadcast.emit("notifyTyping", { 
            user: data.user,
            message: data.message
         });
    });
    //when soemone stops typing
    socket.on("stopTyping", () => { 
        socket.broadcast.emit("notifyStopTyping"); 
    });

    socket.on("chat message", function (msg) {
        console.log("message: " + msg);
        //broadcast message to everyone in port:5000 except yourself.
        socket.broadcast.emit("received", { message: msg });

        //save chat to the database
        connect.then(db => {
            console.log("connected correctly to the server");

            let chatMessage = new Chat({
                message: msg,
                sender: "Anonymous"
            });

            chatMessage.save();
        });
    });
    
});




//wire up the server to listen to our port 500
const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log(`connected to port:${port}`)
});

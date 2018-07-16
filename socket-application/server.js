const http = require('http');
const express = require('express');
const app = express();
const socketServer = http.Server(app);
const socket = require('socket.io');
const io = socket(socketServer);
const PORT = process.env.PORT || 8080;

var messages = [];
var connectedusers = [];
app.use('/', express.static('public'));

io.on('connection', function(sk){
    console.log("connection_established");
    sk.on('online_users',function(data){
        connectedusers.push(data)
        console.log(data);
        io.emit('users',data)
    })
   // console.log(connectedusers);
    sk.emit('onli',connectedusers)


    sk.on('message', function(data){
   // var input=data.input;
   // console.log(input);
    //var user=data.user;
    //console.log(user);
     //connectedusers=data.user;
     //console.log(connectedusers);
      
     messages.push(data);
     console.log(data);
     io.emit('show', data)
     
    })
 
    sk.emit('ms', messages)
    
 
   
    sk.on('disconnect',function(){
        console.log("user disconnected");
    }) 
    })
  
  



socketServer.listen(PORT, function(){
    console.log("Server is listening on port "+ PORT);

});
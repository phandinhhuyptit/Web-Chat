const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/key').mongoURI;
const port = process.env.PORT || 5000;
const {addUser, removeUser,isUser }  = require('./factories/user');
const items = require('./routes/api/items');
const auth = require('./routes/api/auth');
const path = require('path');



let connectedUsers = {}; 
let usersOnline = [];



io.on('connection', function(socket){
    console.log(socket.id + ': connected');
    socket.emit('id', socket.id); 

    socket.on("USER_CONNECTED",(user)=>{
      usersOnline.push(user.name);
      console.log(usersOnline);
      socket.userName = user.name;
      io.sockets.emit("updateUesrList",usersOnline);
    })
  
    socket.on('disconnect', function(){
      if(!socket.userName) return;
      usersOnline.splice(usersOnline.indexOf(socket.userName),1);
      console.log(socket.id + ': disconnected')
    })
  
    socket.on('newMessage', data => {
      io.sockets.emit('newMessage', {data: data, id: socket.id});
      
      console.log(data);
    })
  
  });

app.use((req,res,next)=>{

    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,x-auth-token");
    next();
    
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/items', items);
app.use('/api/auth',auth);
mongoose.connect(db,{ useNewUrlParser: true })
.then(result =>{

    console.log('MongoDB connected.....');


})
.catch(err =>{

    // res.status(500).json(err)
    console.log(err);

})
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'../Client/build/index.html'));
// });


server.listen(port, () => console.log('Server running in port ' + port));

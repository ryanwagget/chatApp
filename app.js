const express = require('express');
const app = express();
const io = require('socket.io')(); //activate chat plugin

//serve up static files
app.use(express.static('public'));

//add routes
app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/portfolio'));

const server = app.listen(3000, () => {
  console.log('listening to port 3000');
});

io.attach(server);

io.on('connection', socket => { //shorthand of function(socket) {...}
  console.log('A user has connected');
  io.emit('chat message', { for : 'everyone', message : `${socket.id} is here`});

  socket.on('disconnect', () => {
    console.log('A user disconnected');

    io.emit('disconnect message', `${socket.id} has left the building!`);
  });
});

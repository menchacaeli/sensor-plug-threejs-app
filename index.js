var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, '/node_modules')));
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('orientation', function(data){
        socket.emit('orientation', data);
    });

    socket.on('geolocation', function(data){
        socket.emit('geolocation', data);
    });

    socket.on('acceleration', function(data){
        socket.emit('acceleration', data);
    });
});
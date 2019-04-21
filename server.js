var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var playerHandler = require('./handler/playerHandler.js');
var bulletHandler = require('./handler/bulletHandler.js');
var asteroidHandler = require('./handler/asteroidHandler.js');
var scoreHandler = require('./handler/scoreHandler.js');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

asteroidHandler.initAsteroid(io);

io.on('connection', function (socket) {
  console.log('a user connected: ', socket.id);
  playerHandler.createClient(io,socket);
  bulletHandler.createClient(io,socket);
  asteroidHandler.createClient(io,socket);
  scoreHandler.createClient(io,socket);

});

server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});

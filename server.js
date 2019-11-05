let blobs = [];


function Blob(id, x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.id = id;
}


var express = require('express');
var app = express();

var server = app.listen(3000);
app.use(express.static("public"));

var socket = require("socket.io");
var io = socket(server);

setInterval(heartbeat, 60);

function heartbeat() {
  io.sockets.emit("heartbeat", blobs);
}


io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log(socket.id);
  socket.on("position", positionMsg);
  socket.on("update", updateMsg);

  function updateMsg(data) {
    var blob;
    for (let i = 0; i < blobs.length; i++) {
      if (socket.id == blobs[i].id) {
        blob = blobs[i];
      }
    }
    blob.x = data.x;
    blob.y = data.y;
    blob.r = data.r;
  }

  function positionMsg(data) {
    blobs.push(new Blob(socket.id, 0, 0, data.r));
    //socket.broadcast.emit("position", data);
    //  console.log(data);
  }
}
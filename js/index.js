
// Load Config File
var config = require('./config.json');

// Load libraries; instantiate express app and socket.io
var tmi = require('tmi.js');
var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http').Server(app);

// Set up options for connection to twitch chat
// Add channels in the config.json file
var tmi_options = {
  options: {
    debug: true
  },
  connection: {
    cluster: "aws",
    reconnect: true
  },
  identity: config.twitch_identity,
  channels: config.twitch_channels
};

// Connect to twitch
var client = new tmi.client(tmi_options);
client.connect();



// When a chat message comes in, write it to a file
client.on('chat', function(channel, user, message, self) {
  var date = new Date();
  log_line = date + " " + channel + " " + user.username + " " + message
  fs.appendFile('twitch_chat_log_' + channel + '.txt', log_line + "\n", function (err) {
    if (err) throw err;
  });
});

app.get('/', function(req, res){
  res.send("Hello World");
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


// Load Config File
var config = require('./config.json');

// Load libraries; instantiate express app and socket.io
var tmi = require('tmi.js');
var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http').Server(app);


var word_count = {};
var user_vote = {};

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

// When a chat message comes in, record the vote
client.on('chat', function(channel, user, message, self) {

  first_word = message.split(' ')[0];

  if (!config.words.includes(first_word)) return;

  if (config.allow_multivoting) {
    add_vote(first_word);
    return;
  }

  if (user_vote[user] == undefined){
    //add user and vote to var and vote
    user_vote[user] = first_word;
    add_vote(first_word);
  } else {
    //change vote
    sub_vote(user_vote[user]);
    user_vote[user] = first_word;
    add_vote(first_word);
  }

});

function top_vote_str(){
    const word = "";
    const max = 0;
	Object.keys(word_count).forEach(function(key){ 
		if (word_count[key] > max) { 
			max = word_count[key];
			word = key;
		};
	});
    return word;
}


function add_vote(word){
  // Add a vote to `word`
  if (word_count[word] == undefined) {
    word_count[word] = 1;
  } else {
    word_count[word] += 1;
  }
}

function sub_vote(word){
  // Subtract a vote from `word`
  word_count[word] -= 1;
  if (word_count[word] <= 0){
    delete word_count[word];
  }
}

function update() {
  // Reset word count and user vote objects whenever called
  word_count = {};
  user_vote = {};

}


app.use('*', function(req, res, next) {
  //deal with content security policy
  //normally unsafe, but running localy, so the only person that can 'inject' xss is the local user... so,whatever.
  res.header("Access-Control-Allow-Origin", "'*'");
  res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval'");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.send("Hello World");
});

app.get('/words', function(req, res){
  res.json(word_count);
});

app.get('/api/v1/camera', function(req, res){
  res.send(top_vote_str());
});

app.get('/web_words', function(req, res){
  res.sendFile(__dirname + '/web_words.html');
});

app.get('/config/theme', function (req, res) {
  res.send(config.html_theme);
});

app.delete('/reinitialize', function(req, res){
  update();
  res.sendStatus(200)
});


var mod = {};

mod['add_vote'] = add_vote;
mod['sub_vote'] = sub_vote;
mod['word_count'] = word_count;
mod['user_vote'] = user_vote;
mod['update'] = update;
mod['app'] = app;

module.exports = mod;

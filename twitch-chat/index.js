// Load Config File
var config = require('./config.json');

// Load libraries; instantiate express app and socket.io
var tmi = require('tmi.js');
var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http').Server(app);

// Setup Variables
var word_count = {};
var user_vote = {};
var word_count_time = new Date();
//t.setSeconds(t.getSeconds() + 10);

var update_period = 5; //sec

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

setInterval(update, (uppdate_period * 1000));

// Connect to twitch
var client = new tmi.client(tmi_options);
client.connect();

// When a chat message comes in, chop it up and vote
client.on('chat', function(channel, user, message, self) {

    var date = new Date();
    first_word = message.split(' ')[0];

    if (config.words.includes(first_word)) {
        if (!config.allow_multivoting) {
            if (user_vote[user] == undefined) {
                //add user and vote to var and vote
                user_vote[user] = first_word;
                add_vote(first_word);
            } else {
                //change existing vote
                sub_vote(user_vote[user]);
                user_vote[user] = first_word;
                add_vote(first_word);
            }
        } else {
            add_vote(first_word);
        }
    }
});

function add_vote(word) {
    // Add a vote to `word`
    if (word_count[word] == undefined) {
        word_count[word] = 1;
    } else {
        word_count[word] += 1;
    }
}

function sub_vote(word) {
    // Subtract a vote from `word`
    word_count[word] -= 1;
    if (word_count[word] <= 0) {
        delete word_count[word];
    }
}

function update() {
    //updates some variables that need to be updated
    // Reset word count and user vote objects every 'period' seconds
    current_time = new Date();
    if (current_time - word_count_time > (config.period * 1000)) {
        word_count = {};
        user_vote = {};
        word_count_time = new Date();
    }

}

app.get('/', function(req, res) {
    res.send("Hello World");
});

app.get('/words', function(req, res) {
    res.json(word_count);
});

app.get('/web_words', function(req, res) {
    res.sendFile(__dirname + '/web_words.html');
});


http.listen(3000, function() {
    console.log('listening on *:3000');
});
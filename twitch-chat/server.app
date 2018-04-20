
const twitch_votes = require('./index');
var app = twitch_votes['app']

app.listen(3000, function(){
  console.log('listening on *:3000');
});

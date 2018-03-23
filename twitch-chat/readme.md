This is the daemon that connects to twitch chat.
It exports the 'selected weapon' over http and the python code calls into it.



Endpoints:
----------

/words

Provides sorted json list of words and votes for that word.

/web_words

Provides formatted html for key value pairs. Good for showing to a stream.


Parameters:
-----------

config.json:

* twitch_identity:
	* username: Your Twitch.tv username.
	* password: The oauth key associated with your account. A key can be generated at <https://twitchapps.com/tmi/>.

* twitch_channels: The channels this app will connect to and read the messages of. Typically your Twitch.tv username.

* period: Refers to how many seconds between reseting the votes.

* allow_multivoting: When false, a user will only get one vote, but is able to change vote by voting agian. Otherwise, users can vote more than once.

* words: The words the first word of a message is checked against to count as a vote.


This is the daemon that connects to twitch chat.
It exports the 'selected weapon' over http and the python code calls into it.



Endpoints:

/words

Provides sorted json list of words and votes for that word.


Parameters: 

See config.json. Period refers to how many seconds between reseting the counters.

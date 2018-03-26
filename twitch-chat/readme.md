Twitch Chat
-----------

This is the daemon that connects to twitch chat.
It exports the 'selected weapon' over http and the python code calls into it.


Endpoints:
----------

/words

Provides sorted json list of words and votes for that word.

/web_words

Provides formatted html for key value pairs. Good for showing to a stream.

/config.json

Provides a live view for the config file that you have made. (don't show this on stream, it contains your oauth key)


Parameters:
-----------

config.json:

* twitch_identity:
	* username: Your Twitch.tv username.
	* password: The oauth key associated with your account. A key can be generated at <https://twitchapps.com/tmi/>.

* twitch_channels: The channels this app will connect to and read the messages of. Typically your Twitch.tv username.

* html_theme: allows for the changing of themes. (more below)

* period: Refers to how many seconds between reseting the votes.

* allow_multivoting: When false, a user will only get one vote, but is able to change vote by voting agian. Otherwise, users can vote more than once.

* words: The words the first word of a message is checked against to count as a vote.


Themes:
-------

There are themes that can be changed by the config and allow for customization of the /web_words page.
Please note that some of the themes have a config file that can be changed.
The code for the themes is located at /static/themes
Be sure to make your own theme. To use it, just put the name of the folder as the "html_theme" in config.json

* default: No extra frills, this is the bare html and defualt fonts.

* basic: A minimalisic theme that is 'basic' and clean.

* terminal&#42;: Command line like interface.

&#42; Has a config file
Twitch Votes App
================


For many reasons, it's useful to pull votes out of twitch chat. This daemon lets you pull votes from twitch and expose the results over REST, leaving you free to write code that matters more.



Endpoints:
----------

/words

Provides sorted json list of words and votes for that word.

/web_words

Provides formatted html for key value pairs. Good for showing to a stream.

/config/theme

Returns a string; the current theme, as determined by the config file.


Parameters:
-----------

config.json:

* twitch_identity:
	* username: Your Twitch.tv username.
	* password: The oauth key associated with your account. A key can be generated at <https://twitchapps.com/tmi/>.

* twitch_channels: The channels this app will connect to and read the messages of. Typically your Twitch.tv username.

* html_theme: allows for the changing of themes for /web_words. (more below)

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

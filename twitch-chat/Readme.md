Twitch Votes App
================


For many reasons, it's useful to pull votes out of twitch chat. This daemon lets you pull votes from twitch and expose the results over REST, leaving you free to write code that matters more.


Configuration Options:

* `multivoting`: Multivoting on means users can vote multiple times in the same vote, basically meaning they can spam.
* `words`: A list of words that are viable votes.
* `reset`: How the votes get reset. Available options are `rest` and `timer`.
* `vote_seconds`: How many seconds to run the vote for if `reset` is set to `timer`.





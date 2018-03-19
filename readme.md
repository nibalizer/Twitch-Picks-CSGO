Twitch-Picks-CSGO
-----------------


This is an application for csgo streamers. It hooks up twitch chat to the buy menu at the start of every round. This lets twitch spam weapon names into chat and whatever weapon twitch picks will be automatically purchased. Hopefully this helps chat feel more involved and everyone have a good time.



Daemons
-------

This app has two daemons: csgo-poker and twitch-chat. Csgo-poker handles communication with csgo. It pulls information from twitch-chat over http. Twitch-chat hooks up to twitch chat via the IRC protocol, it collects chat and summazires weapon votes and exposes that information over http.



Configuration
-------------

csgo-poker is configured via ``config.yaml`` and twitch-chat via ``config.json``, examples are provided.


Dependencies
--------------

This app has dependencies that need to be installed to preform basic functionality:

-Docker


Build & Deploy
--------------

This app is deployed via docker. Inspect and run the scripts "build_app.sh" and "run_app.sh".


Remote Console
--------------

This works by having a python daemon connect to the csgo binary via telnet. A remote console can be opened up and then connected to via telnet.

https://developer.valvesoftware.com/wiki/Command_Line_Options#Linux_command_options_in_Left_4_Dead_.282.29


```
-netconport 2121
```
